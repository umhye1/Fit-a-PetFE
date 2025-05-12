import React from 'react'
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
  align-items: center;
  margin: 1.5vw 1.5vw 5vw 1.5vw;
`;

const JoinBox = styled.div`
  font-size: 1vw;
  font-weight: 700;
  line-height: 1.5625vw;
  border-top: 0.06vw solid #99CC31;
  width: 62.8vw;
  padding-top: 1vw;

`;

const NewPasswordP = styled.div`
    padding-bottom: 1.8vw;
    .name{
        display: flex;
        width: 61.4583vw;
        height: 2vw;
        padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
        margin-top: 0.5208vw;
        align-items: center;
        gap: 0.8333vw;  
        flex-shrink: 0;
        border-radius: 0.2604vw;
        border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);
        color: var(--Gray-Gray-500, #9E9E9E);

        font-size: 0.8vw;
        font-weight: 700;
    }
`;
const NewPasswordP2 = styled.div`
    padding-bottom: 1.8vw;
    color: #2E2923;
    .email{
        display: flex;
        width: 61.4583vw;
        height: 2vw;
        padding: 0.5208vw 0.5208vw 0.5208vw 0.7813vw;
        margin-top: 0.5208vw;
        align-items: center;
        gap: 0.8333vw;  
        flex-shrink: 0;
        border-radius: 0.2604vw;
        border: 0.0521vw solid var(--Gray-Gray-300, #99CC31);

        color: var(--Gray-Gray-500, #9E9E9E);
        font-size: 0.8vw;
        font-weight: 700;
    }
`;


const NextButton = styled.div`
    display: flex;
    justify-content: center;

.newPasswordSuccess{
    width: 16vw;
    height: 2.6042vw;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 0vw 0.6vw;

    background-color: #99CC31;
    color: white;
    font-size: 0.8vw;
    font-weight: 600;
    border-radius: 1vw;
    border: none;
    text-decoration: none;
    cursor: pointer;
    box-shadow: none;

    }
`

const NewPassword = () => {

    return(
        <Container>
            <MainConationer>

                <Title>비밀번호 찾기</Title>
                <SubTitile>새 비밀번호를 입력해주세요</SubTitile>
                <JoinBoxContainer>
                    <JoinBox>
                        <NewPasswordP>
                            새 비밀번호 입력
                            <input className="name" type="text" placeholder="새 비밀번호를 입력해주세요"/>
                        </NewPasswordP>
                        <NewPasswordP2>
                            새 비밀번호 다시 입력
                            <input className="email" type="email" placeholder="새 비밀번호를 다시 입력해주세요"/>
                        </NewPasswordP2>
                    </JoinBox>
                </JoinBoxContainer>

                <NextButton>
                    <Link to="./success">
                    <input className='newPasswordSuccess' type="submit" value="비밀번호 변경하기"/>
                    </Link>
                </NextButton>
                
                
            </MainConationer>

            </Container>
    )
}

export default  NewPassword;