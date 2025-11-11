import styled from 'styled-components';
import { css } from 'styled-components';
import { useAuth } from '../../Login/AuthContext';
import { createPostWrite } from '../../../lib/api';
import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';  

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5vw;
  width: 100%;
`;

const MainTitleContainer = styled.div`
  padding: 1vw 1vw 1vw 5.1vw;
`;

const Title = styled.p`
  font-size: 1.2vw;
  font-weight: 600;
  color: #2E2923;
`;

const SubTitile = styled.div`
  font-size: 0.8vw;
  font-weight: 500;
  line-height: 150%; /* 0.9375vw */
  letter-spacing: -0.0187vw;
  color: #2E2923;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.5vw 5.85vw 0vw 5.1vw;
`;

const TitleInput = styled.input`
  flex-grow: 1;
  height: 2.5vw;
  box-sizing: border-box;
  padding: 0 0.75vw;  
  border: 0.08vw solid #B8DD6D;
  font-size: 0.8vw;
  font-weight: 600;
  line-height: 2.5vw;  // 높이랑 동일하게 맞춰서 중앙정렬
  color: #9e9e9e;

  &::placeholder {
    color: #9e9e9e;
    font-size: 0.75vw;
    font-weight: 600;
    line-height: 2.5vw;  // placeholder도 동일하게 중앙정렬
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  justify-content: center;
  select {
    width: 13vw;
    height: 2.5vw;
    border: 0.08vw solid #B8DD6D;
    border-left: none;
    padding: 0.5vw;
    font-weight: 600;
    font-size: 0.8vw;
    background-color: white;
    color: #2E2923;
  }
  option {
     background-color: #D9EDAF;
    }
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5vw 5.85vw 1.5vw 5.1vw;
  
`;

const ToolBox = styled.div`
  height: 3.65vw;
  background: #D9EDAF;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 1.1vw;
  padding: 0vw 0vw 0vw 3vw;
`;

const ToolbarItem = styled.p`
  margin: 0;
  padding: 0 .4vw;
  cursor: pointer;
  user-select: none;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  &:focus { outline: 0.12vw solid rgba(153,204,49,.6); border-radius: .2vw; }
`;


const Imageplus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1vw;
  margin-left: 0.75vw;
`;

const ImageP = styled.p`
  color: var(--Gray-Gray-700, #464a4d);
  font-size: 0.6vw;
  font-weight: 500;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BoldText = styled(ToolbarItem)`
  font-size: 0.9vw;
  font-weight: 700;
`;

const ItalicText = styled(ToolbarItem)`
  font-style: italic;
  font-size: 1vw;
`;

const UnderlineText = styled(ToolbarItem)`
  text-decoration: underline;
  font-size: 1vw;
`;

const MidlineText = styled(ToolbarItem)`
  text-decoration: line-through;
  font-size: 1vw;
`;


const BlankBox = styled.div`
  height: auto;
  fill: var(--black-white-white-1000, #fff);
  stroke-width: 0.1vw;
  stroke: var(--Gray-Gray-50, #fafafa);
   border: 0.08vw solid #B8DD6D;
`;

const InputContent = styled.div`
  width: 100%;
  height: 78%;
  flex-shrink: 0;
  min-height: 20vw;
  flex-grow: 1;
  color: var(--Gray-Gray-500, #9e9e9e);
  font-size: 0.75vw; 
  font-weight: 500; 
  line-height: 1.2vw;
  padding: 1.5vw; /* 내부 패딩 추가 */
  border: 0.1vw solid #fafafa;
  outline: none; /* 포커스 시 아웃라인 제거 */

  ${({ isBold }) =>
    isBold &&
    css`
      font-weight: bold;
    `}
  ${({ isItalic }) =>
    isItalic &&
    css`
      font-style: italic;
    `}
  ${({ isUnderline }) =>
    isUnderline &&
    css`
      text-decoration: underline;
    `}
  ${({ isStrikethrough }) =>
    isStrikethrough &&
    css`
      text-decoration: line-through;
    `}
  &[contenteditable="true"]:empty:before {
    content: attr(data-placeholder);
    color: #9e9e9e;
    }
`;

const EnrollContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`;

const EnrollButton = styled.button`
    display: flex;
    justify-content: center;
    
    width: 16vw;
    height: 2.6042vw;
    border-radius: 1vw;
    background-color: #B8DD6D;
    color: #2E2923;
    font-size: 0.9vw;
    font-weight: 600;
    border: none;
    cursor: pointer;
    box-shadow: none;
    line-height: 2.5vw
`;

const PostWrite = () => {

    const navigate = useNavigate();            
  const { isLoggedIn } = useAuth();          

  // === 상태 ===
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState(''); 
  const contentRef = useRef(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);


  // === 스타일 ===
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  
  // === 스타일 적용 ===
  const applyCmd = (cmd) => {
    contentRef.current?.focus(); // contentEditable에 포커스 유지
    document.execCommand(cmd, false, null); // 적용 후 상태 갱신 (아래 selectionchange에서도 갱신됨)
    syncActiveStates();
  };

  const syncActiveStates = () => { // 현재 선택한 것 기준으로 상태 동기화 시킴
  try {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
    setIsStrikethrough(document.queryCommandState('strikeThrough'));
  } catch (_) {}
};

  useEffect(() => { // selection 변경 시 상태 갱신
    const handler = () => {
      const sel = document.getSelection();
      if (!sel || !contentRef.current) return;
      const anchorNode = sel.anchorNode;
      if (!anchorNode) return;
      if (contentRef.current.contains(anchorNode)) {
        syncActiveStates();
      }
    };
    document.addEventListener('selectionchange', handler);
    return () => document.removeEventListener('selectionchange', handler);
  }, []);

  // 텍스트 가져오기 
  const getContentText = () => (contentRef.current?.innerText || '').trim();



  
  // === 게시판 카테고리 ====
  const CATEGORIES = [
    {value: 'FREE', label: '자유 게시판'},
    {value: 'INFO', label: '정보 게시판'},
    {value: 'QUESTION', label: '질문 게시판'},
  ];
  
  // === 서버 스펙에 맞는 payload 만들기 ===
  const buildPayload = () => {
    const now = new Date();
    const iso = now.toISOString(); // 현재 시간
    return {
      postTitle,
      postContent: getContentText(),
      postCategory,
      postDate: iso,
      images: [],        // 지금은 이미지 없음
    };
  };

  // === [NEW] 유효성 ===
  const validate = () => {
    if (!postTitle.trim()) return '제목을 입력하세요.';
    if (!getContentText()) return '내용을 입력하세요.';
    if (!postCategory) return '게시판을 선택하세요.';
    return null;
  };

  // === [REPLACE START] 등록 버튼 핸들러(Link → form submit) ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    if (!isLoggedIn) { 
      window.alert('로그인이 필요합니다.');
      navigate('/login', { state: { from: '/postWrite' }, replace: false });
      return;
    }

    const v = validate();
    if (v) {
      window.alert(v);
      return;
    }

    const payload = buildPayload();

    setLoading(true);
    try {
      const payload = buildPayload();
      console.log('[POST payload]', payload );
      
      const resp = await createPostWrite(payload);
      console.log('[POST resp]',resp);

      navigate('/post', { replace: true }); // 작성 후 이동
    } catch (err) {
      console.error('[POST CREATE FAIL]', err?.response?.status, err?.response?.data || err?.message);
      setMsg(err?.response?.data?.message || err?.message || '등록 중 오류가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
  
      
      
    <Container>
        <MainContainer>
            <MainTitleContainer>
                <Title>글 작성하기</Title>
                <SubTitile>
                    타인을 비방하거나 비난하는 행위 등 이용약관에 어긋나는 글을 작성할
                    경우 삭제될 수 있습니다. 자세한 내용은 이용약관을 참고해주세요
                </SubTitile>
            </MainTitleContainer>


        <form onSubmit={handleSubmit}>
        <TitleContainer>
          <TitleInput
            placeholder="제목을 입력하세요."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <SortContainer>
            <select
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
            >
              <option value="">게시판 선택</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </SortContainer>
        </TitleContainer>

        <BoxContainer>
            <ToolBox>
                {/* <Imageplus>
                <img
                    alt="사진 추가"
                    style={{ width: '1.2vw', height: '1.2vw' }}
                />
                <ImageP>사진추가</ImageP>
                </Imageplus> */}
                <input type="file"
                //   ref={fileInputRef}
                //   onChange={handleImageChange}
                style={{ display: 'none' }}
                accept="image/*"
                />
                <BoldText
                  role="button"
                  tabIndex={0}
                  active={isBold}
                  onMouseDown={(e) => { e.preventDefault(); applyCmd('bold'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyCmd('bold'); }}}
                  title="굵게"
                >
                  B
                </BoldText>
                <ItalicText
                  role="button"
                  tabIndex={0}
                  active={isItalic}
                  onMouseDown={(e) => { e.preventDefault(); applyCmd('italic'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyCmd('italic'); }}}
                  title="기울임"
                >
                  I
                </ItalicText>

                <UnderlineText
                  role="button"
                  tabIndex={0}
                  active={isUnderline}
                  onMouseDown={(e) => { e.preventDefault(); applyCmd('underline'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyCmd('underline'); }}}
                  title="밑줄"
                >
                  U
                </UnderlineText>
                <MidlineText
                  role="button"
                  tabIndex={0}
                  active={isStrikethrough}
                  onMouseDown={(e) => { e.preventDefault(); applyCmd('strikeThrough'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyCmd('strikeThrough'); }}}
                  title="취소선"
                >
                  T
                </MidlineText>
            </ToolBox>
            <BlankBox>
                <InputContent
                  ref={contentRef}
                  contentEditable
                  data-placeholder="내용을 입력하세요."
                  onKeyUp={syncActiveStates}
                  onMouseUp={syncActiveStates}

                />
            </BlankBox>
        </BoxContainer>
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
        />

        <EnrollContainer>
          <EnrollButton type="submit" disabled={loading}>
            {loading ? '등록 중…' : '글 등록하기'}
          </EnrollButton>
        </EnrollContainer>
      </form>
      </MainContainer>
    </Container>
  );
};

export default PostWrite;
