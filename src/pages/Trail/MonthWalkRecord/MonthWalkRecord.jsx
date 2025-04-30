import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import TrailCard from './TrailCard/TrailCard';

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
    background-color: #3D8D7A;
    color: white;
    font-weight: bold;
    border: none;
  }

  .react-calendar__tile {
    height: 3.8vw;
    border: none !important;
    background: none;
  }

  .react-calendar__tile--now {
    background: #3D8D7A;
    color: white;
  }

  .react-calendar__tile--active {
    background: #A3D1C6;
    color: white;
  }

  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:active,
  .react-calendar__navigation button:hover {
    background-color: #3D8D7A !important;
    color: white !important;
    outline: none;
    box-shadow: none;
  }
`;

const MonthWalkRecord = () => {
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('');

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
            }}
          />
        </CalendarContainer>
        <TrailCard selectedMonth={selectedMonth} />
      </MainContainer>
    </Container>
  );
};

export default MonthWalkRecord;
