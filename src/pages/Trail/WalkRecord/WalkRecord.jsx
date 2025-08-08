import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import WalkReplayMap from '../WalkReplayMap';
import StopwatchBox from './StopWatchBox';

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
  height: auto;
  gap: 2vw;
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 30vw;
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
    background-color: #FFEDF0;
    color: #4A4031;
    font-weight: bold;
    border: none;
  }

  .react-calendar__tile {
    height: 3.8vw;
    border: none !important;
    background: none;
  }

  .react-calendar__tile--now {
    background: #FFEDF0;
    color: white;
  }

  .react-calendar__tile--active {
    background: #FFEDF0;
    color: white;
  }

  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:active,
  .react-calendar__navigation button:hover {
    background-color: #FFEDF0  !important; /* 기본 색상 고정 */
    // color: white !important;
    outline: none;
    box-shadow: none;
  }
`;

const TrailContainer = styled.div`
  background: white;
  width: 27vw;
  height: 30vw;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  box-shadow: 0 0 0.5vw rgba(0, 0, 0, 0.1);
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #D9EDAF;
  width: auto;
  height: 30vw;
  border-radius: 1vw;
`;

const DateP = styled.div`
  font-size: 1.2vw;
  background: D9EDAF;
  font-weight: 700;
  padding: 0.8vw 0vw;
  width: 100%;
  color: #4A4031;
  text-align: center;
  border-radius: 1vw 1vw 0 0;
`;


const ClockContainer = styled.div`
   background: white;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

const ClockP = styled.div`
    padding: 1vw;
    margin: 0.5vw 0vw; 
    background: white;
    font-size: 2.7vw;
    font-weight: 800;
    color: #4A4031;
`;

const ClockButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 27vw;
  align-items: center;
  margin-bottom: 1vw;
`;

const ClockButton = styled.button`
  border: 0.08vw solid #72634C ;
  background-color: #72634C;
  border-radius: 1.3889vw;
  padding: 0.3vw 0.9vw;
  margin: 0.6vw;
  color: white;
`;

const TrailRecordContainer = styled.div`
  margin-top: 1vw;
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TrailRecordP = styled.div`
  margin: 1vw;
  font-size: 0.6vw;
  color: white;
  font-size: 1vw;
  font-weight: 700;
`;

 const Column = styled.div`
   width: 28vw;      /* 지도 카드와 비슷한 폭 (원하는 값으로 맞추세요) */
   height: 100%;     /* MainContainer의 32vw를 그대로 채움 */
   display: flex;
   align-items: stretch;
 `;

const WalkRecord = ({ path }) => {
  const [monthRecord, setMonthRecord] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };
  const handleLap = () => {
    if (isRunning) setLaps([...laps, elapsedTime]);
  };

  const formatTime = (time) => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / 3600000) % 24)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <Container>

        <MainContainer>
          <Column>
            <StopwatchBox />
          </Column>
          <Column>
            <WalkReplayMap path={path} />
          </Column>
          {/* <TrailContainer>
            {/* <BoxContainer>
                <DateP>{date.toLocaleDateString()}</DateP>

                <ClockContainer>
                    <ClockP>{formatTime(elapsedTime)}</ClockP>
                    <ClockButtonContainer>
                        <ClockButton onClick={handleStartStop}>{isRunning ? '중지' : '시작'}</ClockButton>
                        <ClockButton onClick={handleReset}>리셋</ClockButton>
                        <ClockButton onClick={handleLap} disabled={!isRunning}>랩</ClockButton>
                    </ClockButtonContainer>
                </ClockContainer>

              <TrailRecordContainer>
                {laps.map((lap, index) => (
                  <TrailRecordP key={index}>산책 : {formatTime(lap)}</TrailRecordP>
                ))}
              </TrailRecordContainer>
            </BoxContainer> 
          </TrailContainer> */}
        
      </MainContainer>
    </Container>
  );
};

export default WalkRecord;
