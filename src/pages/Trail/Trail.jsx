import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3vw;
`;

const CalendarContainer = styled.div`
  padding: 1.5vw;
`;

const StyledCalendar = styled(Calendar)`
    border: 0.05vw solid #3D8D7A; 
    background-color: white;
    width: 30vw;
    height: 30vw;

    .react-calendar__tile {
        font-size: 0.8vw;
        padding: 0.2vw;
        height: 4.45vw;
        display: flex;
        flex-direction: column; 
        align-items: center;    
        justify-content: flex-start;
    }

    .react-calendar__navigation button {
        background-color: #3D8D7A !important;
        color: white !important;
        font-weight: bold !important;
        border: none;
        &:hover,
        &:active,
        &:focus {
        background-color: #A3D1C6 !important;
        outline: none;
        }
    }
    .react-calendar__tile--now {
        background: #3D8D7A; 
        color: white;       
        font-weight: bold;
    }

    .react-calendar__month-view__days__day--weekend {
        color: black;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none;
        cursor: default;
    }

    .react-calendar__month-view__weekdays__weekday,
    .react-calendar__month-view__weekdays__weekday--weekend {
        padding: 0.8vw 0;
        height: 3.5vw;
    }

    .react-calendar__tile--active {
        background: #A3D1C6;
        color: white;
    }

    .react-calendar__tile:enabled:hover {
        background: #a6ccc4;
    }
`;

const TrailContainer = styled.div`
    background: #A3D1C6;
    width: 28vw;
    height: 28vw;
    display: flex;
    flex-direction: column;
    padding-top: 0.1vw;
    align-items: center;
    justify-content: center;
    padding:1vw;
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FBFFE4;
    width: 28vw;
    height:26vw;
`;

const ClockContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 20vw;
    align-items: center;
`;
const ClockButton = styled.button`
    border: 0.08vw solid #3D8D7A; 
    background-color: #3D8D7A;
    border-radius: 1.3889vw;
    padding : 0.3vw 0.9vw;
    margin : 0.6vw;
    color: white;
`;

const Trail = () => {
    const [date, setDate] = useState(new Date());

    // 이벤트 데이터 예시
    const [events] = useState([
        { date: new Date(2024, 2, 15), title: '산책 기념일 🐾' },
        { date: new Date(2024, 2, 18), title: '친구 만남 💬' },
    ]);


    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval;
        if (isRunning) {
        const startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 10); // 10ms 간격으로 업데이트하여 정밀도 향상
        } else {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    const handleLap = () => {
        if (isRunning) {
          setLaps([...laps, elapsedTime]);
        }
    };

    const formatTime = (time) => {
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor((time / 600000) % 60)}`.slice(-2);
        return `${hours}:${minutes}:${seconds}`;
    };


  return (
    <Container>
      <CalendarContainer>
        <StyledCalendar
          onChange={setDate}
          value={date}
          tileContent={({ date, view }) => {
            const event = events.find(
              (e) =>
                date.getFullYear() === e.date.getFullYear() &&
                date.getMonth() === e.date.getMonth() &&
                date.getDate() === e.date.getDate()
            );
            return view === 'month' && event ? (
              <div style={{ fontSize: '0.6vw', color: '#3D8D7A', marginTop: '0.3vw' }}>
                📌 {event.title}
              </div>
            ) : null;
          }}
        />
        </CalendarContainer>
        <TrailContainer>
        <p style={{ fontSize: '1.2vw', color: '#3D8D7A', fontWeight: '700' }}> {date.toLocaleDateString()}</p>
            <BoxContainer>
                <h1 style={{color: '#3D8D7A'}}>{formatTime(elapsedTime)}</h1>
                <ClockContainer>
                    <ClockButton onClick={handleStartStop}>{isRunning ? '중지' : '시작'}</ClockButton>
                    <ClockButton onClick={handleReset}>리셋</ClockButton>
                    <ClockButton onClick={handleLap} disabled={!isRunning}>랩</ClockButton>
                </ClockContainer>
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>{formatTime(lap)}</li>
                    ))}
                </ul>
            </BoxContainer>
        </TrailContainer>
    </Container>
  );
};

export default Trail;
