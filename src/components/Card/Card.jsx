import React from 'react'
import styled from 'styled-components'
import like1 from '../../assets/images/like1.png'
import like2 from '../../assets/images/like2.png'

const Container = styled.div`
    width: 100%;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 72.8vw;
    justify-content: space-between;
`;

const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    width : 22vw;
    height: 28vw;
    background-color: #F0F0EF;
    border-radius: 15px;
    margin: 1.5vw;
`; 

const CardImg = styled.div`
    width: 19vw;
    height: 19vw;
    margin: 1.5vw 1.5vw 0vw 1.5vw;
    background-color: lightgray;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CardTitle = styled.div`
    font-size: 1vw;
    font-weight: 500;
    margin: 1.5vw;
`;

const LikeImg = styled.img`
    width : 1vw;
    height : 1vw;
    margin: 1.5vw 1.5vw 0vw 1.5vw;
`;

const TagContainer = styled.div`
    margin: 1vw 1.5vw;
    display: flex;
    flex-direction: row;
`;

const TagP = styled.div`
    margin: 0vw 0.5vw 0.5vw 0vw;
    border: 0.1vw solid #3D8D7A; 
    border-radius: 20px;
    padding : 0.3vw 0.5vw;
    font-size : 0.8vw;
    font-weight: 700;
    color: #3D8D7A
`;

export const Card = () => {
    
  return (
    <Container>
        <CardContainer>
            <CardBox>
                <CardImg/>
                <TitleContainer>
                    <CardTitle>안녕하세요</CardTitle>
                    <LikeImg src ={like1} alt = "like1"/>
                </TitleContainer>
                <TagContainer>
                    <TagP>내향적인</TagP>
                    <TagP>산책좋아</TagP>
                    <TagP>간식좋아</TagP>
                </TagContainer>
            </CardBox>
            <CardBox>
                <CardImg/>
                <CardTitle>안녕하세요</CardTitle>
                <TagContainer>
                    <TagP>내향적인</TagP>
                    <TagP>산책좋아</TagP>
                    <TagP>간식좋아</TagP>
                </TagContainer>
            </CardBox>
            <CardBox>
                <CardImg/>
                <CardTitle>안녕하세요</CardTitle>
                <TagContainer>
                    <TagP>내향적인</TagP>
                    <TagP>산책좋아</TagP>
                    <TagP>간식좋아</TagP>
                </TagContainer>
            </CardBox>
            
        </CardContainer>
    </Container>
  )
}
