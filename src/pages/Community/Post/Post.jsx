import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RecommendWalkMate from '../RecommendWalkMate/RecommendWalkMate';

const CommunityContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #FBFFE4;
  flex-direction: column;

`;

const LocationContainer = styled.div`
  height: 8vh;
  margin: 0vw 4vw 2vw 4vw;
  background-color: white;
  font-size: 1.5vw;
  font-weight: 600; 
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

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5vw;
    width: calc(100% - 19.2vw);
`;

const FeedBoxContainer = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-between; 
    align-items: center;
    margin: 0vw 5.7vw 0vw 0vw;
`;

const FeedWrite = styled(Link)`
    padding: 0.3vw 0.9vw;
    margin: 0.6vw;
    border-radius: 1.3889vw;
    text-decoration: none;
    color: #3D8D7A;;
    border: 0.1vw solid #3D8D7A;
    font-size: 0.8vw;
    font-weight: 600;

    &:visited { 
        color: #3D8D7A;
        border: 0.1vw solid #3D8D7A;
    }
    &:hover { 
        color: #3D8D7A;
        border: 0.1vw solid #3D8D7A;
    }
    &:active { 
        color: #3D8D7A;
        border: 0.1vw solid #3D8D7A;
    }
`;

const FeedBoxTitle = styled.div`
    font-size: 1.2vw;
    font-weight: 600;
    padding: 1vw 1vw 1vw 0vw;
`;

const FeedBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.7vw;
    margin: 0.3vw 6.25vw 0.3vw 0vw;
    border: 0.1vw solid #3D8D7A; 
    
`;
const FeedTitle = styled.div`
    font-size: 1vw;
    font-weight: 500;
    margin: 0vw 0vw 0.5vw 0vw; 
`;

const FeedP = styled.div`
    font-size: 0.88vw;
    font-weight: 400;
    margin: 0.5vw 0vw 0.5vw 0vw; 
`;


const Feed = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/PostPage');  
    };
    
  return (
    <CommunityContainer>
        <RecommendWalkMate/>
        {/* <LocationContainer>위치</LocationContainer> */}
        <MainContainer>
            <CategroyContainer>
                <CategroyP>인기글</CategroyP>
                <CategroyP>반려용품 추천</CategroyP>
                <CategroyP>산책로 추천</CategroyP>
            </CategroyContainer>
            <FeedContainer>
                <FeedBoxContainer>
                    <FeedBoxTitle>동네 생활 자유 게시판</FeedBoxTitle>
                    <FeedWrite to="/PostWrite">새 글쓰기</FeedWrite>
                </FeedBoxContainer>
                <FeedBox onClick={handleClick}>
                    <FeedTitle>안뇽ㅎㅎ</FeedTitle>
                    <FeedP>처음뵙겠습니당ㅋㅋ</FeedP>
                </FeedBox>
                <FeedBox>
                    <FeedTitle>안뇽ㅎㅎ</FeedTitle>
                    <FeedP>처음뵙겠습니당ㅋㅋ</FeedP>
                </FeedBox>
                <FeedBox>
                    <FeedTitle>안뇽ㅎㅎ</FeedTitle>
                    <FeedP>처음뵙겠습니당ㅋㅋ</FeedP>
                </FeedBox>
                <FeedBox>
                    <FeedTitle>안뇽ㅎㅎ</FeedTitle>
                    <FeedP>처음뵙겠습니당ㅋㅋ</FeedP>
                </FeedBox>
                <FeedBox>
                    <FeedTitle>안뇽ㅎㅎ</FeedTitle>
                    <FeedP>처음뵙겠습니당ㅋㅋ</FeedP>
                </FeedBox>
                <FeedBox>
                    <FeedTitle>안뇽ㅎㅎ</FeedTitle>
                    <FeedP>처음뵙겠습니당ㅋㅋ</FeedP>
                </FeedBox>
            </FeedContainer>
        </MainContainer>
    </CommunityContainer>
  )
}

export default Feed

