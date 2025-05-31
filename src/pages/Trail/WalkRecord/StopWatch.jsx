import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
//   background: #D9EDAF;
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

const TimeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TimeP = styled.div`
    font-size: 2vw;
    font-weight: 800;
    color: #4A4031;
    margin: 0vw 1vw;
    padding: 2vw;
`;

const TimeP2 = styled.div`
    font-size: 1.5vw;
    font-weight: 800;
    color: #4A4031;
    margina: 0vw 1vw;
    padding: 2vw;
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
  width: 6vw;
  font-size: 0.9vw;
  font-weight: 500;
`;

const TrailRecordContainer = styled.div`
  margin-top: 0vw;
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TrailRecordP = styled.div`
  margin: 1vw;
  font-size: 1vw;
  font-weight: 700;
  color: #4A4031;
`;

const StopwatchBox = () => {
  const [date, setDate] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

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


    useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 clear
    }, []);

    const handleStartStop = () => setIsRunning(!isRunning);
    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        if (!isRunning && elapsedTime > 0) {
          setLaps([...laps, { number: laps.length + 1, time: elapsedTime }]);
        }
    };
      
      
    const formatTime = (time) => {
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor((time / 3600000) % 24)}`.slice(-2);
        return `${hours}:${minutes}:${seconds}`;
    };
    
    const today = new Date();
    // 현재 날짜를 가져옵니다.
    
    const formattedDate = `${currentTime.getHours().toString().padStart(2, '0')} : ${currentTime.getMinutes().toString().padStart(2, '0')} : ${currentTime.getSeconds().toString().padStart(2, '0')}`;
    

  return (
    <TrailContainer>
      <BoxContainer>
        <DateP>{date.toLocaleDateString()}</DateP>

        <ClockContainer>
          <ClockP>{formatTime(elapsedTime)}</ClockP>
          <ClockButtonContainer>
            <ClockButton onClick={handleReset}>리셋</ClockButton>
            <ClockButton onClick={handleLap} disabled={isRunning || elapsedTime === 0}>기록</ClockButton>

            <ClockButton onClick={handleStartStop}>{isRunning ? '산책 끝' : '산책 시작'}</ClockButton>
          </ClockButtonContainer>
        </ClockContainer>

        <TimeContainer>
            <TimeP2>현재 시각</TimeP2>
            <TimeP>{formattedDate}</TimeP>
        </TimeContainer>

        <TrailRecordContainer>
            {laps.map((lap, index) => (
                <TrailRecordP key={index}>
                    산책 {lap.number} : {formatTime(lap.time)}
                </TrailRecordP>
            ))}
        </TrailRecordContainer>

      </BoxContainer>
    </TrailContainer>
  );
};

export default StopwatchBox;
