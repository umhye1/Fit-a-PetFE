import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { tokenStorage, refreshTokenStorage } from '../../lib/api';

const AuthContext = createContext();

// --- JWT 디코더(프로필 없는 로그인 응답 대비) ---
function decodeEmailFromJWT(token) {
  if (!token) return null;
  try {
    const [, payload] = token.split('.');
    const json = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    );
    // 서버 구현에 따라 email 또는 sub 중 하나를 사용
    return json.email || json.sub || null;
  } catch {
    return null;
  }
}

const ME_KEY = 'me';

export const AuthProvider = ({ children }) => {
  // 로그인 여부 + 내 프로필
  const [isLoggedIn, setIsLoggedIn] = useState(!!tokenStorage.get());
  const [me, setMe] = useState(() => {
    try {
      const raw = localStorage.getItem(ME_KEY);
      return raw ? JSON.parse(raw) : null; // { nickname, email } 구조 권장
    } catch {
      return null;
    }
  });

  // 마운트 시 토큰이 있는데 me가 없으면 JWT에서 email 복원
  useEffect(() => {
    const hasToken = !!tokenStorage.get();
    setIsLoggedIn(hasToken);
    if (hasToken && !me) {
      const email = decodeEmailFromJWT(tokenStorage.get());
      if (email) {
        const restored = { nickname: null, email };
        setMe(restored);
        localStorage.setItem(ME_KEY, JSON.stringify(restored));
      }
    }
  }, []); // 최초 1회

  // 공통 저장 유틸
  const persistMe = (profile) => {
    if (!profile) return;
    setMe(profile);
    localStorage.setItem(ME_KEY, JSON.stringify(profile));
  };

  // ------- login: 다양한 응답/형태를 모두 수용 -------
  /**
   * login(arg)
   * 허용 형태 예:
   * 1) { accessToken, refreshToken, profile:{ nickname, email } }
   * 2) resp 형태: { data:{ accessToken, refreshToken, nickname, email, profile:{...} } }
   * 3) 토큰만 있는 경우: { accessToken, refreshToken } → JWT에서 email 복원
   */
  const login = (arg = {}) => {
    // 최상위/resp.data 양쪽에서 토큰/프로필 추출
    const root = arg?.data ? arg.data : arg;

    const accessToken =
      root?.accessToken || root?.token || null;
    const refreshToken = root?.refreshToken || null;

    // profile 우선, 없으면 nickname/email 평문, 그것도 없으면 JWT에서 email 추출
    let profile =
      root?.profile ||
      (root?.nickname || root?.email
        ? { nickname: root?.nickname ?? null, email: root?.email ?? null }
        : null);

    // 저장: 토큰
    if (accessToken) tokenStorage.set(accessToken);
    if (refreshToken) refreshTokenStorage.set(refreshToken);

    // me 복원 로직
    if (!profile) {
      const emailFromJWT = decodeEmailFromJWT(accessToken || tokenStorage.get());
      profile = emailFromJWT ? { nickname: null, email: emailFromJWT } : null;
    }

    if (profile) persistMe(profile);

    setIsLoggedIn(true);
  };

  // ------- 로그아웃 -------
  const logout = () => {
    tokenStorage.clear();
    refreshTokenStorage.clear();
    setIsLoggedIn(false);
    setMe(null);
    localStorage.removeItem(ME_KEY);
  };

  // 값 메모이즈
  const value = useMemo(
    () => ({ isLoggedIn, me, login, logout, setMe: persistMe }),
    [isLoggedIn, me]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
