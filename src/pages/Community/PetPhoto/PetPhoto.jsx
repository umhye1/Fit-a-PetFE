import React from 'react'
import styled from 'styled-components';
import RecommendWalkMate from '../RecommendWalkMate/RecommendWalkMate';
import { Card } from '../../../components/Card/Card';

const CommunityContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #FBFFE4;
  flex-direction: column;

`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;

`;

const CategroyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 13.4vw;
    padding: 1.5vw 0vw 0vw 5.8vw;
    flex-shrink: 0;
`;

const CategroyP = styled.div`
    display: flex;
    padding: 0.7vw;
    font-weight: 600;
    font-size: 1vw;
    &:visited { 
        color: #3D8D7A;
    }
    &:hover { 
        color: #3D8D7A; 
    }
    &:active { 
        color: #3D8D7A;
    }
`;

const PetPhotoContainer= styled.div`
    width: 100%;
    background-color: lightgray;
    width: calc(100% - 19.2vw);
`;



const PetPhoto = () => {
  return (
    <CommunityContainer>
        <RecommendWalkMate/>
        <MainContainer>
            <CategroyContainer>
                <CategroyP>인기글</CategroyP>
            </CategroyContainer>
            <PetPhotoContainer>
                <Card/>
            </PetPhotoContainer>

        </MainContainer>
    </CommunityContainer>
  )
}

export default PetPhoto