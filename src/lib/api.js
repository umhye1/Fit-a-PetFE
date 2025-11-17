import axios from 'axios';

/* ======================= BaseURL ======================= */

// 로컬: 직접 백엔드
const DEV_BASE =
  process.env.REACT_APP_API_BASE_URL || 'http://3.37.117.222:8080';

// 기본값은 로컬용
let resolvedBase = DEV_BASE;

// 브라우저 + Vercel 배포 환경이면 프록시 사용
if (typeof window !== 'undefined') {
  const isHttps = window.location.protocol === 'https:';
  const isVercelHost = window.location.hostname.includes('vercel.app');

  if (isHttps && isVercelHost) {
    // 👇 vercel.json 에 맞춘 프록시 prefix
    resolvedBase = '/api-proxy';
  }
}

export const API_BASE_URL = resolvedBase;

console.log('[API] base =', API_BASE_URL);



const PETS_BASE = '/api/mypage/pet';
console.log('[API] base =', API_BASE_URL);
const unwrapAny = (d) => {
  if (!d || typeof d !== 'object') return d;
  if ('data' in d) return d.data;
  return d;
};

/* ======================= Token Storage ======================= */
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenStorage = {
  get: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (t) => localStorage.setItem(ACCESS_TOKEN_KEY, t),
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
};

export const refreshTokenStorage = {
  get: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  set: (t) => localStorage.setItem(REFRESH_TOKEN_KEY, t),
  clear: () => localStorage.removeItem(REFRESH_TOKEN_KEY),
};

/** 로그인 응답에서 토큰 저장 유틸 (키 네이밍 변화 대응) */
export const persistTokensFromLogin = (resp) => {
  const access =
    resp?.accessToken ||
    resp?.token ||
    resp?.data?.accessToken;

  const refresh =
    resp?.refreshToken ||
    resp?.data?.refreshToken;

  if (access) tokenStorage.set(access);
  if (refresh) refreshTokenStorage.set(refresh);
};

/* ======================= Axios Instance ======================= */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

/* ---------- Request Interceptor: Bearer ---------- */
api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- Response Interceptor: 401 Refresh & Retry ---------- */
let isRefreshing = false;
let pendingQueue = [];

