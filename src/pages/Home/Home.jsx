import React from 'react'
import styled from 'styled-components';


const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FBFFE4;
`;

const HomeTitle = styled.div`
  font-size: 5vw;
  font-weight: 800;
  padding: 15vw 0vw 3vw 0vw;
`;

const HomeP = styled.div`
  font-size: 2vw;
  font-weight: 600;
`;

export const Home = () => {
  return (
    <HomeContainer>
      <HomeTitle>Fit-a-Pet</HomeTitle>
      <HomeP>반려인을 위한 반려동물 산책 플랫폼</HomeP>
    </HomeContainer>
  )
}
export default Home;
