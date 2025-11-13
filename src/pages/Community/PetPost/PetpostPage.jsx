import React, { useState ,useEffect} from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { UI } from '../../../styles/uiToken';
import PetpostInfo from './PetpostInfo';
import { useParams } from 'react-router-dom';
import { getPetPost } from '../../../lib/api';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const Layout = styled.div`
  display: flex;
  gap: 2vw;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.5vw;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  flex-shrink: 0;
`;

const Content = styled.main`
  width: 71%;
  min-width: 0;
`;

/* ===== Sidebar ===== */
const CategoryTitle = styled.div`
  display: flex;
  padding: 4vw 0 2vw 6vw;
  font-weight: 600;
  font-size: 1.2vw;
  color : #2E2923;
  &:hover, &:active { color: #9DBD5D; }
`;

const CategoryLink = styled(Link)`
  display: flex;
  padding: 0.8vw 0 0.8vw 6vw;
  font-weight: 600;
  font-size: 1vw;
  color : #2E2923;
  text-decoration: none;
  &:hover, &:active { color: #9DBD5D; }
`;

/* ===== Post header ===== */
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 1.2vw 1.5vw 1.5vw;  
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1vw;
  padding: 1vw 0.3vw 0;  
  margin: 0; 
`;

const Title = styled.h1`
  font-size: 1.5vw;
  font-weight: 600;
  color: ${UI.text};
  margin: 0;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0.5vw;
`;

const UserImg = styled.div`
  width : 4vw;
  height: 4vw;
  border-radius: 50%;
  background: ${UI.white};
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
  color: ${UI.text};
`;

const DateText = styled.div`
  font-size: 0.7vw;
  font-weight: 500;
  color: ${UI.sub};
`;

/* Divider: 제목 밑 줄  */
const Divider = styled.hr`
  border: 0;
  border-top: 0.06vw solid #99CC31;  
  margin: 0.8vw 0 0;
`;

const FeedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;   
`;

const TopSection = styled.section`
  display: flex;
  gap: 1.2vw;
  margin: 1.2vw 0 4vw 0;
  padding: 0;                 
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const ImgContainer = styled.div`
  border:0.06vw solid #99CC31;
  // flex: 0 0 24vw;             /* 고정폭 기준은 flex-basis로 */
  width: 30vw;
  height: 30vw;
  background: ${UI.white};
  min-width: 0;  
`;

const RightTopCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  min-width: 0;              
  max-width: 100%;
  box-sizing: border-box;
`;

const PetInfoContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const FeedPageBox = styled.div`
  width: 100%;
  height: auto;
  padding: 1.2vw;
  font-size: 1vw;
  font-weight: 500;
  color: ${UI.text};
  background: ${UI.white};
  box-sizing: border-box;
  max-width: 100%
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0.06vw solid #99CC31;
  padding: 0.5vw 1vw;
  margin-bottom: 1.3vw;
  background: ${UI.white};
  border-radius: 0.6vw;
`;

const UserWrapperLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  gap: 0.5vw;
`;

const CommentBox = styled.div`
  width: 100%;
  display: flex;
  font-size: 0.9vw;
  font-weight: 500;
  padding: 0.5vw 0.5vw 0.5vw 2vw;
  border-left: 0.06vw solid #99CC31;
  color: ${UI.text};
`;

const CommentWriteContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CommentWriteBox = styled.input`
  flex: 1;
  display: flex;
  font-size: 0.9vw;
  font-weight: 500;
  padding: 0.5vw 0.5vw 0.5vw 2vw;
  border: none;
  border-left: 0.06vw solid #99CC31;
  outline: none;
  color: ${UI.text};
  &::placeholder {
    color: #9e9e9e;
    font-size: 0.75vw;
    font-weight: 600;
  }
`;

const CommentButton = styled.button`
  margin-left: 0.8vw;
  border-radius: 1.3889vw;
  border: 0.1vw solid #99CC31;
  background-color: #D9EDAF;
  color: #2E2923;
  font-size: 0.8vw;
  font-weight: 600;
  padding: 0.4vw 1vw;
  cursor: pointer;
  &:hover,&:active { opacity: .9; }
`;

const PetpostPage = () => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: '혜원', text: '재밌어요', time: '1시간 전' },]);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
 
  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    const newComment = {
      id: Date.now(), user: "익명", text: commentInput, time: "방금 전"
    };
    setComments(prev => [...prev, newComment]);
    setCommentInput('');
  };

  // 임시 petId 및 mock fetcher (BE 연동 전 확인용)
  // const petId = 1;
  // const mockPetFetcher = async (id) => ({
  //   id, name: '몽실이', species: 'Dog', gender: 'Female',
  //   age: 4, traits: ['온순함','사람 좋아함','산책 좋아함'], bio: '공원 산책러'
  // });
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const d = await getPetPost(id); // { title, authorNickname, createdAt, content, imageUrl, ... }
        setPost(d);
      } catch (e) {
        setErr('게시글을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);



  return (
    <Page>
      <Layout>
        {/* Sidebar */}
        <Sidebar>
          <CategoryTitle>게시글 카테고리 목록</CategoryTitle>
          <CategoryLink to="/post">인기글</CategoryLink>
          <CategoryLink to="/post">전체 게시판</CategoryLink>
          <CategoryLink to="#">자유 게시판</CategoryLink>
          <CategoryLink to="#">반려동물 정보 게시판</CategoryLink>
          <CategoryLink to="#">맛집 게시판</CategoryLink>
          <CategoryLink to="#">산책로 추천 게시판</CategoryLink>
        </Sidebar>

        {/* Content */}
        <Content>
          <MainContainer>
            <TitleContainer>
              <Title>{post?.title ?? '...'}</Title>
              <UserWrapper>
                <UserImg/>
                <UserContainer>
                  <UserId>{post?.authorNickname ?? '-'}</UserId>
                  <DateText>{post?.createdAt ?? ''}</DateText>
                </UserContainer>
              </UserWrapper>
            </TitleContainer>

            {/* 제목 밑 줄 */}
            <Divider />

            <FeedPageContainer>
              <TopSection>
                <ImgContainer>
                  {!!post?.imageUrl && (
                    <img src={post.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </ImgContainer>
                <RightTopCol>
                  <PetInfoContainer>
                    <PetpostInfo petId={post?.petId}/>
                  </PetInfoContainer>

                  <FeedPageBox>{post?.content ?? ''}</FeedPageBox>
                </RightTopCol>
              </TopSection>

              {comments.map((c) => (
                <CommentContainer key={c.id}>
                  <UserWrapperLeft>
                    <UserImg />
                    <UserContainer>
                      <UserId>{c.user}</UserId>
                      <DateText>{c.time}</DateText>
                    </UserContainer>
                  </UserWrapperLeft>
                  <CommentBox>{c.text}</CommentBox>
                </CommentContainer>
              ))}

              {/* 댓글 작성 */}
              <CommentContainer>
                <UserWrapperLeft>
                  <UserImg />
                  <UserContainer>
                    <UserId>나</UserId>
                    <DateText>현재</DateText>
                  </UserContainer>
                </UserWrapperLeft>
                <CommentWriteContainer>
                  <CommentWriteBox
                    placeholder="댓글을 입력하세요"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <CommentButton onClick={handleAddComment}>작성하기</CommentButton>
                </CommentWriteContainer>
              </CommentContainer>
            </FeedPageContainer>
          </MainContainer>
        </Content>
      </Layout>
    </Page>
  );
};

export default PetpostPage;
