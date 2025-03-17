import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";

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

const JoinBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8vw 30vw 10vw 30vw;
    padding: 4vw;
    border: 0.0521vw solid #3D8D7A;
    border-radius: 0.2604vw;
`;

const BoxP = styled.div`
    display: flex;
    justify-content: center;

    font-size: 1.2vw;
    font-weight: 600;
`;
const BoxP2 = styled.div`
    display: flex;
    justify-content: center;
    padding: 1.2vw 0vw 3vw 0vw;

    font-size: 0.8vw;
    font-weight: 500;
`;

const NextButton = styled.div`
    display: flex;
    justify-content: center;

.newPasswordSuccess{
   width: 16vw;
    height: 2.6042vw;
    border-radius: 1vw;
    background-color: #3D8D7A;
    color: white;
    font-size: 0.9vw;
    font-style: normal;
    font-weight: 600;
    border: none;
    cursor: pointer;
    box-shadow: none;
    }
`

const NewPassword = () => {

    return(
        <Container>
            <MainConationer>

                <Title>비밀번호 찾기</Title>

                <JoinBox>
                    <BoxP>새로운 비밀번호가 이메일로 전송되었습니다.</BoxP>
                    <BoxP2>이메일을 확인해주세요.</BoxP2>
                    <NextButton>
                    <Link to="/">
                    <input className='newPasswordSuccess' type="submit" value="다시 로그인하기"/>
                    </Link>
                </NextButton>
                </JoinBox>
            </MainConationer>
        </Container>
    )
}

export default  NewPassword;