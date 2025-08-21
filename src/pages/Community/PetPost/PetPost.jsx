import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const FeedBoxContainer = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-between; 
    align-items: center;
    margin: 0vw 5.7vw 0vw 0vw;
`;

const FeedBoxTitle = styled.div`
    font-size: 1.2vw;
    font-weight: 600;
    margin : 2.2vw 0vw 1vw 3vw;
    color : #2E2923;
`;

const FeedWrite = styled(Link)`
    padding: 0.3vw 0.9vw;
    margin: 0.6vw;
    border-radius: 1.3889vw;
    text-decoration: none;

    // border: 0.1vw solid #99CC31; 
    background-color: #D9EDAF;
    color: #2E2923;

    font-size: 0.8vw;
    font-weight: 600;

    &:hover,
    &:active { 
        border: 0.1vw solid #99CC31; 
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
                <FeedBoxContainer>
                    <FeedBoxTitle>동네 생활 자유 게시판</FeedBoxTitle>
                    <FeedWrite to="/PetpostWrite">새 글쓰기</FeedWrite>
                </FeedBoxContainer>

                <Card/>
            </PetPhotoContainer>

        </MainContainer>
    </CommunityContainer>
  )
}

export default PetPhoto