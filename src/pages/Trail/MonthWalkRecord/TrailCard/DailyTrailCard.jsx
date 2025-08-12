import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { UI } from '../../../../styles/uiToken';

const Panel = styled.div`
  width: 100%;                 
  background: ${UI.white};
  border: 1px solid ${UI.lightgreenButton};
  border-radius: ${UI.radiusLg};
  box-shadow: ${UI.shadow};
  padding: 1.2vw 1.4vw;       
  box-sizing: border-box;
`;


const Row = styled.div`
  display: flex;
  color: ${UI.chipText}; 
  font-size: 0.9vw;
  font-weight: 700;             
  margin-bottom: 0.6vw;

  & > span:first-child {
    width: 10vw;               
    font-weight: 700;
    color: ${UI.text};
    font-size: 1vw;
    margin-left: 1vw;
  }

  @media (max-width: 1200px) {
    font-size: 1.6vw;
    & > span:first-child { width: 24vw; }
  }
`;

const Placeholder = styled.div`
  font-size: 0.85vw;
  color: ${UI.textSubtle};
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1vw;
`;


const Title = styled.div`
  font-size: 1.1vw;            /* 0.95vw -> 1.1vw */
  font-weight: 800;
  color: ${UI.text};

  @media (max-width: 1200px) {
    font-size: 1.8vw;
  }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40vw;
    gap: 0.5vw;
`;

const EditButton = styled.button`
    border: 1px solid ${UI.lightgreenButton};
    border-radius: ${UI.radiusLg};
    background: ${UI.lightgreenButton};
    color: ${UI.text};
    font-size: 0.95vw;            /* 0.95vw -> 1.1vw */
    font-weight: 600;
`
const DeleteButton = styled.button`
    border: 1px solid ${UI.lightgreenButton};
    border-radius: ${UI.radiusLg};
    background: ${UI.lightgreenButton};
    color: ${UI.text};
    font-size: 0.95vw;            /* 0.95vw -> 1.1vw */
    font-weight: 600;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;    
    margin: 1vw;
`;

/**
 * DailyTrailCard
 * @param {object}   props
 * @param {string|number|null} props.trailId 선택된 기록 ID(없으면 안내 문구)
 * @param {object|null}         props.fallbackRecord 목록에서 넘기는 임시 데이터(상세 응답 오기 전 표시)
 * @param {function}            [props.fetcher] 상세조회 함수 주입 (테스트/추상화용)
 *        (trailId: string|number, token?: string) => Promise<any>
 *        미전달 시 기본 fetch(`/api/trails/${trailId}`)
 */
export default function DailyTrailCard({ trailId, fallbackRecord, fetcher }) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  const defaultFetcher = useCallback(async (id) => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`/api/trails/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      method: 'GET'
    });
    if (!res.ok) throw new Error(`상세 요청 실패: ${res.status}`);
    const data = await res.json();
    return data?.data ?? data; // 프로젝트 응답 포맷에 맞게 조정
  }, []);

  const run = useCallback(async () => {
    if (!trailId) {
      setDetail(null);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await (fetcher || defaultFetcher)(trailId);
      setDetail(data);
    } catch (e) {
      setError(e.message);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [trailId, fetcher, defaultFetcher]);

  useEffect(() => {
    run();
  }, [run]);

  const showing = detail ?? fallbackRecord ?? null;

  return (
    <Panel>
      <TitleContainer>
        <Title>선택한 날짜 상세</Title>
        <ButtonContainer>
            <EditButton>수정</EditButton>
            <DeleteButton>삭제</DeleteButton>
        </ButtonContainer>
      </TitleContainer>

      <DetailContainer>
      {!trailId && !showing && (
        <Placeholder>날짜 또는 기록을 선택하면 상세 정보가 표시됩니다.</Placeholder>
      )}
      {loading && <Placeholder>불러오는 중...</Placeholder>}
      {error && <Placeholder>오류: {error}</Placeholder>}

      {showing && !loading && !error && (
        <>
          <Row><span>날짜</span><div>{showing.walkDate || showing.date || '-'}</div></Row>
          <Row><span>시작</span><div>{showing.walkStart || '-'}</div></Row>
          <Row><span>종료</span><div>{showing.walkEnd || '-'}</div></Row>
          <Row><span>소요시간</span><div>{showing.record || showing.duration || '-'}</div></Row>
          <Row><span>거리(km)</span><div>{showing.distance ?? '-'}</div></Row>
          <Row><span>주소</span><div>{showing.address || '-'}</div></Row>
          <Row><span>메모</span><div>{showing.memo || '-'}</div></Row>
          <Row><span>평점</span><div>{showing.rating ?? '-'}</div></Row>
        </>
      )}
      </DetailContainer>
    </Panel>
  );
}
