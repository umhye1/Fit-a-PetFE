import React, { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { UI } from '../../../styles/uiToken';
import MonthlyTrailCard from './TrailCard/MonthlyTrailCard';
import DailyTrailCard from './TrailCard/DailyTrailCard';
import footPrint from '../../../assets/images/footprint.png';

/* 페이지 컨테이너 & 래퍼 */
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw;
`;
const Wrapper = styled.div`
  width: calc(28vw * 2 + 2vw);
`;

/* 상단 2열 + 하단 1열 그리드 */
const Grid = styled.div`
  display: grid;
  grid-template-areas:
    "calendar list"
    "detail   detail";
  grid-template-columns: 28vw 28vw;
  grid-auto-rows: auto;
  gap: 2vw;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-areas:
      "calendar"
      "list"
      "detail";
    grid-template-columns: 1fr;
    gap: 4vw;
    width: 100%;
  }
`;

const CalendarArea = styled.div`
  grid-area: calendar;
  width: 28vw;
  background: ${UI.white};
  border-radius: ${UI.radiusLg};
  box-shadow: ${UI.shadow};
  overflow: hidden;
`;

const ListArea = styled.div`
  grid-area: list;
  width: 28vw;
`;

const DetailArea = styled.div`
  grid-area: detail;
  width: 100%;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  border: none !important;
  font-size: 0.9vw;

  && .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4vw;
    padding: 1vw 0.6vw;
    background: ${UI.lightgreenButton}; /* uiToken에 '#D9EDAF'로 수정되어 있어야 작동 */
    border-bottom: 1px solid rgba(0,0,0,0.06);
    margin-bottom: 0;
  }
  && .react-calendar__navigation button {
    background: transparent;
    border: 0;
    color: ${UI.text};
    font-weight: 800;
    font-size: 0.95vw;
    padding: 0.3vw 0.6vw;
    border-radius: 0.6vw;
    cursor: pointer;
  }

  && .react-calendar__viewContainer { padding: 1.2vw; }

  && .react-calendar__tile {
    height: 3.8vw;
    border: none !important;
    outline: none !important;
    background: ${UI.white};
    color: ${UI.text};
    font-weight: 600;
    border-radius: 0.8vw;
    position: relative;
    transition: background .15s ease, box-shadow .15s ease;
    margin: 0;
  }
  && .react-calendar__tile:enabled:hover { background: rgba(217,237,175,0.25); }
  && .react-calendar__tile--now { background: rgba(217,237,175,0.35); font-weight: 800; }
  && .react-calendar__tile--active { background: ${UI.card}; color: ${UI.text}; font-weight: 800; }
`;

export default function MonthWalkRecord() {
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTrailId, setSelectedTrailId] = useState(null);
  const [fallbackRecord, setFallbackRecord] = useState(null);

  // 데모 데이터 (trailId 필수)
  const records = [
    { trailId: 101, date: '2025-04-01', duration: '00:11:00' },
    { trailId: 102, date: '2025-04-12', duration: '00:12:00' },
    { trailId: 201, date: '2025-05-03', duration: '00:13:00' },
    { trailId: 202, date: '2025-05-01', duration: '00:18:00' },
    { trailId: 203, date: '2025-05-04', duration: '01:11:00' },
    { trailId: 204, date: '2025-05-29', duration: '00:39:00' },
  ];

  /* ✅ 목 fetcher: BE 없이 상세 응답 모킹 */
  const mockFetcher = useCallback(async (id) => {
    // 네트워크 지연 흉내 (선택)
    await new Promise(res => setTimeout(res, 300));
    const base = records.find(r => r.trailId === id);
    return {
      recordId: id,
      walkDate: base?.date ?? '2025-05-01',
      walkStart: '11:11',
      walkEnd: '12:01',
      record: base?.duration ?? '00:50:00',
      distance: 3.4,
      address: '서울시 마포구 어딘가 123',
      memo: '테스트 메모(목 데이터)',
      rating: 5,
    };
  }, [records]);

  /* 캘린더 월/일 클릭 */
  const handleClickMonth = useCallback((v) => {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${y}-${m}`);
    setSelectedDate(null);
    setSelectedTrailId(null);
    setFallbackRecord(null);
  }, []);

  const handleClickDay = useCallback((v) => {
    // 로컬기준 YYYY-MM-DD (toISOString은 UTC라 날짜 밀릴 수 있음)
    const clicked = [
      v.getFullYear(),
      String(v.getMonth() + 1).padStart(2, '0'),
      String(v.getDate()).padStart(2, '0'),
    ].join('-');

    setSelectedDate(prev => (prev === clicked ? null : clicked));
    const match = records.find(r => r.date === clicked);
    if (match) {
      setSelectedTrailId(match.trailId);
      setFallbackRecord(match);
    } else {
      setSelectedTrailId(null);
      setFallbackRecord(null);
    }
  }, [records]);

  /* 월별 카드에서 클릭 시 */
  const handleSelectRecord = useCallback((r) => {
    setSelectedTrailId(r.trailId || r.recordId);
    setFallbackRecord(r);
    setSelectedDate(r.date); // 캘린더 동기화 원치 않으면 제거
  }, []);

  return (
    <PageContainer>
      <Wrapper>
        <Grid>
          <CalendarArea>
            <StyledCalendar
              onChange={setDate}
              value={date}
              view="year"
              maxDetail="year"
              onClickMonth={handleClickMonth}
              onClickDay={handleClickDay}
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const d = date.toISOString().split('T')[0];
                  if (records.some(r => r.date === d)) {
                    return (
                      <img
                        src={footPrint}
                        alt="paw"
                        style={{ width: '1vw', position: 'absolute', bottom: 6, right: 6 }}
                      />
                    );
                  }
                }
                return null;
              }}
            />
          </CalendarArea>

          <ListArea>
            <MonthlyTrailCard
              selectedMonth={selectedMonth}
              selectedDate={selectedDate}
              records={records}
              onSelectRecord={handleSelectRecord}
              renderDetail={false}   // 상세는 아래에서 렌더
            />
          </ListArea>

          <DetailArea>
            {/* ✅ 목 fetcher 연결 */}
            <DailyTrailCard
              trailId={selectedTrailId}
              fallbackRecord={fallbackRecord}
              fetcher={mockFetcher}
            />
          </DetailArea>
        </Grid>
      </Wrapper>
    </PageContainer>
  );
}
