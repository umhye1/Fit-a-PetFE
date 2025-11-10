// src/lib/api.js
import axios from 'axios';

// ----- Base URL (CRA/Vite 둘 다 안전하게 동작하도록) -----
const runtimeBase =
  (typeof window !== 'undefined' && window.__API_BASE_URL__) || '';

/**
 * CRA에서는 REACT_APP_API_BASE_URL을,
 * Vite에서는 VITE_API_BASE_URL을 쓰지만,
 * CRA 빌드에서 import.meta가 파싱 에러를 내지 않도록 try/catch로 보호.
 */
let viteBase = '';
try {
  // Vite 환경에서만 존재
  // eslint-disable-next-line no-undef
  viteBase = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) || '';
} catch (_) {
  viteBase = '';
}

// src/lib/api.js
export const API_BASE_URL = 'http://3.37.117.222:8080'; // 임시 고정 (테스트)
console.log('[API] base =', API_BASE_URL);

// export const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || // CRA
//   viteBase ||                           // Vite
//   runtimeBase ||                        // 런타임 주입
//   'http://localhost:8080';              // 최종 fallback

// ----- Token -----
const ACCESS_TOKEN_KEY = 'accessToken';
export const tokenStorage = {
  get: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (t) => localStorage.setItem(ACCESS_TOKEN_KEY, t),
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
};

// ----- Axios instance -----
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  // withCredentials: true, // 쿠키 필요 시
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      tokenStorage.clear();
      // 필요하면 리다이렉트
      // window.location.assign('/login');
    }
    return Promise.reject(err);
  }
);

// ----- 공통 에러 메시지 -----
export function getErrorMessage(err, fallback = '요청 처리 중 오류가 발생했어요.') {
  const data = err?.response?.data;
  const msg = data?.message || data?.error || err?.message;
  return msg || fallback;
}

// ===== Auth / Signup =====

// 이메일 전송
export const sendSignupEmail = (payload) =>
  api.post('/api/users/email', payload).then(r => r.data);

// 이메일 인증번호 검증
export const verifySignupEmail = async (payload) => {
  try {
    const r = await api.post('/api/users/email/verify', payload);
    return r.data;
  } catch (e) {
    // 서버 500일 때만 프론트 임시통과 (개발용)
    const allow = process.env.REACT_APP_ALLOW_VERIFY_FALLBACK === 'true';
    const status = e?.response?.status;
    if (allow && status === 500) {
      console.warn('[verify fallback] 500 발생 → 임시 통과 처리');
      // 백엔드 CommonResponse 형태를 흉내
      return { message: '임시 통과(서버 오류 우회)' };
    }
    throw e;
  }};

// 회원가입 
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

  // JSON 기본
  const r = await api.request({
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json' },
    data: payload ?? {},          // 항상 data를 명시
  });
  return r.data;
};

  
// 로그인
export const login = (payload) =>
  api.post('/api/users/login', payload).then(r => r.data);

// 로그아웃
export const logout = () =>
  api.post('/api/users/logout').then(r => r.data);

// api.js 하단 근처에 추가
api.interceptors.request.use((config) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[REQ]', config.method?.toUpperCase(), config.baseURL + config.url, {
      headers: config.headers,
      data: config.data,
    });
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[RES]', res.status, res.config.url, res.data);
    }
    return res;
  },
  (err) => {
    const res = err.response;
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERR]', res?.status, res?.config?.url, res?.data || err.message);
    }
    if (res?.status === 401) tokenStorage.clear();
    return Promise.reject(err);
  }
);
