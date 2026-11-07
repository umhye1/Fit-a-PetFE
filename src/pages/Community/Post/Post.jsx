import React,{useEffect, useState, useRef} from 'react'
import styled from 'styled-components';
import { Link , useNavigate , useLocation} from 'react-router-dom';
import RecommendWalkMate from '../RecommendWalkMate/RecommendWalkMate';
import { useAuth } from '../../../pages/Login/AuthContext';
import { listPostPage } from '../../../lib/api';


const CommunityContainer = styled.div`
  display: flex;
  width: 100%;
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


const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5vw;
    width: 100%;
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

const FeedBoxTitle = styled.div`
    font-size: 1.2vw;
    font-weight: 600;
    margin : 2.2vw 0vw 1vw 3vw;
    color : #2E2923;
`;

const FeedBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.7vw;
    margin: 1vw 6.25vw 0.3vw 3vw;
    border: 0.1vw solid #99CC31; 
    
`;
const FeedTitle = styled.div`
    font-size: 1vw;
    font-weight: 500;
    margin: 0vw 0vw 0.5vw 0vw; 
    color : #2E2923;
`;

const FeedP = styled.div`
    font-size: 0.88vw;
    font-weight: 400;
    margin: 0.5vw 0vw 0.5vw 0vw; 
    color : #2E2923;
`;


const Post = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const alertedRef = useRef(false);

    const { isLoggedIn } = useAuth()
    const [category, setCategory] = useState('FREE');
    const [rows, setRows] = useState([]); // 서버에서 받아온 목록
    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState(null);
    const categoryRef = useRef(category);
    categoryRef.current = category;

    useEffect(() => {
        let mounted = true;
        const fetchList = async () => {
            setLoading(true);
            setNext(null);
            try {
                const data = await listPostPage({ category, size: 20 });
                if (mounted) {
                    setRows(data.items);
                    setNext(data.hasNext ? { cursorDate: data.nextDate, cursorId: data.nextId } : null);
                }
            } catch (e) {
                const status = e?.response?.status;
                if (status === 401) {
                    if (!alertedRef.current) {
                        alertedRef.current = true;
                        window.alert('로그인이 필요합니다.');
                        navigate('/login', { state: { from: location.pathname + location.search }, replace: false });
                    }
                    return;
                }

                console.error('[LIST FAIL]', e);
                if (mounted) setRows([]);
            } finally {
                if (mounted) setLoading(false);
            }
            };
            fetchList();
            return () => { mounted = false; };
            const handleClick = () => {
                navigate('/postPage');  
            };
        }, [category, navigate, location]);

    const loadMore = async () => {
        if (!next || loading) return;
        const selected = category;
        setLoading(true);
        try {
            const data = await listPostPage({ category: selected, ...next, size: 20 });
            if (categoryRef.current !== selected) return;
            setRows((old) => [...old, ...data.items.filter((item) => !old.some((p) => p.post_id === item.post_id))]);
            setNext(data.hasNext ? { cursorDate: data.nextDate, cursorId: data.nextId } : null);
        } catch (error) {
            window.alert('게시글을 불러오지 못했습니다. 다시 시도해 주세요.');
        } finally {
            if (categoryRef.current === selected) setLoading(false);
        }
    };

    const handleWriteClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            window.alert('로그인이 필요합니다.');
            navigate('/login', { state: { from: '/postWrite' } });
        }
    };

    const openDetail = (id) => navigate(`/post/${id}`);
    const clickCategory = (cat) => setCategory(cat);
    
    const CATEGORY_LABEL = {
    FREE: '자유 게시판',
    INFO: '정보 게시판',
    QUESTION: '질문 게시판',
    };

    return (
    <CommunityContainer>
        <RecommendWalkMate/>
        {/* <LocationContainer>위치</LocationContainer> */}
        <MainContainer>
            <CategroyContainer>
                <CategroyP1>게시글 카테고리 목록</CategroyP1>
                <CategroyP onClick={() => clickCategory('FREE')}>자유 게시판</CategroyP>
                <CategroyP onClick={() => clickCategory('INFO')}>정보 게시판</CategroyP>
                <CategroyP onClick={() => clickCategory('QUESTION')}>질문 게시판</CategroyP>
            
            </CategroyContainer>
            <FeedContainer>
                <FeedBoxContainer>
                    <FeedBoxTitle>{CATEGORY_LABEL[category]}</FeedBoxTitle>
                     <FeedWrite to="/postWrite" onClick={handleWriteClick}>새 글쓰기</FeedWrite>
                </FeedBoxContainer>
                {loading && <div style={{ margin: '0 3vw', padding: '1vw 0vw 0vw 0vw',fontSize: '0.8vw' }}>불러오는 중…</div>}

                {!loading && rows.map((post) => (
                    <FeedBox key={post.post_id} onClick={() => openDetail(post.post_id)}>
                    <FeedTitle>{post.title}</FeedTitle>
                    <FeedP>
                        {post.content?.slice(0, 120) || ''} {post.content?.length > 120 ? '…' : ''}
                    </FeedP>
                    </FeedBox>
                ))}
                {next && <button type="button" disabled={loading} onClick={loadMore}>더 보기</button>}
            </FeedContainer>
        </MainContainer>
    </CommunityContainer>
  )
}

export default Post

