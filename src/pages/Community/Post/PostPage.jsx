import React,{useState, useEffect} from 'react'
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, createComment, updateComment, deleteComment } from "../../../lib/api";
import { getMyIdentityFromToken } from '../../../lib/api';
import footPrint from '../../../assets/images/footprint.png';

const Container = styled.div`
  width: 100%;
  display: flex;
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
  &:hover, &:active { color: #9DBD5D; }
`;

const CategroyP = styled.button`
  display: flex;
  padding: 0.8vw 0vw 0.8vw 6vw;
  font-weight: 600;
  font-size: 1vw;
  color : #2E2923;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  &:hover, &:active { color: #9DBD5D; }
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
  gap: 1vw;      
`;

const UserWrapper2 = styled.div`
  display: flex;
  align-items: center;  
  margin-right: auto;      
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
  gap: 0.6vw;
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
  line-height: 2.5vw;
  color: #2E2923;
  &::placeholder {
    color: #9e9e9e;
    font-size: 0.75vw;
    font-weight: 600;
    line-height: 2.5vw;
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
  padding: 0.4vw 1vw;
  cursor: pointer;
  &:hover,&:active { border: 0.1vw solid #99CC31; }
`;

const UserIcon = styled.img`
  width:2vw;
  margin:0.5vw;
`;

function fmtDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d);
    return dt.toLocaleString();
  } catch {
    return String(d);
  }
}

// 분 단위로 자동 갱신되는 현재시간 문자열
function useNowString() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  return now.toLocaleString();
}

function useMyDisplayName() {
  const me = getMyIdentityFromToken();
  const lsNick =
    typeof window !== 'undefined' ? window.localStorage.getItem('nickname') : null;

  if (lsNick && String(lsNick).trim()) return String(lsNick).trim();
  if (me?.nickname && String(me.nickname).trim()) return String(me.nickname).trim();
  // 토큰에 name, preferred_username 같은 게 있을 수도 있음 (혹시 대비)
  if (me?.name && String(me.name).trim()) return String(me.name).trim();
  if (me?.preferred_username && String(me.preferred_username).trim()) {
    return String(me.preferred_username).trim();
  }

  return '나';
}

const PostPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const nowString = useNowString();
  const myName = useMyDisplayName();

  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(false);

  // 댓글 상태
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // 게시글 불러오기
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await getPost(id);
        const data = res?.data ?? res;
        const normalized = {
          post_id:   data?.post_id ?? data?.postId ?? data?.id,
          title:     data?.title ?? data?.postTitle ?? '(제목 없음)',
          content:   data?.content ?? data?.postContent ?? '',
          category:  data?.postCategory ?? data?.category ?? '',
          nickname:  data?.author?.nickname ?? data?.nickname ?? '익명',
          created_at:data?.created_at ?? data?.postDate ?? data?.createdAt,
        };
        if (mounted) setRow(normalized);
      } catch (e) {
        const status = e?.response?.status;
        if (status === 401) {
          window.alert('로그인이 필요합니다.');
          navigate('/login', { state: { from: `/post/${id}` }, replace: false });
          return;
        }
        console.error('[GET POST FAIL]', e);
        if (mounted) setRow(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, navigate]);

  // 댓글 작성
  const handleAddComment = async () => {
    const text = commentInput.trim();
    if (!text) return;

    try {
      const saved = await createComment(id, text); // {commentId, comment, lastModified}
      setComments(prev => ([
        ...prev,
        {
          id:   saved.commentId,
          text: saved.comment,
          time: saved.lastModified, // 서버가 준 시간
          user: myName,             // 표시용 닉네임
        },
      ]));
      setCommentInput('');
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        window.alert('로그인이 필요합니다.');
        navigate('/login', { state: { from: `/post/${id}` } });
        return;
      }
      window.alert(e?.response?.data?.message || e.message || '댓글 등록 중 오류가 발생했습니다.');
    }
  };

  // 댓글 수정/삭제
  const startEdit = (c) => {
    setEditingId(c.id);
    setEditingText(c.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const submitEdit = async (commentId) => {
    const text = editingText.trim();
    if (!text) return;
    try {
      const saved = await updateComment(id, commentId, text);
      setComments(prev =>
        prev.map(c => c.id === commentId
          ? { ...c, text: saved.comment, time: saved.lastModified }
          : c
        )
      );
      cancelEdit();
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        window.alert('로그인이 필요합니다.');
        navigate('/login', { state: { from: `/post/${id}` } });
        return;
      }
      window.alert(e?.response?.data?.message || e.message || '댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const removeComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제할까요?')) return;
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        window.alert('로그인이 필요합니다.');
        navigate('/login', { state: { from: `/post/${id}` } });
        return;
      }
      window.alert(e?.response?.data?.message || e.message || '댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div style={{ padding: '2vw',  fontSize: '0.8vw' }}>불러오는 중…</div>;
  if (!row)    return <div style={{ padding: '2vw', fontSize: '0.8vw' }}>게시글을 찾을 수 없습니다.</div>;

  return (
    <Container>
      {/* 사이드 카테고리 – Link 대신 navigate 사용 */}
      <CategroyContainer>
        <CategroyP1>게시글 카테고리 목록</CategroyP1>
        <CategroyP onClick={() => navigate('/post?category=FREE')}>자유 게시판</CategroyP>
        <CategroyP onClick={() => navigate('/post?category=INFO')}>정보 게시판</CategroyP>
        <CategroyP onClick={() => navigate('/post?category=QUESTION')}>질문 게시판</CategroyP>
      </CategroyContainer>

      {/* 본문 */}
      <MainContainer>
        <TitleContainer>
          <Title>{row.title}</Title>
          <UserWrapper>
            <UserIcon src={footPrint}/>
            <UserContainer>
              <UserId>{row.nickname}</UserId>
              <DateText>{fmtDate(row.created_at)}</DateText>
            </UserContainer>
          </UserWrapper>
        </TitleContainer>

        <FeedPageContainer>
          <FeedPageBox>{row.content}</FeedPageBox>

          {/* 댓글 목록 */}
          {comments.map((c) => (
            <CommentContainer key={c.id}>
              <UserWrapper2>
                <UserIcon src={footPrint}/>
                <UserContainer>
                  <UserId>{c.user || '작성자'}</UserId>
                  <DateText>{fmtDate(c.time)}</DateText>
                </UserContainer>
              </UserWrapper2>

              {editingId === c.id ? (
                <div style={{ display:'flex', flex:1, alignItems:'center', gap:'0.6vw' }}>
                  <CommnetBox as="div" style={{ borderLeft:'none', paddingLeft:0, flex:1 }}>
                    <input
                      value={editingText}
                      onChange={(e)=>setEditingText(e.target.value)}
                      style={{ width:'100%', border:'0.06vw solid #99CC31', padding:'0.4vw 0.6vw', borderRadius:'0.4vw' }}
                      placeholder="댓글을 수정하세요"
                    />
                  </CommnetBox>
                  <CommentButton onClick={() => submitEdit(c.id)}>저장</CommentButton>
                  <CommentButton onClick={cancelEdit}>취소</CommentButton>
                </div>
              ) : (
                <>
                  <CommnetBox>{c.text}</CommnetBox>
                  <div style={{ display:'flex', gap:'0.4vw' }}>
                    <CommentButton onClick={() => startEdit(c)}>수정</CommentButton>
                    <CommentButton onClick={() => removeComment(c.id)}>삭제</CommentButton>
                  </div>
                </>
              )}
            </CommentContainer>
          ))}

          {/* 댓글 작성 */}
          <CommentContainer>
            <UserWrapper2>
              <UserIcon src={footPrint}/>
              <UserContainer>
                <UserId>{myName}</UserId>
                <DateText>{nowString}</DateText>
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
        </FeedPageContainer>
      </MainContainer>
    </Container>
  )
}

export default PostPage;
