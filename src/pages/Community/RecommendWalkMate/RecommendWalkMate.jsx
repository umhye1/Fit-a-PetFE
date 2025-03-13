import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display : flex;
    align-items: center;
    flex-direction: row;
    margin : 1.0417vw 2.7778vw ;
`;
const FriendBox = styled.div`
    display: flex;
    flex-direction: row;
`;
const PhotoBox = styled.div`
    width : 6.5vw;
    height: 6.5vw;
    background-color: #F3F4E3;
    border-radius: 20px;
    margin: 1.4583vw;
`;

const RecommendWalkMate = () => {
  return (
    <Container>
        <FriendBox>
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
        </FriendBox>

    </Container>
  )
}

export default RecommendWalkMate