const runQueue = (error, token) => {
  pendingQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  pendingQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config || {};
    const status = error?.response?.status;

    // 가드: status 없거나 refresh 엔드포인트면 탈출
    if (!status) return Promise.reject(error);
    if (original._retry || original.url?.includes('/api/auth/refresh')) {
      return Promise.reject(error);
    }

    // 401만 처리
    if (status !== 401) return Promise.reject(error);

    // refresh 없으면 종료
    const refresh = refreshTokenStorage.get();
    if (!refresh) {
      tokenStorage.clear();
      refreshTokenStorage.clear();
      return Promise.reject(error);
    }

    original._retry = true;

    // 이미 갱신 중이면 큐에 넣고 대기
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (newToken) => {
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      /* 1차: 헤더 방식 */
      const first = await axios.post(
        `${API_BASE_URL}/api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenStorage.get() || ''}`,
            refresh: `Bearer ${refresh}`,
          },
        }
      );

      let newAccessToken =
        first?.data?.accessToken || first?.data?.data?.accessToken;

      /* 2차: 바디 방식 재시도 */
      if (!newAccessToken) {
        const second = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refreshToken: refresh,
        });
        newAccessToken =
          second?.data?.accessToken || second?.data?.data?.accessToken;
      }

      if (!newAccessToken) {
        throw new Error('No accessToken from refresh');
      }

      tokenStorage.set(newAccessToken);
      runQueue(null, newAccessToken);

      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(original);
    } catch (e) {
      runQueue(e, null);
      tokenStorage.clear();
      refreshTokenStorage.clear();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

/* ======================= 공통 에러 메시지 ======================= */
export function getErrorMessage(err, fallback = '요청 처리 중 오류가 발생했어요.') {
  const data = err?.response?.data;
  const msg = data?.message || data?.error || err?.message;
  return msg || fallback;
}

/* ======================= 개발용 로그 ======================= */
if (process.env.NODE_ENV !== 'production') {
  api.interceptors.request.use((config) => {
    console.log('[REQ]', config.method?.toUpperCase(), config.baseURL + config.url, {
      headers: config.headers,
      data: config.data,
    });
    return config;
  });
  api.interceptors.response.use(
    (res) => {
      console.log('[RES]', res.status, res.config.url, res.data);
      return res;
    },
    (err) => {
      const r = err.response;
      console.error('[ERR]', r?.status, r?.config?.url, r?.data || err.message);
      return Promise.reject(err);
    }
  );
}

/* ======================= API ======================= */
// === 회원가입(JSON 기본, 필요시 x-www-form-urlencoded 지원) ===
export const signup = async (
  payload,
  { useForm = false, url = '/api/users/signup' } = {}
) => {
  if (useForm) {
    const form = new URLSearchParams();
    Object.entries(payload || {}).forEach(([k, v]) => form.append(k, v ?? ''));
    const r = await api.request({
      method: 'post',
      url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: form,
    });
    return r.data;
  }
  const r = await api.request({
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json' },
    data: payload ?? {},
  });
  return r.data;
};

// === 이메일 인증 ===
export const sendSignupEmail = (payload) =>
  api.post('/api/users/email', payload).then((r) => r.data);

export const verifySignupEmail = async (payload) => {
  try {
    const r = await api.post('/api/users/email/verify', payload);
    return r.data;
  } catch (e) {
    const allow = process.env.REACT_APP_ALLOW_VERIFY_FALLBACK === 'true';
    const status = e?.response?.status;
    if (allow && status === 500) {
      console.warn('[verify fallback] 500 → 임시 통과');
      return { message: '임시 통과(서버 오류 우회)' };
    }
    throw e;
  }
};

// === 로그인 / 로그아웃 ===
export const login = (payload) =>
  api.post('/api/users/login', payload).then((r) => r.data);

export const serverLogout = () =>
  api.post('/api/users/logout').then((r) => r.data);

// === 글 작성 PostWrite (이미지 없으면 JSON, 있으면 multipart) ===
// 요구: URL은 '/posts' 고정, 날짜는 ISO 사용
export const createPostWrite = async (payload, images = []) => {
  const isoNow = new Date().toISOString();

  if (images && images.length) {
    const form = new FormData();
    form.append('postTitle', payload?.postTitle ?? '');
    form.append('postContent', payload?.postContent ?? '');
    form.append('postCategory', payload?.postCategory ?? 'FREE');
    form.append('postDate', payload?.postDate ?? isoNow);
    images.forEach((file) => form.append('images', file)); // 서버 필드명(images) 기준

    const r = await api.request({
      method: 'post',
      url: '/posts', // ← 요구사항대로 /posts 유지
      headers: { 'Content-Type': 'multipart/form-data' },
      data: form,
    });
    return r.data;
  }

  const body = {
    postTitle: payload?.postTitle ?? '',
    postContent: payload?.postContent ?? '',
    postCategory: payload?.postCategory ?? 'FREE',
    postDate: payload?.postDate ?? isoNow, // ISO 사용
    images: payload?.images ?? [],        // 서버가 무시하든 허용하든 JSON 구조 맞춤
  };

  const r = await api.request({
    method: 'post',
    url: '/posts', // ← 요구사항대로 /posts 유지
    headers: { 'Content-Type': 'application/json' },
    data: body,
  });
  return r.data;
};

// === 게시글 목록 조회 Post ===
export const listPosts = async({category, page = 0, size =8} = {}) => {
  const params= {
    ...(category ? { categoryType: category } : {}),
    page, size,
  };
  const { data } = await api.get('/posts', {params});
  
  // 응답 포맷 통합, 배열 반환
  const unwrap = (d) => {
    if (Array.isArray(d)) return d;
    if (Array.isArray(d?.data)) return d.data;
    if (Array.isArray(d?.content)) return d.content;
    if (Array.isArray(d?.items)) return d.items;
    if (Array.isArray(d?.data?.content)) return d.data.content;
    if (Array.isArray(d?.data?.items)) return d.data.items;
    return [];
  };
  const raw = unwrap(data);

  // 필드명 정규화 (백엔드 DTO 예시 기준)
  const rows = raw.map((p) => ({
    post_id:   p.post_id ?? p.id ?? p.postId ?? p.post_no ?? null,
    title:     p.title ?? p.postTitle ?? '',
    content:   p.content ?? p.postContent ?? '',
    category:   p.postCategory ?? p.category ?? null,
    nickname: p.nickname ?? p.author?.nickname ?? '',
    email: p.email ?? p.author?.email ?? null,
    created_at: p.created_at ?? p.createdAt ?? p.postDate ?? p.created_time ?? null,
    _raw: p, // 디버깅용(화면에 안 씀)
  }));

  if (process.env.NODE_ENV !== 'production') {
    console.log('[LIST /posts] params:', params);
    console.log('[LIST /posts] raw:', data);
    console.log('[LIST /posts] normalized:', rows);
  }
  return rows;
};

// === 단건 조회 PostPage ===
export const getPost = (id) =>
  api.get(`/posts/${id}`).then(r=>r.data);

// === 내가 쓴 글 목록  ===
export const listMyPosts = async ({ page = 0, size = 50 } = {}) => {
  const all = await listPosts({ page, size });
  const me = getMyIdentityFromToken();
  // 닉네임이 있는 경우에만 필터 (목록에 email이 없으므로 email 필터는 무의미)
  if (me.nickname) {
    const mine = (all || []).filter(
      (p) =>
        p?.nickname === me.nickname ||
        p?._raw?.author?.nickname === me.nickname ||
        p?._raw?.memberNickname === me.nickname ||
        p?._raw?.writerNickname === me.nickname
    );
    if (mine.length) return mine;
  }
  // 닉네임이 없으면 전체 반환 (적어도 화면에는 뜸)
  return all || [];
};

// === 게시글 삭제 ===
export const deletePost = async (id) => {
  const r = await api.delete(`/posts/${id}`);
  return r.data; 
};

// === 게시물 수정 후 업데이트 ===
export const updatePost = (id, payload) =>
  api.put(`/posts/${id}`, {
    postTitle: payload.postTitle ?? '',
    postContent: payload.postContent ?? '',
  }).then(r => r.data);

// 식별자 추출
const parseJwt = (t) => {
  try {
   const part = t.split('.')[1];
  if (!part) return null;
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
      .padEnd(Math.ceil(part.length / 4) * 4, '=');
     
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
     );
    return JSON.parse(json);
    } catch {
      return null;
  }
};

