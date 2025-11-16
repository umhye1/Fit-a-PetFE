// TrailCard/MonthlyTrailCard.jsx
import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { UI } from '../../../../styles/uiToken';

const TrailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
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

export default function MonthlyTrailCard({
  selectedMonth,   // 지금은 안 써도 됨 (API에서 이미 월별 필터)
  selectedDate,
  records = [],
  onSelectRecord,
}) {
  // ✅ API에서 이미 해당 month만 가져오므로, 여기서는 단순 sort만
  const monthlyRecords = useMemo(() => {
    if (!records.length) return [];
    return [...records].sort((a, b) =>
      (a.walkDate || '').localeCompare(b.walkDate || '')
    );
  }, [records]);

  const [selectedTrailId, setSelectedTrailId] = useState(null);
  const [fallbackRecord, setFallbackRecord] = useState(null);

  // 날짜 선택되면 해당 날짜의 기록 활성화
  useEffect(() => {
    if (!selectedDate) return;
    const match = records.find(r => r.walkDate === selectedDate);
    if (match) {
      setSelectedTrailId(match.recordId);
      setFallbackRecord(match);
    }
  }, [selectedDate, records]);

  // 월 변경 후 첫 렌더링 시 첫 번째 기록 기본 선택
  useEffect(() => {
    if (monthlyRecords.length) {
      const first = monthlyRecords[0];
      setSelectedTrailId(first.recordId);
      setFallbackRecord(first);
      // 부모에서 날짜도 맞춰주고 싶으면:
      // onSelectRecord?.(first);
    } else {
      setSelectedTrailId(null);
      setFallbackRecord(null);
    }
  }, [monthlyRecords]);

  const handleClickRecord = (r) => {
    setSelectedTrailId(r.recordId);
    setFallbackRecord(r);
    onSelectRecord?.(r);  // MonthWalkRecord 쪽에서 selectedDate = r.walkDate로 맞추는 용도
  };

  return (
    <TrailCardContainer>
      <Container>
        <TrailContainer>
          <TitleContainer><CardTitle>월 산책 기록</CardTitle></TitleContainer>

          <CardContainer aria-label="월별 산책 기록 목록">
            {monthlyRecords.length > 0 ? (
              monthlyRecords.map((r) => {
                const active = selectedTrailId === r.recordId;
                const dateLabel =
                  r.walkDate || r.date || '-';

                const durationLabel =
                  r.formattedDuration ||
                  r.duration ||
                  r.record ||
                  '-';
                return (
                  <CardBox
                    key={r.recordId}
                    type="button"
                    $active={active}
                    onClick={() => handleClickRecord(r)}
                    aria-selected={active}
                    title="상세 보기"
                  >
                    <CardBoxP>{dateLabel}</CardBoxP>
                    <CardBoxP2>
                      | 산책 시간 : {durationLabel}
                    </CardBoxP2>
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
    </TrailCardContainer>
  );
}
