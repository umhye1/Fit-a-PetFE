import React from 'react'
import styled from 'styled-components';

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

const SearchContainer = styled.div`

`;


export const SearchMate = () => {
  return (
    <Container>
        <MainConationer>
            <Title>Search Mate</Title>
            <SubTitile>검색</SubTitile>
        </MainConationer>
    </Container>
  )
}

export default SearchMate
