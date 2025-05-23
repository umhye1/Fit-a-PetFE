import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import WalkRecord from './WalkRecord/WalkRecord';
import MonthWalkRecord from './MonthWalkRecord/MonthWalkRecord';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw;
  margin-bottom: 10vw;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 30vw;
  gap: 2vw;
`;

const MenuButtonContainer = styled.div`
  display: flex;
  gap: 2vw;
  margin-top: 1vw;
`;

const MenuButtonP = styled.button`
  font-size: 1vw;
  font-weight: 700;
  border-radius: 1.4vw;
  padding: 0.5vw 1vw;
  color: white;
  background: ${({ active }) => (active ? '#7B6651' : '#4A4031')};
  border: none;
`;

const Trail = () => {
  const [monthRecord, setMonthRecord] = useState(false); // 산책 기록 측정 , 한 달 치 기록 확인

  return (
    <Container>
        <MenuButtonContainer>
            <MenuButtonP onClick={() => setMonthRecord(false)} active={!monthRecord}>
                산책 기록 측정
            </MenuButtonP>

            <MenuButtonP onClick={() => setMonthRecord(true)} active={monthRecord}>
                한 달 치 기록 확인
            </MenuButtonP>
        </MenuButtonContainer>

        <MainContainer>
            {monthRecord ? <MonthWalkRecord /> : <WalkRecord />}

        </MainContainer>
    </Container>
  );
};

export default Trail;
