import React,{useState} from 'react'
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
    width: 20%;
    flex-shrink: 0;
`;

const CategroyP1 = styled.div`
    display: flex;
    padding: 4vw 0vw 2vw 6vw;
    font-weight: 600;
    font-size: 1.2vw;
    color : #2E2923;


    &:hover ,
    &:active { 
        color: #9DBD5D;
    }
`;

const CategroyP = styled.div`
    display: flex;
    padding: 0.8vw 0vw 0.8vw 6vw;
    font-weight: 600;
    font-size: 1vw;
    color : #2E2923;

    &:hover ,
    &:active { 
        color: #9DBD5D;
    }
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 0vw 1.5vw 1.5vw 1.5vw;
    margin: 0vw 5.7vw 0vw 0vw;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1vw 0.3vw;
    align-items: center;
    justify-content: flex-start; 
    margin: 1vw 1vw 0vw 1vw;
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
    border:0.06vw solid #99CC31;
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

const DateText = styled.div`
    font-size: 0.7vw;
    font-weight: 500;
`;

const FeedPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0vw 1vw;
    border-top: 0.06vw solid #99CC31;
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
    border: 0.06vw solid #99CC31;
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
    border-left: 0.06vw solid #99CC31;
`;

const CommentWriteContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
    width: 100%;
`;
const CommentWriteBox = styled.input`
    height: auto;
    display: flex;
    font-size: 0.9vw;
    font-weight: 500;
    padding: 0.5vw 0.5vw 0.5vw 2vw;
    border-left: 0.06vw solid #99CC31;

    flex-grow: 1;
    box-sizing: border-box;
    line-height: 2.5vw;  // 높이랑 동일하게 맞춰서 중앙정렬
    color: #9e9e9e;

    &::placeholder {
        color: #9e9e9e;
        font-size: 0.75vw;
        font-weight: 600;
        line-height: 2.5vw;  // placeholder도 동일하게 중앙정렬
  }
`;

const CommentButton = styled.button`
    margin: 0.6vw;
    border-radius: 1.3889vw;
    text-decoration: none;

    border: 0.1vw solid #99CC31; 
    background-color: #D9EDAF;
    color: #2E2923;

    font-size: 0.8vw;
    font-weight: 600;

    &:hover,
    &:active { 
        border: 0.1vw solid #99CC31; 
    }
`;

const PostPage = () => {

    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: "혜원", text: "재밌어요", time: "1시간 전" },
    ]);

    const handleAddComment = () => {
        if (commentInput.trim() === "") return;
        const newComment = {
          id: Date.now(),
          user: "익명", // 필요에 따라 사용자 정보 바꾸기
          text: commentInput,
          time: "방금 전"
        };
        setComments(prev => [...prev, newComment]);
        setCommentInput('');
      };
      

  return (
    <Container>

        <CategroyContainer>
            <CategroyP1>게시글 카테고리 목록</CategroyP1>
            <CategroyP to="/post">인기글</CategroyP>
            <CategroyP to="/post">전체 게시판</CategroyP>
            <CategroyP>자유 게시판</CategroyP>
            <CategroyP>반려동물 정보 게시판</CategroyP>
            <CategroyP>맛집 게시판</CategroyP>                
            <CategroyP>산책로 추천 게시판</CategroyP>
        </CategroyContainer>

        <MainContainer>

            <TitleContainer>
                <Title>제목</Title>

                <UserWrapper>
                    <UserImg/>
                    <UserContainer>
                        <UserId>혜원</UserId>
                        <DateText>1시간 전</DateText>
                    </UserContainer>
                </UserWrapper>

            </TitleContainer>

            <FeedPageContainer>

                <FeedPageBox>
                    푸하하
                </FeedPageBox>
    
                {comments.map((c) => (
                    <CommentContainer key={c.id}>
                        <UserWrapper2>
                            <UserImg />
                            <UserContainer>                              
                                <UserId>{c.user}</UserId>
                                <DateText>{c.time}</DateText>
                            </UserContainer>
                        </UserWrapper2>
                        <CommnetBox>{c.text}</CommnetBox>
                        </CommentContainer>
                    ))}

            {/* 댓글 작성창 */}
                <CommentContainer>
                    <UserWrapper2>
                        <UserImg />
                        <UserContainer>
                        <UserId>나</UserId>
                        <DateText>현재</DateText>
                        </UserContainer>
                    </UserWrapper2>
                    <CommentWriteContainer>
                        <CommentWriteBox
                        placeholder="댓글을 입력하세요"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <CommentButton onClick={handleAddComment}>작성하기</CommentButton>
                    </CommentWriteContainer>
                </CommentContainer>

                {/* </CommentContainer> */}
                
            </FeedPageContainer>
        </MainContainer>
    </Container>
  )
}

export default PostPage