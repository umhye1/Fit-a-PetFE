import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  sendSignupEmail,
  verifySignupEmail,
  signup,
  getErrorMessage
} from '../../lib/api';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const MainConationer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5vw;
  width: 80%;
`;

const Title = styled.div`
  font-size: 1.2vw;
  font-weight: 600;
  padding: 1vw 1vw 1vw 17.05vw;
  color: #2E2923;
`;

const SubTitile = styled.div`
  font-size: 0.8vw;
  font-weight: 500;
  line-height: 150%; /* 0.9375vw */
  letter-spacing: -0.0187vw;
  padding: 0vw 0vw 0vw 17.05vw;
  color: #2E2923;
`;

const JoinBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin: 1.5vw 1.5vw 5vw 17.05vw;
  border-top: 0.06vw solid #99CC31;
  line-height: 1.5625vw;
`;

const JoinBox = styled.div`
  justify-content: center;
  font-size: 1vw;
  font-weight: 700;
  padding-top: 1vw;
`;

const NameContainer =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.div`
  padding-bottom: 1.8vw;
  color: #2E2923;
  .name {
    display: flex;
    width: 25vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const Nickname = styled.div`
  padding-bottom: 1.8vw;
  color: #2E2923;
  .nickname {
    display: flex;
    width: 25vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const Password = styled.div`
  padding-bottom: 1.8vw;
  color: #2E2923;
  .password {
    display: flex;
    width: 25vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const PasswordTitle = styled.div`
  display: flex;
  align-items: center;
  color: #2E2923;
`;

const PasswordInfo = styled.div`
  margin: 0.3vw 0.5vw;
  font-size: 0.6vw;
  font-weight: 700;
  color: #2E2923;
`;

const VerificationBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1vw;
  font-weight: 700;

`;

const Verification = styled.div`
  display: flex;
  flex-direction: row;
  .register {
    display: flex;
    position: relative;
  }
  .emailInput {
    display: flex;
    width: 100%;
    height: 2vw;
    padding: 0.5208vw 2.0vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);

    font-size: 0.8vw;
    font-weight: 700;
  }

  .registerButton {
    display: flex;
    height: 2.0833vw;
    padding: 0vw 0.6vw;
    margin-top: 1vw;
    justify-content: center;
    align-items: center;
    gap: 0.5208vw;
    border-radius: 1vw;
    background-color: #99CC31;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: none;

    font-size: 0.8vw;
    font-weight: 600;
  }
`;
const VerificationCodeInput = styled.input`

    display: flex;
    width: 12.5vw;
    height: 2vw;
    padding: 0.5208vw 2.0vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);

    font-size: 0.8vw;
    font-weight: 700;
`;

const EmailBox = styled.div`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: calc(100% + 0.3vw);
  left: 0;
  z-index: 1000;             
  width: 25vw;
  background: #fff;
  border: 0.0521vw solid #99CC31;
  border-radius: 0.26vw;
  box-shadow: 0 0.26vw 0.52vw rgba(0,0,0,0.08);
  padding: 0.2vw 0;
`;

const EmailWrap = styled.div`
  position: relative;
  width: 25vw;
`;

// 인풋 오른쪽에 놓일 토글 버튼(▼)
const EmailToggle = styled.button`
  position: absolute;
  top: 60%;
  left: 100%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.8vw;
  color: #2E2923;
  line-height: 1;
`;

const HoverDiv = styled.div`
  padding: 0.52vw 0.78vw;
  width: 25vw;
  font-size: 0.8vw;
  font-weight: 500;
  cursor: pointer;
  &:hover { font-weight: 600; background: #f7fff0; }
`;

const NextButton = styled.div`
  display: flex;
  justify-content: center;

  .nextButton {
    width: 16vw;
    height: 2.6042vw;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    text-align: center;

    font-size: 0.8vw;
    font-weight: 600;
    border-radius: 1vw;
    background-color: #99CC31;
    color: #FBFFE4;
    border: none;
    cursor: pointer;
    box-shadow: none;
    padding: 0vw 0.6vw;
  }
`;
const ErrorMessage = styled.div`
  height: 0.1vw;
  color: #E95458;
  font-size: 0.7vw;
`;

const RegisterButton =styled.button`
  display: flex;
  height: 2.0833vw;
  padding: 0vw 0.6vw;
  margin-top: 1vw;
  justify-content: center;
  align-items: center;
  gap: 0.5208vw;
  border-radius: 1vw;
  background-color: #99CC31;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: none;

  font-size: 0.8vw;
  font-weight: 600;
`

// === 컴포넌트 ===
const Signup = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');      // 입력한 인증코드
  const [codeMessage, setCodeMessage] = useState(''); 
  const [isVisible, setIsVisible] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate(); 

//   const handleEmail = (email) => {
//     setInputValue((prevState) => ({
//       ...prevState,
//       userEmail: prevState.userEmail + email
//     }));
//     setIsVisible(false);
//   };

//   // 인풋 포커스/토글
// const openDropdown = () => setIsVisible(true);
// const toggleDropdown = (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   setIsVisible(v => !v);
// };

// 바깥 클릭 시 닫기
useEffect(() => {
  const onDocClick = () => setIsVisible(false);
  document.addEventListener("click", onDocClick);
  return () => document.removeEventListener("click", onDocClick);
}, []);

  const [inputValue, setInputValue] = useState({
    userName: '',
    userNickname: '',
    userPassword: '',
    emailLocal: '',  
    emailDomain: '',  
  });

  const fullEmail =
  inputValue.emailLocal && inputValue.emailDomain
    ? `${inputValue.emailLocal}@${inputValue.emailDomain}`
    : '';

  // 이메일: \w+@\w+\.\w+(\.\w+)?
  const emailOk = /^\w+@\w+\.\w+(?:\.\w+)?/.test(fullEmail);

  // 비밀번호: ^[a-zA-Z0-9~!@#$%^&*()]{8,30}$
  const pwOk = /^[a-zA-Z0-9~!@#$%^&*()]{8,30}/.test(inputValue.userPassword);

  // 닉네임: ^[a-zA-Z0-9_]{5,15}$
  const nickOk = /^[a-zA-Z0-9_]{5,15}/.test(inputValue.userNickname);


  const handleInputChange = (e) =>
    setInputValue((p) => ({ ...p, userName: e.target.value }));
  const handleInputChange2 = (e) =>
    setInputValue((p) => ({ ...p, userNickname: e.target.value }));
  const handleInputChange4 = (e) =>
    setInputValue((p) => ({ ...p, userPassword: e.target.value }));
  const handleEmailLocalChange = (e) =>
    setInputValue((p) => ({ ...p, emailLocal: e.target.value }));
  const handleEmailDomainChange = (e) =>
    setInputValue((p) => ({ ...p, emailDomain: e.target.value }));

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible((v) => !v);
  };
  const handleEmailDomainPick = (domain) => {
    setInputValue((p) => ({ ...p, emailDomain: domain }));
    setIsVisible(false);
  };

  // === 인증 메일 발송 ===
  const handleSendCode = async () => {
    setEmailMessage('');
    try {
      if (!fullEmail) {
        setEmailMessage('이메일을 입력/선택해주세요.');
        return;
      }
      await sendSignupEmail({ email: fullEmail });
      setIsCodeSent(true);
      setEmailMessage('인증 메일을 보냈어요.');
    } catch (e) {
      setEmailMessage('인증 메일 발송 실패: ' + getErrorMessage(e));
    }
  };

  // === 인증번호 검증 ===
 const handleVerifyCode = async () => {
  setCodeMessage('');
  try {
    if (!fullEmail) return setCodeMessage('이메일을 먼저 입력/선택해주세요.');
    if (!verifyCode) return setCodeMessage('인증코드를 입력해주세요.');

    // ★ 대문자 보장
    const payload = { email: fullEmail, code: verifyCode.toUpperCase().trim() };
    const resp = await verifySignupEmail(payload);

    setCodeMessage(resp?.message || '인증 완료되었습니다.');
    setIsVerified(true); 
  } catch (e) {
    setCodeMessage('인증 실패: ' + getErrorMessage(e));
    setIsVerified(false); 
  }
};

  // === 최종 회원가입 ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError('');
    setNicknameError('');
    setPasswordError('');
    setEmailMessage('');

    // --- 프론트 유효성 ---
    let ok = true;
    if (!inputValue.userName.trim()) {
      setNameError('이름은 필수입니다.');
      ok = false;
    }
    if (!emailOk) {
      setEmailMessage('이메일 형식이 올바르지 않습니다. (예: abc@naver.com)');
      ok = false;
    }
    if (!pwOk) {
      setPasswordError('비밀번호는 8~30자, a-zA-Z0-9~!@#$%^&*()만 가능합니다.');
      ok = false;
    }
    if (!nickOk) {
      setNicknameError('닉네임은 5~15자, 영문/숫자/언더바만 가능합니다.');
      ok = false;
    }
    if (!isVerified) {
      setEmailMessage('이메일 인증을 완료해주세요.');
      ok = false;
    }
    if (!ok) return;

    // --- 공통 성공판정 ---
    const isOk = (resp) =>
      resp?.statusCode === 200 ||
      resp?.statusCode === 201 ||
      resp?.status === 'SUCCESS' ||
      resp?.isSuccess === true ||
      !!resp?.data; // data가 있으면 성공으로 간주(서버 공통응답 형태 대응)

    // --- 가입 페이로드(인증 연계 필드 포함) ---
    const basePayload = {
      name: inputValue.userName,
      email: fullEmail,
      password: inputValue.userPassword,
      nickname: inputValue.userNickname,
      // 서버가 요구할 수 있는 값들(없으면 서버가 무시)
      emailVerified: !!isVerified,
      verificationCode: verifyCode?.trim().toUpperCase() || undefined,
    };

    try {
      // 1) JSON + /api/users/signup
      console.log('[SIGNUP TRY #1] JSON /api/users/signup', basePayload);
      let resp = await signup(basePayload); // 기본(JSON)
      if (isOk(resp)) {
        console.log('[SIGNUP OK #1]', resp);
        navigate(`/signupFinish?name=${encodeURIComponent(inputValue.userName)}`, { replace: true });
        return;
      }
      console.warn('[SIGNUP NOT OK #1]', resp);

      // 2) x-www-form-urlencoded + /api/users/signup
      console.log('[SIGNUP TRY #2] FORM /api/users/signup', basePayload);
      resp = await signup(basePayload, { useForm: true });
      if (isOk(resp)) {
        console.log('[SIGNUP OK #2]', resp);
        navigate(`/signupFinish?name=${encodeURIComponent(inputValue.userName)}`, { replace: true });
        return;
      }
      console.warn('[SIGNUP NOT OK #2]', resp);

      // 3) /join + form (레거시 스펙: userId/password/email)
      const joinPayload = {
        userId: inputValue.userNickname,  // 서버가 userId를 기대한다고 가정(닉네임 매핑)
        password: inputValue.userPassword,
        email: fullEmail,
      };
      console.log('[SIGNUP TRY #3] FORM /join', joinPayload);
      resp = await signup(joinPayload, { useForm: true, url: '/join' /* 로컬이면 'http://localhost:8080/join' */ });
      if (isOk(resp)) {
        console.log('[SIGNUP OK #3]', resp);
        navigate(`/signupFinish?name=${encodeURIComponent(inputValue.userName)}`, { replace: true });
        return;
      }
      console.warn('[SIGNUP NOT OK #3]', resp);

      // 모두 실패 시 서버 메시지 출력
      setEmailMessage(resp?.message || '회원가입 실패: 서버 응답을 확인해주세요.');
    } catch (e) {
      console.error('[SIGNUP FAIL]', e?.response?.status, e?.response?.data || e?.message);
      // 개발 중 상세 메시지 확인
      const specific = e?.response?.data?.error || e?.response?.data?.message || e?.message;
      setEmailMessage(specific || '회원가입 중 오류가 발생했어요.');
    }
  };


  return (
    <Container>
      <MainConationer>

        <Title>회원가입</Title>
        <SubTitile>약관에 동의해주세요.</SubTitile>

        <JoinBoxContainer>
          <JoinBox>
            <NameContainer>
              <Name>
                이름
                <input
                  className="name"
                  type="text"
                  placeholder="실명을 입력해주세요"
                  name="userName"
                  value={inputValue.userName}
                  onChange={handleInputChange}
                />
              <ErrorMessage>{nameError}</ErrorMessage>
              </Name>
            </NameContainer>

            <NameContainer>
              <Nickname>
                닉네임
                <input
                  className="nickname"
                  type="text"
                  placeholder="사용하실 닉네임을 입력해주세요"
                  nickname="userNickname"
                  value={inputValue.userNickname}
                  onChange={handleInputChange2}
                />
              <ErrorMessage>{nicknameError}</ErrorMessage>
              </Nickname>
            
            </NameContainer>
            <Password>
              <PasswordTitle>
                비밀번호
                <PasswordInfo>* 8자 이상 작성해주세요</PasswordInfo>
              </PasswordTitle>
              <input
                className="password"
                type="password"
                placeholder="비밀번호를 선택해주세요"
                password="userPassword"
                value={inputValue.userPassword}
                onChange={handleInputChange4}
              />
              <ErrorMessage>{passwordError}</ErrorMessage>
            </Password>
   

            <VerificationBox>
              이메일
              <Verification>
                <div className="register" onClick={(e) => e.stopPropagation()} style={{ gap: '4vw', alignItems: 'flex-start',  }}>
                  
                  {/* 왼쪽: 로컬파트 */}
                  <EmailWrap style={{ width: '12.5vw' }}>
                    <input
                      className="emailInput"
                      type="text"
                      placeholder="이메일 주소"
                      name="emailLocal"
                      value={inputValue.emailLocal}
                      onChange={handleEmailLocalChange}
                    />
                  </EmailWrap>

                  {/* 오른쪽: 도메인(드롭다운 포함) */}
                  <EmailWrap style={{ width: '12.5vw' }}>
                    <input
                      className="emailInput"
                      type="text"
                      placeholder="(예: naver.com)"
                      name="emailDomain"
                      value={inputValue.emailDomain}
                      onChange={handleEmailDomainChange}
                      onFocus={() => setIsVisible(true)}
                    />
                    <EmailToggle onClick={toggleDropdown} aria-label="이메일 도메인 선택">▼</EmailToggle>

                    <EmailBox $show={isVisible} style={{ width: '100%' }}>
                      <HoverDiv onClick={() => handleEmailDomainPick('gmail.com')}>gmail.com</HoverDiv>
                      <HoverDiv onClick={() => handleEmailDomainPick('naver.com')}>naver.com</HoverDiv>
                      <HoverDiv onClick={() => handleEmailDomainPick('daum.net')}>daum.net</HoverDiv>
                      <HoverDiv onClick={() => handleEmailDomainPick('kakao.com')}>kakao.com</HoverDiv>
                    </EmailBox>
                  </EmailWrap>

                  <button className="registerButton" type="button" onClick={handleSendCode}>
                    인증하기
                  </button>
                </div>

              </Verification>
              <ErrorMessage>{emailMessage}</ErrorMessage>

                <div style={{display: 'flex', flexDirection: 'row',}}>
                  <div style={{ margin: '2vw 0vw 0vw 0vw', gap: '4vw', alignItems: 'flex-start',  }}>
                  <VerificationCodeInput 
                    placeholder='인증코드'
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}/>
                  </div>

                <div style={{display: 'flex', flexDirection: 'column', margin:'2vw 0vw 0vw 1vw' }}>
                <RegisterButton onClick={handleVerifyCode}>
                  코드 확인
                </RegisterButton>
                <ErrorMessage aria-live="polite">{codeMessage}</ErrorMessage>
                </div>
              </div>

            </VerificationBox>



          </JoinBox>
        </JoinBoxContainer>
      
        <form onSubmit={handleSubmit}>
        <NextButton>
          <input className="nextButton" type="submit" value="회원가입" />
        </NextButton>
        </form>
      </MainConationer>
    </Container>
  );
};

export default Signup;