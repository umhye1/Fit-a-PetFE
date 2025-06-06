import styled from 'styled-components'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import search1 from '../../../assets/images/search1.png'
import search2 from '../../../assets/images/search2.png'
import dog1 from '../../../assets/images/dog1.png'
import dog2 from '../../../assets/images/dog2.png'
import dog3 from '../../../assets/images/dog3.png'
import cat1 from '../../../assets/images/cat1.png'

const Container = styled.div`
    background-color: #FFFFF0 ;
`;

const BoxContainer = styled.div`
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

const SearchBox = styled.div`
    width : 6.5vw;
    height: 6.5vw;
    background-color: #F7F8F2;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PhotoBox = styled.img`
    width : 6.5vw;
    height: 6.5vw;
    background-color: #F7F8F2;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-decoration: none;
    color: inherit;
    height: 100%;   
    width: 100%;
`;

const SearchImg = styled.img`
    width: 2.3vw;
    height: 2.3vw;
`;

const SearchP = styled.div`
    padding-top: 0.6vw;
    font-size: 0.7vw;
    font-weight: 600;
    text-align : center;
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #F7F8F2;
`;

const SearchBarContainer = styled.div`
    width: 60vw;
    height: 4.2vw;
    border: 0.1vw solid #CECAC5;
    border-radius: 1vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3vw;
    padding: 0 1vw;
    font-size: 0.9vw;
    color: #2E2923;
    outline: none;
    cursor: text;
    overflow: hidden;
    position: relative;
`;
const TagContainer = styled. div`
    display: flex;
    flex-direction: row; 
    justify-content: flex-start; 
    align-items: flex-start;
    margin-bottom: 2vw;
    margin-top: 0.5vw;
    width: 62%;
    
`;

const TagBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1vw;
`;

const TagTitleContainer = styled.div`
    margin: 1vw 1.5vw;
`;

const TagTitleP = styled.div`
    font-size: 1vw;
    font-weight: 500;
    margin: 0.3vw 0vw 1.0vw;
    color: #2E2923;
`;

const TagPContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-bottom: 0.5vw;
`;

const TagP = styled.div`
    border: 0.1vw solid #D9EDAF; 
    background-color: #D9EDAF; 
    border-radius: 20px;
    padding : 0.3vw 0.5vw;
    font-size : 0.8vw;
    font-weight: 600;
    color: #2E2923;
    margin-right:0.5vw;
`;

const TagP2 = styled.div`
    border: 0.1vw solid #4A4031;
    background-color: #4A4031;
    border-radius: 20px;
    padding : 0.3vw 0.5vw;
    font-size : 0.8vw;
    font-weight: 600;
    color: white;
    margin-right:0.5vw;
`;


const RecommendWalkMate = () => {
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchClick = () => {
        setShowSearch(prev => !prev);
      };

  return (
    <Container>
        <BoxContainer>
            <FriendBox>
                <TitleBox>추천 산책 메이트</TitleBox>

                <PhotoContainer>
                    <SearchBox  onClick={handleSearchClick}>
                        {/* <StyledLink to="/searchMate" style={{ textDecoration: 'none', color: 'inherit' }}> */}
                            <SearchImg src ={search1} alt = "SearchImg"/>
                            <SearchP>산책 메이트<br/>검색</SearchP>
                        {/* </StyledLink> */}
                    </SearchBox>

                    <PhotoBox src ={cat1}/>
                    
                    <PhotoBox src ={dog2}/>
                    <PhotoBox src ={dog1}/>
                    <PhotoBox src ={dog3}/>
                    <PhotoBox/>
                    <PhotoBox/>
                    <PhotoBox/>
                    <PhotoBox/>
                    <PhotoBox/>

                </PhotoContainer>

            </FriendBox>
        </BoxContainer>

        {showSearch && (
        <SearchContainer>
            <SearchBarContainer
             contentEditable={true}
             suppressContentEditableWarning={true}>
                산책 메이트, 성향 검색
                <SearchImg src ={search2} alt = "SearchImg" style={{ marginLeft: 'auto' }}/>
            </SearchBarContainer>
            

            <TagContainer>

                <TagTitleContainer>
                    <TagTitleP># 추천 펫 성향 태그</TagTitleP>
                    <TagTitleP># 추천 주인 성향 태그</TagTitleP>
                </TagTitleContainer>

                <TagBoxContainer>

                    <TagPContainer>
                        <TagP>내향적인</TagP>
                        <TagP>외향적인</TagP>
                        <TagP>활발한</TagP>
                        <TagP>까칠한</TagP>
                        <TagP>겁이 많은</TagP>
                        <TagP>관찰 필수</TagP>
                    </TagPContainer>

                    <TagPContainer>
                        <TagP2>내향적인</TagP2>
                        <TagP2>외향적인</TagP2>
                        <TagP2>내향적인</TagP2>
                        <TagP2>외향적인</TagP2>
                        <TagP2>내향적인</TagP2>
                        <TagP2>외향적인</TagP2>
                    
                    </TagPContainer>

                </TagBoxContainer>
                
            </TagContainer>
        </SearchContainer>
        )}
    </Container>
  )
}

//GIT BRANCH TEST
export default RecommendWalkMate