export const getMyIdentityFromToken = () => {
  const t = tokenStorage.get();
  const p = t ? parseJwt(t) : null;
  if (!p) return { nickname: null, email: null };

  const nickname = p.nickname ?? p.nick ?? p.userNickname ??
    p.memberNickname ?? p.name ?? p.username ?? null;

  const email = p.email ?? p.user_email ?? p.userEmail ??
    p.sub ?? p.userName ?? null;

  return { nickname, email };
};

// === petpost - 이미지 ===

export const getPresignedUrl = async ({ filename, contentType }) => {
  const { data } = await api.get('/files/presign', { params: { filename, contentType } });
  // 기대 응답: { signedUrl, imageUrl } or CommonResponse({ data: { signedUrl, imageUrl }})
  return data?.data ?? data;
};

export const putToS3 = async (signedUrl, file, contentType) => {
  await axios.put(signedUrl, file, { headers: { 'Content-Type': contentType } });
};

// ---------- PetPost 정규화 ----------
function normalizePetPost(p = {}) {
  return {
    id: p.petPostId ?? p.id ?? null,
    title: p.petPostTitle ?? p.title ?? '',
    content: p.petPostContent ?? p.content ?? '',
    category: p.petPostCategory ?? p.category ?? null,
    authorNickname: p.nickname ?? p.authorNickname ?? '',
    createdAt: p.petPostDate ?? p.petPostEditDate ?? p.createdAt ?? null,
    imageUrl: p.imageUrl ?? null,
    petId: p.petId ?? null,
    petName: p.petName,
    petAge: p.petAge,
    petGender: p.petGender,
    petType: p.petType,
    petTraits: Array.isArray(p.petTraits)
      ? p.petTraits
      : (typeof p.petTraits === 'string'
          ? p.petTraits.split(',').map(s => s.trim()).filter(Boolean)
          : []),
    tags: Array.isArray(p.tags) ? p.tags
        : (Array.isArray(p.petTraits) ? p.petTraits
         : (typeof p.petTraits === 'string'
            ? p.petTraits.split(',').map(s => s.trim()).filter(Boolean)
            : [])),
    _raw: p,
  };
}

