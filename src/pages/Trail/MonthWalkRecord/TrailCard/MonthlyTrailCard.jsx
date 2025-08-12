import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { UI } from '../../../../styles/uiToken';
import DailyTrailCard from './DailyTrailCard';

const TrailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* align-item -> align-items */
  gap: 1.2vw;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TrailContainer = styled.div`
  background: ${UI.card};
  width: 28vw;
  height: auto;
  border-radius: ${UI.radiusLg};
  box-shadow: ${UI.shadow};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1vw;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CardTitle = styled.div`
  font-size: 1vw;
  font-weight: 800;
  margin: 1.2vw;
  color: ${UI.text};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7vw;
  padding: 0.5vw 0.8vw 1vw 0.8vw;

  /* 고정 높이 + 스크롤 */
  max-height: 14.5vw;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: ${UI.border} transparent;

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { border-radius: 8px; background: ${UI.border}; }
  &::-webkit-scrollbar-track { background: transparent; }
`;

const CardBox = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  // background: ${({ $active }) => ($active ? UI.bgAlt : UI.bg)};
  background: ${UI.bg};
  border: 0.1px solid ${({ $active }) => ($active ? UI.primary : 'transparent')};
  border-radius: 8px;
  padding: 0.8vw 1vw;
  width: 100%;
  cursor: pointer;
  outline: none;

  transition: background 0.2s ease, border-color 0.2s ease, transform 0.05s ease;
  &:hover { background: ${UI.bgAlt}; }
  &:active { transform: scale(0.995); }
`;

const CardBoxP = styled.div`
  color: ${UI.text};
  font-weight: 700;
  font-size: 0.9vw;
  padding: 0.2vw 0.3vw 0.2vw 0;
  white-space: nowrap;
`;

const CardBoxP2 = styled.div`
  color: ${UI.chipText};
  font-size: 0.9vw;
  font-weight: 700;
  padding: 0.2vw 0.3vw 0.2vw 0;
  margin-left: 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

/**
 * TrailCard
 * - records: [{ trailId, date(YYYY-MM-DD), duration, ... }, ...]
 * - selectedMonth: 'YYYY-MM'
 * - selectedDate: 'YYYY-MM-DD' (캘린더 선택값)
 * - onSelectRecord?: (record) => void
 * - fetcher?: DailyTrailCard에 주입할 상세 조회 함수(선택)
 */
export default function TrailCard({
  selectedMonth,
  selectedDate,
  records = [],
  onSelectRecord,
  fetcher,
  renderDetail = true
}) {
  const monthlyRecords = useMemo(() => {
    if (!selectedMonth) return [];
    // (선택) 같은 날짜/시간 중복이 있다면 key 충돌 방지용으로 유니크화
    const filtered = records
      .filter(r => (r.date || '').startsWith(selectedMonth))
      .sort((a, b) => (a.date > b.date ? -1 : 1));
    return filtered;
  }, [records, selectedMonth]);

  const [selectedTrailId, setSelectedTrailId] = useState(null);
  const [fallbackRecord, setFallbackRecord] = useState(null);

  useEffect(() => {
    if (!selectedDate) return;
    const match = records.find(r => r.date === selectedDate);
    if (match) {
      setSelectedTrailId(match.trailId || match.recordId);
      setFallbackRecord(match);
    }
  }, [selectedDate, records]);

  useEffect(() => {
    if (monthlyRecords.length && !selectedDate) {
      const first = monthlyRecords[0];
      setSelectedTrailId(first.trailId || first.recordId);
      setFallbackRecord(first);
    } else if (!monthlyRecords.length) {
      setSelectedTrailId(null);
      setFallbackRecord(null);
    }
  }, [monthlyRecords, selectedDate]);

  const handleClickRecord = (r) => {
    setSelectedTrailId(r.trailId || r.recordId);
    setFallbackRecord(r);
    onSelectRecord?.(r);
  };

  return (
    <TrailCardContainer>
      <Container>
        <TrailContainer>
          <TitleContainer><CardTitle>월 산책 기록</CardTitle></TitleContainer>

          <CardContainer aria-label="월별 산책 기록 목록">
            {/* ✅ 상단의 '선택한 날짜' 단일 아이템 렌더링 블록 제거 */}
            {monthlyRecords.length > 0 ? (
              monthlyRecords.map((r) => {
                const key = r.trailId || r.recordId || `${r.date}-${r.duration}`;
                const active = selectedTrailId === (r.trailId || r.recordId);
                return (
                  <CardBox
                    key={key}
                    type="button"
                    $active={active}
                    onClick={() => handleClickRecord(r)}
                    aria-selected={active}
                    title="상세 보기"
                  >
                    <CardBoxP>{r.date}</CardBoxP>
                    <CardBoxP2>| 산책 시간: {r.duration}</CardBoxP2>
                  </CardBox>
                );
              })
            ) : (
              <CardBox type="button" disabled>
                <CardBoxP>기록이 없습니다.</CardBoxP>
              </CardBox>
            )}
          </CardContainer>
        </TrailContainer>
      </Container>

      {renderDetail && (
        <DailyTrailCard
          trailId={selectedTrailId}
          fallbackRecord={fallbackRecord}
          fetcher={fetcher}  /* 없으면 아래 B안 적용으로 네트워크 생략 */
        />
      )}
    </TrailCardContainer>
  );
}