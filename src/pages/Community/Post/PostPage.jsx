import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: center;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const CategroyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 13.4vw;
    padding: 3.3vw 0vw 0vw 5.8vw;
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

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5vw;
    width: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1vw 5.9vw 0.3vw 1vw;
    align-items: center;
    justify-content: flex-start; 
`;

const Title = styled.p`
    font-size: 1.5vw;
    font-weight: 600;
`;

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;    
    gap: 0.5vw;      
`;

const UserWrapper2 = styled.div`
    display: flex;
    align-items: center;  
    margin-right: auto;    
    gap: 0.5vw;      
`;

const UserImg = styled.div`
    width : 4vw;
    height: 4vw;
    border-radius: 50%;
    background: white;
    border:0.06vw solid #3D8D7A;
`;

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 4vw;
    height: 4vw;
    padding:0.3vw;
    gap: 0.3vw;
`;

const UserId = styled.div`
    font-size: 0.8vw;
    font-weight: 600;
`;

const Date = styled.div`
    font-size: 0.7vw;
    font-weight: 500;
`;

const FeedPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0vw 5.9vw 1vw 0vw;
    border-top: 0.06vw solid #3D8D7A;
`;

const FeedPageBox = styled.div`
    height: auto;
    padding: 2vw 0vw 7vw 1vw;
    font-size: 1vw;
    font-weight: 500;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0.06vw solid #3D8D7A;
    padding: 0.5vw 1vw 0.5vw;
    margin-bottom: 1.3vw;
`;

const CommnetBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    font-size: 0.9vw;
    font-weight: 500;
    padding: 0.5vw 0.5vw 0.5vw 2vw;
    border-left: 0.06vw solid #3D8D7A;
`;

const FeedPage = () => {
  return (
    <Container>

        <CategroyContainer>
            <CategroyP>인기글</CategroyP>
        </CategroyContainer>

        <MainContainer>

            <TitleContainer>
                <Title>제목</Title>

                <UserWrapper>
                    <UserImg/>
                    <UserContainer>
                        <UserId>혜원</UserId>
                        <Date>1시간 전</Date>
                    </UserContainer>
                </UserWrapper>

            </TitleContainer>

            <FeedPageContainer>

                <FeedPageBox>
                    푸하하
                </FeedPageBox>

                <CommentContainer>
                    <UserWrapper2>
                        <UserImg/>
                        <UserContainer>
                            <UserId>혜원</UserId>
                            <Date>1시간 전</Date>
                        </UserContainer>
                    </UserWrapper2>

                    <CommnetBox>재밌어요</CommnetBox>

                </CommentContainer>

                <CommentContainer>
                    <UserWrapper2>
                        <UserImg/>
                        <UserContainer>
                            <UserId>혜원</UserId>
                            <Date>1시간 전</Date>
                        </UserContainer>
                    </UserWrapper2>

                    <CommnetBox>재밌어요</CommnetBox>
                    
                </CommentContainer>
                
            </FeedPageContainer>
        </MainContainer>
    </Container>
  )
}

export default FeedPage