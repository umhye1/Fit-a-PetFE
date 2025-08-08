import React, { useState } from 'react';
import styled from 'styled-components';
import WalkRecord from './WalkRecord/WalkRecord';
import MonthWalkRecord from './MonthWalkRecord/MonthWalkRecord';


const walkPath = [
  { lat: 37.5471, lng: 126.9236 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5472, lng: 126.9238 },
  { lat: 37.5473, lng: 126.9241 },
  { lat: 37.5473, lng: 126.9241 },
  { lat: 37.5474, lng: 126.9241 },
  { lat: 37.5474, lng: 126.9241 },
  { lat: 37.5475, lng: 126.9242 },
  { lat: 37.5475, lng: 126.9239 },
  { lat: 37.5475, lng: 126.9239 },
  { lat: 37.5475, lng: 126.9239 },
  { lat: 37.5475, lng: 126.9235 },
  { lat: 37.5476, lng: 126.9235 },
  { lat: 37.5476, lng: 126.9235 },
  { lat: 37.5477, lng: 126.9235 },
  { lat: 37.5477, lng: 126.9235 },
  { lat: 37.5478, lng: 126.9235 },
  { lat: 37.5479, lng: 126.9235 },
];

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
  align-items: stretch;
  height: 32vw;  
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
  border: none;
  background: ${({ $active }) => ($active ? '#FFEDF0' : '#5E513E')};
  color: ${({ $active }) => ($active ? '#4A4031' : '#FFFFFF')};
`;

const Trail = () => {
  const [monthRecord, setMonthRecord] = useState(false);

  return (
    <Container>
      <MenuButtonContainer>
        <MenuButtonP onClick={() => setMonthRecord(false)} $active={!monthRecord}>
          산책 기록 측정
        </MenuButtonP>
        <MenuButtonP onClick={() => setMonthRecord(true)} $active={monthRecord}>
          한 달 치 기록 확인
        </MenuButtonP>
      </MenuButtonContainer>

      <MainContainer>
        {monthRecord ? <MonthWalkRecord /> : <WalkRecord path={walkPath} />}
      </MainContainer>
    </Container>
  );
};

export default Trail;
