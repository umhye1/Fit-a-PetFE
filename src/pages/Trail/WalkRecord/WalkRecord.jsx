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

 const Column = styled.div`
   width: 28vw;      
   height: 100%;    
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

      </MainContainer>
    </Container>
  );
};

export default WalkRecord;
