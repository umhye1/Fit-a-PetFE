import React from 'react'
import styled from 'styled-components';
import RecommendWalkMate from '../RecommendWalkMate/RecommendWalkMate';
import { Card } from '../../../components/Card/Card';

const CommunityContainer = styled.div`
  display: flex;
  width: 100%;
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
    padding: 0.8vw;
    font-weight: 600;
    font-size: 1vw;
    color : #2E2923;

    &:hover ,
    &:active { 
        color: #9DBD5D;
    }
`;

const PetPhotoContainer= styled.div`
    width: 100%;
    width: calc(100% - 19.2vw);
`;

const PetPhotoTitle = styled.div`
    font-size: 1.2vw;
    font-weight: 600;
    padding: 2.19vw 1.5vw 0vw 1.5vw;
    color: #2E2923;
`;


const PetPhoto = () => {
  return (
    <CommunityContainer>
        <RecommendWalkMate/>
        <MainContainer>
            <CategroyContainer>
                <CategroyP>내 펫 뽐내기</CategroyP>
            </CategroyContainer>
            <PetPhotoContainer>
                <PetPhotoTitle>내 펫 뽐내기</PetPhotoTitle>
                <Card/>
            </PetPhotoContainer>

        </MainContainer>
    </CommunityContainer>
  )
}

export default PetPhoto