// === petpost 생성 ===
export const createPetPost = async (payload) => {
  const body = {
    petId: payload.petId,                                   
    petPostTitle: payload.title,                           
    petPostCategory: payload.category,                
    petPostContent: payload.content,
    petPostDate: payload.petPostDate ?? new Date().toISOString(),
    imageUrl: payload.imageUrl ?? null,
  };
  const { data } = await api.post('/petposts', body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return normalizePetPost(unwrapOne(data));
};

// === petpost 단건 조회 ===
export const getPetPost = async (id) => {
  const { data } = await api.get(`/petposts/${id}`);
  return normalizePetPost(unwrapOne(data));
};

// === petpost 수정 ===
export const updatePetPost = async (id, payload) => {
  const body = {
    petPostTitle: payload.title,
    petPostEditDate: new Date().toISOString(),
    petPostContent: payload.content,
    imageUrl: payload.imageUrl ?? null,
  };
  const { data } = await api.put(`/petposts/${id}`, body, {
    headers: { 'Content-Type': 'application/json' },  
  });
  return normalizePetPost(unwrapOne(data));
};


// === petpost 카테고리 ===
export const listPetPosts = async ({ category, page = 0, size = 6 } = {}) => {
  // GET /petposts/all  (전체 목록)
  const res = await api.get('/petposts/all');
  const raw = unwrapList(res?.data);
  const rows = raw.map(normalizePetPost);
  return rows.slice(0, size);
};


// ---------- 공통 언래퍼 ----------
const unwrapList = (d) => {
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d?.content)) return d.content;
  if (Array.isArray(d?.items)) return d.items;
  if (Array.isArray(d?.data?.content)) return d.data.content;
  if (Array.isArray(d?.data?.items)) return d.data.items;
  return [];
};

const unwrapOne = (d) => d?.data ?? d;


// --- 내 펫 목록 ---
export const listMyPets = async () => {
  const res = await api.get(PETS_BASE);
  const data = unwrapAny(res.data);
  const arr = Array.isArray(data) ? data : (Array.isArray(data?.content) ? data.content : []);
  return arr.map((p) => ({
    id: p.id,
    userId: p.memberId ?? null,
    name: p.name ?? '',
    sex: (p.petGenderType || '').toString().toLowerCase(), // 'male'|'female'|'neuter'
    age: p.age ?? null,
    type: p.petType ?? null,            // 필요 시 사용
    traits: Array.isArray(p.traits) ? p.traits : [],
    _raw: p,
  }));
};

