import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Container = styled.div`
  display: flex;
  flex-direction: center;
  width: 100%;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const MainConationer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5vw;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.2vw;
  font-weight: 600;
  padding: 1vw 1vw 1vw 17.05vw;
`;

const SubTitile = styled.div`
  font-size: 0.8vw;
  font-weight: 500;
  line-height: 150%; /* 0.9375vw */
  letter-spacing: -0.0187vw;
  padding: 0vw 0vw 0vw 17.05vw;
`;

const JoinBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5vw 1.5vw 5vw 1.5vw;
`;

const JoinBox = styled.div`
  justify-content: center;
  font-size: 1vw;
  font-weight: 700;
  line-height: 1.5625vw;
  border-top: 0.06vw solid #3D8D7A;
  padding-top: 1vw;
`;

const NameContainer =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.div`
  padding-bottom: 1.6667vw;
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
    border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const Nickname = styled.div`
  padding-bottom: 1.6667vw;
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
    border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const Birth = styled.div`
  padding-bottom: 1.6667vw;
  .birth {
    display: flex;
    width: 25vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const Password = styled.div`
  padding-bottom: 1.6667vw;
  .password {
    display: flex;
    width: 61.4583vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const PasswordTitle = styled.div`
  display: flex;
  align-items: center;
`;

const PasswordInfo = styled.div`
  margin: 0.3vw 0.5vw;
  font-size: 0.6vw;
  font-weight: 700;
`;

const PhoneNumber = styled.div`
  padding-bottom: 1.6667vw;
  .phoneNumber {
    display: flex;
    width: 61.4583vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

    font-size: 0.8vw;
    font-weight: 700;
  }
`;

const VerificationBox = styled.div`
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
  .verificationCode {
    display: flex;
    width: 28.8021vw;
    height: 2vw;
    padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
    margin-top: 0.5208vw;
    align-items: center;
    gap: 0.8333vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

    font-size: 0.8vw;
    font-weight: 700;
  }

  .registerButton {
    display: flex;
    position: absolute;
    height: 2.0833vw;
    top: 28%;
    right: 2%;
    padding: 0vw 0.6vw;
    justify-content: center;
    align-items: center;
    gap: 0.5208vw;
    border-radius: 1vw;
    background-color: #3D8D7A;
    color: #FBFFE4;
    border: none;
    cursor: pointer;
    box-shadow: none;

    font-size: 0.8vw;
    font-weight: 500;
  }
`;

const Email = styled.div`
  display: flex;
  width: 28.8021vw;
  height: 2vw;
  padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
  margin-top: 0.5208vw;
  margin-left: 0.5208vw;
  align-items: center;
  gap: 0.8333vw;
  flex-shrink: 0;
  border-radius: 0.2604vw;
  border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);
`;

const EmailP = styled.div`
  width: 26.0417vw;
  font-size: 0.8vw;
  font-weight: 500;
`;

const EmailBox = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 98%;
  right: 25.3%;
  z-index: 1;
  width: 27.2917vw;
  margin: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
`;

const HoverDiv = styled.div`
  display: flex;
  width: 27.2917vw;
  height: 3.125vw;
  padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
  align-items: center;
  gap: 0.8333vw;
  font-size: 0.8vw;
  font-weight: 500;
  &:hover {
    font-weight: 600;
  }
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
    background-color: #3D8D7A;
    color: #FBFFE4;
    border: none;
    cursor: pointer;
    box-shadow: none;
    padding: 0vw 0.6vw;
  }
`;
const ErrorMessage = styled.div`
  height: 0.1w;
  color: #E95458;
  font-size: 0.7vw;
`;

