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
    padding: 0.6vw 0vw 0vw 2vw;
`;

const FriendBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const PhotoBox = styled.div`
    width : 6.5vw;
    height: 6.5vw;
    background-color: #F0F0EF;
    border-radius: 20px;
    margin: 1.4583vw;
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