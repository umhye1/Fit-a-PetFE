import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display : flex;
    align-items: center;
    flex-direction: row;
    margin : 1.0417vw 2.7778vw ;
`;

const TitleBox = styled.div`
    font-size: 1.2vw;
    font-weight: 600;
    padding: 0.5vw 0vw 0.2vw 3.75vw;
`;

const FriendBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.6vw 0vw 1.2vw 3.75vw;
    width: 86.1vw;
    justify-content: space-between;
`;

const PhotoBox = styled.div`
    width : 6.5vw;
    height: 6.5vw;
    background-color: #F3F4E3;
    border-radius: 20px;
`;

const RecommendWalkMate = () => {
  return (
    <Container>
        <FriendBox>
            <TitleBox>추천 친구</TitleBox>
            <PhotoContainer>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
                <PhotoBox/>
            </PhotoContainer>
        </FriendBox>

    </Container>
  )
}

export default RecommendWalkMate