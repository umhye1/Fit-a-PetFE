// import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import { tokenStorage } from '../../lib/api';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   // 토큰만 상태로 관리
//   const [token, setToken] = useState(() => tokenStorage.get());

//   // 파생 값
//   const isLoggedIn = !!token;

//   // 로그인/로그아웃
//   const login = (tk) => {
//     tokenStorage.set(tk);
//     setToken(tk);
//   };

//   const logout = () => {
//     tokenStorage.clear();
//     setToken(null);
//   };

//   // 다탭 동기화 (다른 탭에서 토큰 변경 시 반영)
//   useEffect(() => {
//     const onStorage = (e) => {
//       if (e.key === 'accessToken') {
//         setToken(tokenStorage.get());
//       }
//     };
//     window.addEventListener('storage', onStorage);
//     return () => window.removeEventListener('storage', onStorage);
//   }, []);

//   // 초기 동기화(혹시 외부에서 바뀌었을 수 있으니 한번 더 보정)
//   useEffect(() => {
//     setToken(tokenStorage.get());
//   }, []);

//   // 불필요 렌더링 방지
//   const value = useMemo(() => ({ isLoggedIn, token, login, logout }), [isLoggedIn, token]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokenStorage, refreshTokenStorage } from '../../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!tokenStorage.get());

  useEffect(() => {
    setIsLoggedIn(!!tokenStorage.get());
  }, []);

  /** 서버 로그인 성공 시 access/refresh 저장 */
  const login = ({ accessToken, refreshToken }) => {
    if (accessToken) tokenStorage.set(accessToken);
    if (refreshToken) refreshTokenStorage.set(refreshToken);
    setIsLoggedIn(true);
  };

  /** 클라이언트 로그아웃(필요 시 서버 로그아웃 호출 후) */
  const logout = () => {
    tokenStorage.clear();
    refreshTokenStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
