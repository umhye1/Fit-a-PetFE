import React,{useState} from 'react'
import {Link, NavLink} from "react-router-dom";
import styled from 'styled-components'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


const Container = styled.div`
    display: flex;
    width: 100%;
`;

const MainConationer =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5vw;
    width: 100%;
`;

const Title = styled.div`
    font-size: 1.2vw;
    font-weight: 600;
    padding: 1vw 1vw 1vw 5.1vw;
`;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 2vw 0vw 6vw 0vw;
`;

const LoginBox = styled.div`
    width: 24.4792vw;
    height: 22.2917vw;
    flex-shrink: 0;
    border-radius: 0.2604vw;
    border: 0.0521vw solid #9DBD5D;
`;

const InputBox = styled.div`
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
        font-weight: 500;
        font-size: 0.75vw;
        color: #9E9E9E;
        border: 0.08vw solid #9DBD5D; 
        cursor: pointer;
        box-shadow: none;
    }
`;

const Alert = styled.div`
    display: inline-flex;
    position: absolute;
    margin-top: 10vw;
    left: 39.8%;
    padding: 0.5vw;
    justify-content: center;
    align-items: center;
    gap: 0.5208vw;
    border-radius: 0.2604vw;
`;
const AlertP = styled.div`
    font-size: 0.7vw;
    font-weight: 500;
    padding-left: 0.5208vw;
`;

const LoginButton =styled.button`
    width: 16vw;
    height: 2.6042vw;
    border-radius: 1vw;
    background-color: #99CC31;;
    color: white;
    font-size: 0.9vw;
    font-style: normal;
    font-weight: 600;
    margin-top:1.75vw;
    border: none;
    cursor: pointer;
    box-shadow: none;
   
    &:disabled {
        cursor: not-allowed;
    }
`;

const FindContainer = styled.div`
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
    &:active { 
        color: #99CC31;
        text-decoration: none;
    }
`;



function Login() {
    const [inputValue, setInputValue] = useState({
        userId: '',
        userPassword: '',
      });
    const { userId, userPassword } = inputValue;
    const [alertMessage, setAlertMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = () => {
        if (userId === 'admin' && userPassword === 'admin') {
          login('dummyToken'); // 하드코딩된 임의 토큰
          navigate('/');
        } else {
          setAlertMessage('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    return (
        <Container>
            <MainConationer>
                <Title>로그인</Title>
                
                <LoginContainer>
                  
                    <LoginBox>
                        <InputBox>
                            <input className="id" type="text" placeholder="ID" value={inputValue.userId}
                            onChange={(e)=>setInputValue({...inputValue,userId: e.target.value})}/>
                            <input className="password" type="password" placeholder="PASSWORD" value={inputValue.userPassword}
                            onChange={(e)=>setInputValue({...inputValue,userPassword: e.target.value})}/>
                             {alertMessage &&(
                                <Alert>
                                    <img src={alert} alt="alert-circle" style={{ width: '1.2vw', height: '1.2vw' }}></img>
                                    <AlertP>{alertMessage}</AlertP>
                                </Alert>
                             )}
                            <Link to ="/">
                                <LoginButton onClick={handleSubmit}>로그인</LoginButton>
                            </Link>
                        </InputBox>
                        
                        <FindContainer>
                            <FindP to="/findPassword">비밀번호찾기</FindP>
                            <FindP to="/signup">회원가입</FindP>
                        </FindContainer>
                    </LoginBox>
                </LoginContainer>
                

            </MainConationer>
        </Container>
    )
}

export default Login;


