// MonthWalkRecord.jsx
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 30vw;
  gap: 2vw;
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 1vw;
  box-shadow: 0 0 0.5vw rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-left: 2vw;
`;

const StyledCalendar = styled(Calendar)`
  border: none !important;
  width: auto;
  height: auto;
  font-size: 0.9vw;

  .react-calendar__navigation button {
    background-color: #D9EDAF;
    color: #4A4031;
    font-weight: bold;
    border: none;
  }

  .react-calendar__tile {
    height: 3.8vw;
    border: none !important;
    background: none;
    position: relative;
  }

  .react-calendar__tile--now,
  .react-calendar__tile--active {
    background: #D9EDAF;
    color: white;
  }

  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:active,
  .react-calendar__navigation button:hover {
    background-color: #D9EDAF !important;
    color: white !important;
    outline: none;
    box-shadow: none;
  }
`;

const MonthWalkRecord = () => {
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
            onClickMonth={(value) => {
              const year = value.getFullYear();
              const month = (value.getMonth() + 1).toString().padStart(2, '0');
              const formatted = `${year}-${month}`;
              setSelectedMonth(formatted);
              setSelectedDate(null);
            }}
            onClickDay={(value) => {
              const clicked = value.toISOString().split('T')[0];
              setSelectedDate((prev) => (prev === clicked ? null : clicked));
            }}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const formatted = date.toISOString().split('T')[0];
                if (records.some((r) => r.date === formatted)) {
                  return <img src={footPrint} alt="paw" style={{ width: '1vw', position: 'absolute', bottom: 2, right: 2 }} />;
                }
              }
              return null;
            }}
          />
        </CalendarContainer>
        <TrailCard selectedMonth={selectedMonth} selectedDate={selectedDate} records={records} />
      </MainContainer>
    </Container>
  );
};

export default MonthWalkRecord;
