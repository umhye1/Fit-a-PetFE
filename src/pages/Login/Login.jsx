import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { login as apiLogin, getErrorMessage, tokenStorage } from '../../lib/api';

const Container = styled.div`
    display: flex; 
    width: 100%; 
`; 

const MainConationer = styled.div `
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    padding: 1.5vw; width: 100%;
`; 

const Title = styled.div `
    font-size: 1.2vw; 
    font-weight: 600; 
    padding: 1vw 1vw 1vw 5.1vw; 
`; 

const LoginContainer = styled.div`
    display: flex; 
    justify-content: center; 
    padding: 2vw 0vw 6vw 0vw; 
`; 

const LoginBox = styled.div `
    width: 24.4792vw; 
    height: 22.2917vw; 
    flex-shrink: 0; 
    border-radius: 0.2604vw; 
    border: 0.0521vw solid #9DBD5D; 
`; 

const InputBox = styled.div `
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    
    .id{ 
        display: flex; 
        width: 17vw; 
        margin-top: 4vw; 
        padding: 0.5208vw; 
        flex-direction: column; 
        justify-content: center; 
        align-items: flex-start; 
        gap: 0.5208vw; 
        font-weight: 500; 
        font-size: 0.75vw; 
        color: #9E9E9E;
        border: 0.08vw solid #9DBD5D; 
        cursor: pointer; 
        box-shadow: none; 
    } 
    
    .password{ 
        display: flex; 
        width: 17vw; 
        margin: 1.1vw 0vw 2.6vw 0vw; 
        padding: 0.5208vw; 
        flex-direction: column; 
        justify-content: center; 
        align-items: flex-start; 
        gap: 0.5208vw; 
        font-weight:500; 
        font-size: 0.75vw; 
        color: #9E9E9E; 
        border: 0.08vw solid #9DBD5D; 
        cursor: pointer; 
        box-shadow: none; 
    }
`; 

const Alert = styled.div `
    display: inline-flex; 
    position: absolute; 
    margin-top: 10vw; 
    left: 39.8%; 
    padding: 0.5vw; 
    justify-content: center; 
    align-items: center; 
    gap: 0.5208vw; 
    border-radius: 0.2604vw;
` ; 

const AlertP = styled.div `
    font-size: 0.7vw; 
    font-weight: 500; 
    padding-left: 0.5208vw; 
`;

const LoginButton =styled.button `
    width: 16vw; 
    height: 2.6042vw; 
    border-radius: 1vw; 
    background-color: #99CC31; 
    color: white; 
    font-size: 0.9vw; 
    font-style: normal; 
    font-weight: 600; 
    margin-top:1.75vw; 
    border: none; 
    cursor: pointer; 
    box-shadow: none; 
    
    &:disabled { cursor: not-allowed; } 
`; 

const FindContainer = styled.div `
    display:flex; 
    flex-direction: space; 
    justify-content: space-between; 
    margin: 1.6vw 1.6vw 0vw 1.6vw;
`; 

const FindP= styled(NavLink)`
    font-size: 0.8vw; 
    font-weight: 500; 
    line-height: 150%; 
    letter-spacing: -0.0187vw; 
    text-decoration: none; 
    color: #9DBD5D; 
    
    &:hover, 
    &:active { color: #99CC31; text-decoration: none; } 
`;


