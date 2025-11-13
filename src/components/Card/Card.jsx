import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { listPetPosts } from '../../lib/api'; 

const Container = styled.div`
  width: 100%;
`;
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;              /* 반응형 다열 */
  gap: 1vw;                     /* 카드 간격 */
  width: 72.8vw;
  justify-content: flex-start;
`;
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 22vw;
  height: 28vw;
  background-color: #F0F0EF;
  border-radius: 15px;
  margin: 1.5vw 0 0 0;
  cursor: pointer;
`;
const CardImg = styled.img`
  width: 19vw;
  height: 19vw;
  margin: 1.5vw;
  object-fit: cover;
  background: #ddd;
  border-radius: 8px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardTitle = styled.div`
  font-size: 1vw;
  font-weight: 600;
  margin: 0 1.8vw;
  color: #2E2923;
`;
const TagContainer = styled.div`
  margin: 0.5vw 1.5vw;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4vw;
`;
const TagP = styled.div`
  border: 0.1vw solid #2E2923;
  border-radius: 20px;
  padding: 0.3vw 0.5vw;
  font-size: 0.8vw;
  font-weight: 600;
  color: #2E2923;
`;

export const Card = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const warnedRef = useRef(false);

  const onClickCard = (id) => navigate(`/petpostPage/${id}`);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const rows = await listPetPosts({ page: 0, size: 6 });
        setItems(rows);
      } catch (e) {
        console.error('[listPetPosts FAIL]', e);
        if (!warnedRef.current && e?.response?.status === 401){
            warnedRef.current = true;
            alert('로그인이 필요합니다.');
            navigate('/login', {state: { from: '/petpost'}});
        }
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Container>불러오는 중…</Container>;
  if (!items.length) return <Container>게시글이 없습니다.</Container>;

  return (
    <Container>
      <CardContainer>
        {items.map((p) => (
          <CardBox key={p.id} onClick={() => onClickCard(p.id)}>
            <CardImg
              src={p.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'}
              alt={p.title || 'petpost'}
            />
            <TitleContainer>
              <CardTitle>{p.title || '제목 없음'}</CardTitle>
            </TitleContainer>
            <TagContainer>
              {(p.tags || []).slice(0, 5).map((t, i) => (
                <TagP key={i}>{t}</TagP>
              ))}
            </TagContainer>
          </CardBox>
        ))}
      </CardContainer>
    </Container>
  );
};

export default Card;
