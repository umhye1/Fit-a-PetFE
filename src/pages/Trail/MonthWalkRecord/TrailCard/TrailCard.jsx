import React from 'react';
import styled from 'styled-components';
import {UI} from '../../../../styles/uiToken';

const TrailCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
`;

const Container = styled.div`
    display: flex;
`;

const TrailContainer = styled.div`
    background: ${UI.card};
    width: 28vw;
    height: auto;
    border-radius: ${UI.radiusLg};
    box-shadow: ${UI.shadow};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1vw;
    box-sizing: border-box;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const CardTitle = styled.div`
  font-size: 1vw;
  font-weight: 800;
  margin: 1.5vw;
  color: ${UI.text};
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1vw;
    padding: 1vw;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  background: ${UI.bg};
  border-radius: 5px;
  padding: 1vw 1.5vw;
  width: auto;
`;

const CardBoxP = styled.div`
  color: ${UI.text};
  font-weight: 700;
  font-size: 0.9vw;
  padding : 0.3vw 0.3vw 0.3vw 0;

`;

const CardBoxP2 = styled.div`
  color: ${UI.chipText};
  font-size: 0.9vw;
  font-weight: 700;
  padding : 0.3vw 0.3vw 0.3vw 0;
  margin : 0 0 0 6.5vw;

`;

function TrailCard({ selectedMonth, selectedDate, records }) {
  const monthlyRecords = selectedMonth
    ? records.filter((record) => record.date.startsWith(selectedMonth))
    : [];

  const dailyRecord = selectedDate
    ? records.find((record) => record.date === selectedDate)
    : null;

  return (
    <TrailCardContainer>
      <Container>
        <TrailContainer>
          <TitleContainer>
            <CardTitle>월 산책 기록</CardTitle>
          </TitleContainer>
          <CardContainer>
            {dailyRecord && (
              <CardBox>
                <CardBoxP>{dailyRecord.date}</CardBoxP> 
                <CardBoxP2>| 거리: {dailyRecord.distance}</CardBoxP2>
              </CardBox>
            )}

            {monthlyRecords.length > 0 ? (
              monthlyRecords.map((r, idx) => (
                <CardBox key={idx}>
                  <CardBoxP>{r.date}</CardBoxP>
                  <CardBoxP2>| 거리: {r.distance}</CardBoxP2>
                </CardBox>
              ))
            ) : (
              <CardBox>
                <CardBoxP>기록이 없습니다.</CardBoxP>
              </CardBox>
            )}
          </CardContainer>
        </TrailContainer>
      </Container>
    </TrailCardContainer>
  );
}

export default TrailCard;