// const Container = styled.div`display:flex;width:100%;`;
// const MainConationer = styled.div`
//   display:flex;flex-direction:column;justify-content:center;padding:1.5vw;width:100%;
// `;
// const Title = styled.div`font-size:1.2vw;font-weight:600;padding:1vw 1vw 1vw 5.1vw;`;
// const LoginContainer = styled.div`display:flex;justify-content:center;padding:2vw 0 6vw 0;`;
// const LoginBox = styled.div`
//   width:24.4792vw;height:22.2917vw;flex-shrink:0;border-radius:0.2604vw;border:0.0521vw solid #9DBD5D;
// `;
// const InputBox = styled.div`
//   display:flex;flex-direction:column;align-items:center;
//   .id,.password{
//     display:flex;width:17vw;margin-top:1.1vw;padding:0.5208vw;flex-direction:column;justify-content:center;align-items:flex-start;gap:0.5208vw;
//     font-weight:500;font-size:0.75vw;color:#9E9E9E;border:0.08vw solid #9DBD5D;box-shadow:none;
//   }
//   .id{ margin-top:4vw; }
// `;
// const Alert = styled.div`
//   display:inline-flex;position:absolute;margin-top:10vw;left:39.8%;padding:0.5vw;justify-content:center;align-items:center;gap:0.5208vw;border-radius:0.2604vw;
// `;
// const AlertP = styled.div`font-size:0.7vw;font-weight:500;padding-left:0.5208vw;`;
// const LoginButton = styled.button`
//   width:16vw;height:2.6042vw;border-radius:1vw;background:#99CC31;color:#fff;font-size:0.9vw;font-weight:600;margin-top:1.75vw;border:none;cursor:pointer;box-shadow:none;
//   &:disabled { opacity:.6; cursor:not-allowed; }
// `;
// const FindContainer = styled.div`
//   display:flex;justify-content:space-between;margin:1.6vw 1.6vw 0 1.6vw;
// `;
// const FindP = styled(NavLink)`
//   font-size:0.8vw;font-weight:500;line-height:150%;letter-spacing:-0.0187vw;text-decoration:none;color:#9DBD5D;
//   &:hover,&:active{color:#99CC31;text-decoration:none;}
// `;

function Login() {
  const [inputValue, setInputValue] = useState({ userId: '', userPassword: '' });
  const { userId, userPassword } = inputValue;
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setAlertMessage('');
    if (!userId.trim() || !userPassword) {
      setAlertMessage('아이디와 비밀번호를 입력해 주세요.');
      return;
    }
    setLoading(true);
    try {
      // 백엔드 스펙에 맞게 필드 맞추세요 (email/password 사용하면 아래 userId→email로 변경)
      const payload = { email: userId.trim(), password: userPassword };
      const resp = await apiLogin(payload);

      // 서버 토큰 키 이름 대응
      const token = resp?.accessToken || resp?.token || resp?.jwt || resp?.data?.accessToken;
      if (!token) throw new Error(resp?.message || '토큰이 응답에 없습니다.');

      // 전역 저장 + AuthContext 갱신
      tokenStorage.set(token);
      login?.(token);
      
      if (resp.data?.nickname) {
        localStorage.setItem('nickname', resp.data.nickname);
      }

      navigate('/', { replace: true });
    } catch (err) {
      console.error('[LOGIN FAIL]', err?.response?.status, err?.response?.data || err?.message);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        getErrorMessage(err, '아이디 또는 비밀번호를 확인해 주세요.');
      setAlertMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <MainConationer>
        <Title>로그인</Title>
        <LoginContainer>
          <LoginBox>
            <form onSubmit={handleSubmit}>
              <InputBox>
                <input
                  className="id"
                  type="text"
                  placeholder="이메일"
                  value={userId}
                  onChange={(e)=>setInputValue({...inputValue, userId: e.target.value})}
                />
                <input
                  className="password"
                  type="password"
                  placeholder="PASSWORD"
                  value={userPassword}
                  onChange={(e)=>setInputValue({...inputValue, userPassword: e.target.value})}
                />

                {alertMessage && (
                  <Alert>
                    <span role="img" aria-label="alert">⚠️</span>
                    <AlertP>{alertMessage}</AlertP>
                  </Alert>
                )}

                <LoginButton type="submit" disabled={loading || !userId || !userPassword}>
                  {loading ? '로그인 중…' : '로그인'}
                </LoginButton>
              </InputBox>
            </form>

            <FindContainer>
              <FindP to="/findPassword">비밀번호찾기</FindP>
              <FindP to="/signup">회원가입</FindP>
            </FindContainer>
          </LoginBox>
        </LoginContainer>
      </MainConationer>
    </Container>
  );
}

export default Login;