// === 펫 생성 ===
export const createPet = async ({ name, age, weight = null, genderType, petType, image = null, traitNames = [] }) => {
  if (!name?.trim()) throw new Error('이름(name)은 필수입니다.');
  if (!genderType) throw new Error('genderType이 필요합니다. (MALE/FEMALE/NEUTER)');
  if (!petType) throw new Error('petType이 필요합니다. (DOG/CAT)');
  if (typeof age !== 'number' || age <= 0) throw new Error('나이(age)는 1 이상 숫자여야 합니다.');

  const body = { name: name.trim(), age, weight, genderType, petType, image, traitNames };
  const res = await api.post('/api/mypage/pet', body, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  return normalizePetResponse(res);
};

// === 펫 수정 ===
export const updatePet = async (petId, { name, age, weight = null, genderType, petType, image = null, traitNames = [] }) => {
  if (!petId) throw new Error('petId가 필요합니다.');
  const body = { name: name?.trim() ?? '', age, weight, genderType, petType, image, traitNames };
  const res = await api.put(`/api/mypage/pet/${petId}`, body, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  return normalizePetResponse(res);
};


// === 펫 삭제 ===
export const deletePetApi = async (petId) => {
  if (!petId) throw new Error('petId가 필요합니다.');
  const res = await api.delete(`${PETS_BASE}/${petId}`);
  return res.data; // CommonResponse 그대로 반환
};


// 공통 응답 정규화
const normalizePetResponse = (res) => {
  const data = res?.data?.data ?? res?.data ?? {};
  return {
    id: data.petId ?? data.id,
    userId: data.userId ?? null,
    name: data.name ?? '',
    sex: data.sex ?? data.gender ?? data.petGender ?? null,
    age: data.age ?? data.petAge ?? null,
    traits: Array.isArray(data.traits) ? data.traits
          : (Array.isArray(data.petTraits) ? data.petTraits
          : (typeof data.traits === 'string' ? data.traits.split(',').map(s=>s.trim()).filter(Boolean)
          : (typeof data.petTraits === 'string' ? data.petTraits.split(',').map(s=>s.trim()).filter(Boolean) : []))),
    _raw: res.data,
  };
};

// === 이미지 업로드  ===
export const uploadImage = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post('/api/image/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
   // CommonResponse<String> -> data 필드 우선 반환
  return data?.data ?? data; // 업로드된 이미지 URL/경로
};

// === 내가 쓴 Petpost 목록 ===
export const listMyPetPosts = async ({ page = 0, size = 10 } = {}) => {
 
  const { data } = await api.get('/petposts/user', { params: { page, size } });
  const arr = Array.isArray(data?.data) ? data.data
           : Array.isArray(data) ? data : [];
  return arr.map(normalizePetPost).map(r => ({
    ...r,
    _kind: 'PETPOST',                 // 구분자
    post_id: r.id,                    // MyPage 기존 렌더 재사용
    created_at: r.createdAt,
    title: r.title,
    content: r.content,
    category: r.category,             // 'GeneralPost' | 'InfoPost'
  }));
};

// === 내가 쓴 Petpost 삭제 ===
export const deletePetPost = async (id) =>
  api.delete(`/petposts/${id}`).then(r => r.data);

// === 댓글 저장 ===
export const createComment = async (postId, payload) => {
  // payload: { comment: '내용' }
  const { data } = await api.post(`/api/posts/${postId}/comments`, payload);
  return data?.data ?? data; // { commentId, comment, lastModified }
};

// === 댓글 수정 ===
export const updateComment = async (postId, commentId, payload) => {
  // payload: { comment: '내용' }
  const { data } = await api.put(`/api/posts/${postId}/comments/${commentId}`, payload);
  return data?.data ?? data; // { commentId, comment, lastModified }
};


// === 댓글 삭제 : 작성자가 같으면 삭제 ===
export const deleteComment = async (commentId) => {
  // 백엔드는 ResponseEntity<String> 반환
  const { data } = await api.delete(`/api/comments/${commentId}`);
  return data; // "댓글 삭제 성공" 등
};

// === 댓글 조회 ===
export const getComments = async (postId) => {
  const res = await api.get(`/api/posts/${postId}/comments`);
  return res.data.data; // List<CommentInfo>
};

// === 산책 기록 저장 ===
export const createWalkRecord = async (payload) => {
  const { data } = await api.post('/trails', payload);
  // CommonResponse<WalkRecordResponse> 라고 가정
  return data?.data ?? data;
};

// === 월별 산책 기록 조회 ===
export const getWalkRecordsMonthly = async ({ year, month }) => {
  const y = Number(year);
  const m = Number(month);

  const { data } = await api.get('/trails', {
    params: {
      year: y,                 // @RequestParam int year
      month: m,                // @RequestParam int month
    },
  });

  const list = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];

  return list.map((r) => ({
    recordId: r.recordId,
    date: r.walkDate,                 // 'YYYY-MM-DD'
    duration: r.formattedDuration,    // 'HH:mm:ss'
    start: r.walkStart,
    end: r.walkEnd,
    distance: r.distance,
    petId: r.petId,
    address: r.address,
    rating: r.rating,
    memo: r.memo,
    _raw: r,
  }));
};


// === 산책 기록 단건 상세 조회 ===
export const getWalkRecordDetail = async (recordId) => {
  const { data } = await api.get(`/trails/${recordId}`);
  const d = data?.data ?? data;
  return {
    recordId: d.recordId,
    walkDate: d.walkDate,
    walkStart: d.walkStart,
    walkEnd: d.walkEnd,
    record: d.formattedDuration,
    distance: d.distance,
    petId: d.petId,
    address: d.address,
    rating: d.rating,
    memo: d.memo,
    _raw: d,
  };
};

// === 기록 수정 (PUT /trails/{recordId}) ===
export const updateWalkRecord = async (recordId, { memo, rating }) => {
  const body = { memo, rating };
  const { data } = await api.put(`/trails/${recordId}`, body);
  const d = data?.data ?? data;
  return {
    recordId: d.recordId,
    walkDate: d.walkDate,
    walkStart: d.walkStart,
    walkEnd: d.walkEnd,
    record: d.formattedDuration,
    distance: d.distance,
    petId: d.petId,
    address: d.address,
    rating: d.rating,
    memo: d.memo,
    _raw: d,
  };
};

// === 기록 삭제 (DELETE /trails/{recordId}) ===
export const deleteWalkRecord = async (recordId) => {
  const { data } = await api.delete(`/trails/${recordId}`);
  return data; // CommonResponse 그대로 사용
};