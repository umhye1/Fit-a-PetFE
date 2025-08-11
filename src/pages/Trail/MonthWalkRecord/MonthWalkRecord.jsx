import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import TrailCard from './TrailCard/TrailCard';
import footPrint from '../../../assets/images/footprint.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;   
  padding: 3vw;
`;

/* 두 카드 폭(28vw*2) + 간격(2vw) 만큼 고정 폭을 주고, 가운데 배치 */
const MainContainer = styled.div`
  width: calc(28vw * 2 + 2vw);
  display: flex;
  gap: 2vw;
  align-items: flex-start;
  justify-content: center;      
`;

const CalendarContainer = styled.div`
  width: 28vw;
  height: auto;
  background: #ffffff;
  border-radius: 1vw;
  box-shadow: 0 0 0.5vw rgba(0,0,0,0.1);
  overflow: hidden; /* 둥근 모서리 유지 */

`;

/* react-calendar 기본 CSS 특이성 이기려고 && 사용 */
const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  border: none !important;
  font-size: 0.9vw;

  && .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.2vw;               /* ▶ TrailCard 헤더와 동일 높이 */
    padding: 0 0.6vw;
    background: #D9EDAF;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    margin-bottom: 0;
  }
  && .react-calendar__navigation button {
    background: transparent;
    border: 0;
    color: #4A4031;
    font-weight: 800;
    font-size: 0.95vw;
    padding: 0.3vw 0.6vw;
    border-radius: 0.6vw;
  }

  && .react-calendar__viewContainer {
    padding: 1.2vw;
  }

  && .react-calendar__tile {
    height: 3.8vw;
    border: none !important;
    outline: none !important;
    background: #fff;
    color: #4A4031;
    font-weight: 600;
    border-radius: 0.8vw;
    position: relative;
    transition: background .15s ease, box-shadow .15s ease;
    box-shadow: none;
    margin: 0;
  }
  && .react-calendar__tile:enabled:hover {
    background: rgba(217,237,175,0.25);
  }
  && .react-calendar__tile--now {
    background: rgba(217,237,175,0.35);
    font-weight: 800;
  }
  && .react-calendar__tile--active {
    background: #D9EDAF;
    color: #4A4031;
    font-weight: 800;
    box-shadow: none;
  }
`;

export default function MonthWalkRecord() {
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const records = [
    { date: '2025-04-01', distance: '1.2km' },
    { date: '2025-04-12', distance: '2.0km' },
    { date: '2025-05-03', distance: '0.9km' },
    { date: '2025-05-04', distance: '0.8km' },
    { date: '2025-05-29', distance: '0.45km' },
  ];

  return (
    <Container>
      <MainContainer>
        <CalendarContainer>
          <StyledCalendar
            onChange={setDate}
            value={date}
            view="year"
            maxDetail="year"
            onClickMonth={(v) => {
              const y = v.getFullYear();
              const m = String(v.getMonth() + 1).padStart(2, '0');
              setSelectedMonth(`${y}-${m}`);
              setSelectedDate(null);
            }}
            onClickDay={(v) => {
              const clicked = v.toISOString().split('T')[0];
              setSelectedDate(prev => (prev === clicked ? null : clicked));
            }}
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
        </CalendarContainer>

        {/* ▶ TrailCard도 같은 높이/헤더 포함으로 상단 정렬이 정확히 맞음 */}
        <TrailCard
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          records={records}
        />
      </MainContainer>
    </Container>
  );
}
