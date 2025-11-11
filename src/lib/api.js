// src/lib/api.js
import axios from 'axios';

/* ======================= BaseURL ======================= */
export const API_BASE_URL = 'http://3.37.117.222:8080';
console.log('[API] base =', API_BASE_URL);

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
      ...(category ? {categoryType: category } : {}),
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