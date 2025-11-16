import React, { useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { UI } from '../../../styles/uiToken';
import MonthlyTrailCard from './TrailCard/MonthlyTrailCard';
import DailyTrailCard from './TrailCard/DailyTrailCard';
import footPrint from '../../../assets/images/footprint.png';
import { getWalkRecordsMonthly, getWalkRecordDetail } from '../../../lib/api';

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

const Grid = styled.div`
  display: grid;
  /* 1행: 캘린더 / 리스트, 2행: 상세(2칸 전체) */
  grid-template-areas:
    "calendar list"
    "detail   detail";
  grid-template-columns: 28vw 28vw;
  grid-auto-rows: auto;
  column-gap: 2vw;
  row-gap: 2vw;
  width: 100%;
  box-sizing: border-box;

  /* ✅ 진짜 모바일 사이즈에서만 세로로 바꾸고 싶으면 600px 정도로 */
  @media (max-width: 600px) {
    grid-template-areas:
      "calendar"
      "list"
      "detail";
    grid-template-columns: 1fr;
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

  const [records, setRecords] = useState([]);          
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [recordsError, setRecordsError] = useState(null);

  const [selectedTrailId, setSelectedTrailId] = useState(null);
  const [fallbackRecord, setFallbackRecord] = useState(null);

  useEffect(() => {
    if (!selectedMonth) return;

    const [year, month] = selectedMonth.split('-');
    if (!year || !month) return;

    (async () => {
      try {
        setRecordsLoading(true);
        setRecordsError(null);

        const list = await getWalkRecordsMonthly({ year, month });
        setRecords(list);

        // 월에 기록이 있으면 첫 번째 기록을 기본 선택
        if (list.length > 0) {
          setSelectedTrailId(list[0].recordId);
          setFallbackRecord(list[0]);
        } else {
          setSelectedTrailId(null);
          setFallbackRecord(null);
        }

      } catch (e) {
        console.error('[GET MONTHLY WALK RECORDS FAIL]', e);
        setRecords([]);
        setRecordsError(e?.response?.data?.message || e.message || '기록 조회 중 오류');
      } finally {
        setRecordsLoading(false);
      }
    })();
  }, [selectedMonth]);



  const handleClickMonth = useCallback((v) => {
    const y = v.getFullYear();
    const m = String(v.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${y}-${m}`);
    setSelectedDate(null);
    setSelectedTrailId(null);
    setFallbackRecord(null);
  }, []);

  const handleClickDay = useCallback((v) => {
    const clicked = [
      v.getFullYear(),
      String(v.getMonth() + 1).padStart(2, '0'),
      String(v.getDate()).padStart(2, '0'),
    ].join('-');

    setSelectedDate(prev => (prev === clicked ? null : clicked));

    const match = records.find(r => r.walkDate === clicked);
    if (match) {
      setSelectedTrailId(match.recordId);
      setFallbackRecord(match);
    } else {
      setSelectedTrailId(null);
      setFallbackRecord(null);
    }
  }, [records]);

  const handleDeletedRecord = useCallback((deletedId) => {
    setRecords((prev) => {
      const next = prev.filter((r) => r.recordId !== deletedId);

      if (next.length === 0) {
        // 더 이상 기록이 없으면 선택 전부 초기화
        setSelectedTrailId(null);
        setFallbackRecord(null);
        setSelectedDate(null);
      } else {
        // 남아 있는 기록 중 첫 번째를 기본 선택
        const first = next[0];
        setSelectedTrailId(first.recordId);
        setFallbackRecord(first);
        setSelectedDate(first.walkDate || first.date || null);
      }

      return next;
    });
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
                  const d = [
                    date.getFullYear(),
                    String(date.getMonth() + 1).padStart(2, '0'),
                    String(date.getDate()).padStart(2, '0'),
                  ].join('-');

                  if (records.some(r => r.walkDate === d)) {
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
            {recordsLoading && (
              <div style={{ fontSize: '0.8vw', marginBottom: '0.5vw' }}>
                기록 불러오는 중...
              </div>
            )}
            {recordsError && (
              <div style={{ fontSize: '0.8vw', color: 'red', marginBottom: '0.5vw' }}>
                {recordsError}
              </div>
            )}
            <MonthlyTrailCard
              selectedMonth={selectedMonth}
              selectedDate={selectedDate}
              records={records}
              onSelectRecord={(r) => {
                setSelectedTrailId(r.recordId);
                setFallbackRecord(r);
                setSelectedDate(r.walkDate);
              }}
            />
          </ListArea>

          <DetailArea>
            <DailyTrailCard
              trailId={selectedTrailId}
              fallbackRecord={fallbackRecord}
              fetcher={getWalkRecordDetail}
              onDeleted={handleDeletedRecord}
            />
          </DetailArea>
        </Grid>
      </Wrapper>
    </PageContainer>
  );
}