const Signup = () => {
//   const [selectedEmail, setSelectedEmail] = useState('email.com');
//   const [isVisible, setIsVisible] = useState(false);
//   const [emailMessage, setEmailMessage] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [nicknameError, setNicknameError] = useState('');
//   const [birthError, setBirthError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [phoneError, setPhoneError] = useState('');

//   const navigate = useNavigate(); // Initialize navigate

//   const handleEmail = (email) => {
//     setInputValue((prevState) => ({
//       ...prevState,
//       userEmail: prevState.userEmail + email
//     }));
//     setIsVisible(false);
//   };

//   const [inputValue, setInputValue] = useState({
//     userName: '',
//     userNickname: '',
//     userBirth: '',
//     userPassword: '',
//     userPhoneNumber: '',
//     userEmail: '',
//   });

//   const handleInputChange = (e) => {
//     setInputValue({ ...inputValue, userName: e.target.value });
//   };

//   const handleInputChange2 = (e) => {
//     setInputValue({ ...inputValue, userNickname: e.target.value });
//   };

//   const handleInputChange3 = (e) => {
//     setInputValue({ ...inputValue, userBirth: e.target.value });
//   };

//   const handleInputChange4 = (e) => {
//     setInputValue({ ...inputValue, userPassword: e.target.value });
//   };

//   const handleInputChange5 = (e) => {
//     setInputValue({ ...inputValue, userPhoneNumber: e.target.value });
//   };

//   const handleInputChange6 = (e) => {
//     setInputValue({ ...inputValue, userEmail: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNameError('');
//     setNicknameError('');
//     setBirthError('');
//     setPasswordError('');
//     setPhoneError('');
//     setEmailMessage('');

//     let isValid = true;
//     if (!inputValue.userName.trim()) {
//       setNameError('이름을 입력해주세요.');
//       isValid = false;
//     }
//     if (!inputValue.userNickname.trim()) {
//       setNicknameError('닉네임을 입력해주세요.');
//       isValid = false;
//     }
//     if (!inputValue.userBirth.trim()) {
//       setBirthError('생년월일을 입력해주세요.');
//       isValid = false;
//     }
//     if (!inputValue.userPassword.trim()) {
//       setPasswordError('비밀번호를 입력해주세요.');
//       isValid = false;
//     }
//     if (!inputValue.userPhoneNumber.trim()) {
//       setPhoneError('전화번호를 입력해주세요.');
//       isValid = false;
//     }
//     if (!inputValue.userEmail.trim()) {
//       setEmailMessage('이메일을 입력해주세요.');
//       isValid = false;
//     }
  
//     if (!isValid) {
//       return; // 입력값이 유효하지 않으면 여기서 함수 종료
//     }
  

//     try {
//       const {
//         userName,
//         userNickname,
//         userBirth,
//         userPassword,
//         userPhoneNumber,
//         userEmail,
//       } = inputValue;
//       const userData = {
//         name: userName,
//         nickname: userNickname,
//         birth: userBirth,
//         password: userPassword,
//         phone: userPhoneNumber,
//         email: userEmail,
//       };
//       const response = await axios.post(
//         'https://bloodtrail.site/auth/register',
//         userData
//       );

//       console.log(response.data);
//       console.log(userData.name);
//       if (response.data.isSuccess) {
//         navigate(`/signupService/signup/finish?name=${encodeURIComponent(inputValue.userName)}`);
//       }
//       else {
//         switch (response.data.message) {
//           case "올바른 이메일 주소를 입력해주세요.":
//             setEmailMessage("올바른 이메일 주소를 입력해주세요.");
//             break;
//           case "이미 존재하는 이메일입니다.":
//             setEmailMessage("이미 존재하는 이메일입니다.");
//             break;
//           case "이미 존재하는 닉네임입니다.":
//             setNicknameError("이미 존재하는 닉네임입니다.");
//             break;
//           case "올바른 핸드폰 번호를 입력해주세요.":
//             setPhoneError("올바른 핸드폰 번호를 입력해주세요.");
//             break;
//           case "올바른 비밀번호 형식을 지켜주세요.":
//             setPasswordError("올바른 비밀번호 형식을 지켜주세요.");
//             break;
//           default:
//             setEmailMessage("서버 에러, 관리자에게 문의 바랍니다");
//             break;
//         }
//       }
//     } catch (error) {
//       console.error('에러: ', error);
//     }
//   };

//   const handleSubmit2 = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'https://bloodtrail.site/auth/check-email',
//         { email: userEmail }
//       );
//       if (response.data.isSuccess){
//         setEmailMessage('이메일 인증 완료');
//       }
//       else {
//         setEmailMessage('이메일 인증 실패');
//       }
//       console.log(inputValue);
//       console.log(response.data);
//     } catch (error) {
//       console.error('에러: ', error);
//       setEmailMessage('이메일 인증 중 오류가 발생했습니다.')
//     }
//   };

//   const {
//     userName,
//     userNickname,
//     userBirth,
//     userPassword,
//     userPhoneNumber,
//     userEmail,
//   } = inputValue;

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
                //   value={inputValue.userName}
                //   onChange={handleInputChange}
                />
              {/* <ErrorMessage>{nameError}</ErrorMessage> */}
              </Name>
              <Birth>
                생년월일
                <input
                  className="birth"
                  type="text"
                  placeholder="0000 년 00 월 00 일"
                  birth="userBirth"
                //   value={inputValue.userBirth}
                //   onChange={handleInputChange3}
                />
                {/* <ErrorMessage>{birthError}</ErrorMessage> */}
              </Birth>
            </NameContainer>

            <NameContainer>
              <Nickname>
                닉네임
                <input
                  className="nickname"
                  type="text"
                  placeholder="사용하실 닉네임을 입력해주세요"
                  nickname="userNickname"
                //   value={inputValue.userNickname}
                //   onChange={handleInputChange2}
                />
              {/* <ErrorMessage>{nicknameError}</ErrorMessage> */}
              </Nickname>
            
              <Nickname>
                반려동물 이름
                <input
                  className="nickname"
                  type="text"
                  placeholder="반려동물 이름을 입력해주세요"
                  nickname="userNickname"
                //   value={inputValue.userNickname}
                //   onChange={handleInputChange2}
                />
              {/* <ErrorMessage>{nicknameError}</ErrorMessage> */}
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
              //   value={inputValue.userPassword}
              //   onChange={handleInputChange4}
              />
              {/* <ErrorMessage>{passwordError}</ErrorMessage> */}
            </Password>
            <PhoneNumber>
              전화번호
              <input
                className="phoneNumber"
                type="text"
                placeholder="전화번호를 입력해주세요"
                phoneNumber="userPhoneNumber"
              //   value={inputValue.userPhoneNumber}
              //   onChange={handleInputChange5}
              />
              {/* <ErrorMessage>{phoneError}</ErrorMessage> */}
            </PhoneNumber>

            <VerificationBox>
              이메일
              <Verification>
                <div className="register">
                  <input
                    className="verificationCode"
                    type="text"
                    placeholder="텍스트를 입력해주세요"
                    email="userEmail"
                  //   value={inputValue.userEmail}
                  //   onChange={handleInputChange6}
                  />
                  <button className="registerButton">
                    인증하기
                  </button>
                </div>
                <Email>
                  <EmailP style={{ fontSize: '0.7813vw' }}>
                  </EmailP>
      
                </Email>
                {/* {selectedEmail && ( */}
                  <EmailBox>
                    {/* <HoverDiv onClick={() => handleEmail('@gmail.com')}>
                      @gmail.com
                    </HoverDiv>
                    <HoverDiv onClick={() => handleEmail('@naver.com')}>
                      @naver.com
                    </HoverDiv>
                    <HoverDiv onClick={() => handleEmail('@email.com')}>
                      @email.com
                    </HoverDiv>
                    <HoverDiv onClick={() => handleEmail('@email.com')}>
                      @email.com
                    </HoverDiv> */}
                  </EmailBox>
              </Verification>
              {/* <ErrorMessage>{emailMessage}</ErrorMessage> */}
            </VerificationBox>
          </JoinBox>
        </JoinBoxContainer>
      

        <NextButton>
          <input className="nextButton" type="submit" value="회원가입" />
        </NextButton>
      </MainConationer>
    </Container>
  );
};

export default Signup;