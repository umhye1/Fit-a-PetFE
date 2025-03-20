import React,{useState} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

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
  font-size: 1vw;
  font-weight: 700;
  line-height: 1.5625vw;
  border-top: 0.06vw solid #3D8D7A;
  width: 62.8vw;
  padding-top: 1vw;
`;

const Name = styled.div`
   padding-bottom: 1.8vw;
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
`
const Email = styled.div`
    padding-bottom: 1.8vw;
    .email{
        display: flex;
        width: 50vw;
        height: 2vw;
        padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
        margin-top: 0.5208vw;
        align-items: center;
        gap: 0.8333vw;  
        flex-shrink: 0;
        border-radius: 0.2604vw;
        border: 0.0521vw solid var(--Gray-Gray-300, #d1d1d1);

        color: var(--Gray-Gray-500, #9E9E9E);
        font-size: 0.8vw;
        font-weight: 700;
    }
`
const VerificationCode = styled.div`
    font-size: 1vw;
    font-weight: 700;
.register{
    display: flex;
    position: relative;
}
.verificationCode{
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
    color: var(--Gray-Gray-500, #9E9E9E);
    font-size: 0.8vw;
    font-weight: 700;
}
.registerButton{
    display: flex;
    position: absolute;
    height: 2.0833vw;
    top: 28%;
    left: 35%;
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
}
`;

const NextButton = styled(Link)`
    display: flex;
    justify-content: center;

.nextButton{
    width: 16vw;
    height: 2.6042vw;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    text-align: center;

    font-size: 0.8vw;
    font-weight: 600;
    background-color: #3D8D7A;
    color: #FBFFE4;
    border: none;
    border-radius: 1vw;
    cursor: pointer;
    box-shadow: none;
    padding: 0vw 0.6vw;
    text-decoration: none;
}
`;

const FindPassword = () => {

    // const [nameError, setNameError] = useState('');
    // const [emailError, setEmailError]= useState('');
    // const [codeNumberError, setCodeNumberError] = useState('');
    // const [emailMessage, setEmailMessage]= useState('');

    // const [inputValue, setInputValue] = useState({
    //     userName: '',
    //     userEmail: '',
    //   });

    // const handleInputChange =(e) =>{ // userName
    //     setInputValue({...inputValue,userName: e.target.value });    
    // };
    
    // const handleInputChange2 =(e) =>{// userEmail
    //     setInputValue({...inputValue, userEmail: e.target.value});
    // };

    // const handleInputChange3 =(e)=>{ // userCodeNum
    //     setInputValue({...inputValue,userCodeNum: e.target.value});
    // };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setEmailMessage('');
        
    //     try {
    //       const response = await axios.post(
    //         'https://bloodtrail.site/auth/check-email',
    //         { email: inputValue.userEmail }
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
    

    // const handleSubmit2 = async(e) =>{
    //     e.preventDefault();
    //     setNameError('');
    //     setEmailError('');
    //     setCodeNumberError('');

    //     let isValid = true;
    //     if (!inputValue.userName.trim()){
    //         setNameError('이름을 입력해주세요.');
    //         isValid = false;
    //     }

    //     if (!inputValue.userEmail.trim()){
    //         setEmailError('이메일을 입력해주세요.');
    //         isValid = false;
    //     }

    //     if(!inputValue.userCodeNum.trim()){
    //         setEmailError('인증번호를 입력해주세요.');
    //         isValid = false;
    //     }

    //     if(!isValid){
    //         return;
    //     }
    //     try{
    //         const response = await axios.patch(
    //             'https://bloodtrail.site/auth/find-password',
    //             {email: inputValue.userEmail}
    //         );

    //         console.log(response.data);

    //         if(response.data.isSuccess){
    //             window.location.href = "/findPassword/success";
    //             console.log("새 비밀번호 발송 완료")
    //         }
    //     }
    //     catch(error){
    //         console.error('에러: ',error);
    //     }
    // };

    
    return(
        <Container>
            <MainConationer>

                <Title>비밀번호 찾기</Title>
                <SubTitile>찾고자 하시는 비밀번호의 아이디(이메일)를 입력해주세요.</SubTitile>
                <JoinBoxContainer>
                    <JoinBox>
                        <Name>
                            이름
                            <input 
                                className="name" 
                                type="text" 
                                placeholder="실명을 입력해주세요"/>
                                {/* value={inputValue.userName}
                                onChange={handleInputChange}/> */}
                        </Name>
                        <Email>
                            이메일
                            <input 
                                className="email" 
                                type="email" 
                                placeholder="이메일을 입력해주세요"/>
                                {/* value={inputValue.userEmail}
                                onChange={handleInputChange2}/> */}
                        </Email>
                        <VerificationCode>
                            인증번호 입력
                                <div className='register'>
                                <input 
                                    className="verificationCode" 
                                    type="text" 
                                    placeholder="인증번호를 입력해주세요"/>
                                    {/* value={inputValue.userCodeNum}
                                    onChange={handleInputChange3}/> */}
                                <button className="registerButton">등록하기</button>
                                </div>
                        
                        </VerificationCode>
                    </JoinBox>
                </JoinBoxContainer>

                <NextButton to="/newPassword">
                    <input 
                        className='nextButton' 
                        type="submit" 
                        value="다음으로 넘어가기"
                        />
                </NextButton>
                
                
            </MainConationer>

            </Container>
    )
}

export default  FindPassword;