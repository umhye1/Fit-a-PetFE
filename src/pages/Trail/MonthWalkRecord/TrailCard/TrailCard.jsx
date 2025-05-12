import React from 'react';
import styled from 'styled-components';

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
    background: #D9EDAF;
    width: 27vw;
    border-radius: 1vw;
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
    font-weight: 500;
    margin: 1.5vw;
    color: #2E2923
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1vw;
    padding: 1vw;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F0F0EF;
  border-radius: 5px;
  padding: 0.5vw 1.5vw;
  width: 20vw;
  font-size: 0.9vw;
  color: #2E2923;
`;

function TrailCard({ selectedMonth }) {
  // 더미 데이터 
  const records = [
    { date: '2025-04-01', distance: '1.2km' },
    { date: '2025-04-12', distance: '2.0km' },
    { date: '2025-05-03', distance: '0.8km' },
    { date: '2025-05-04', distance: '0.8km' },
  ];

  const filtered = selectedMonth
    ? records.filter((record) => record.date.startsWith(selectedMonth))
    : [];

  return (

    <TrailCardContainer>
        <Container>
            <TrailContainer>
            <TitleContainer>
                <CardTitle>월 산책 기록</CardTitle>
            </TitleContainer>
        <CardContainer>
            {filtered.length > 0 ? (
            filtered.map((r, idx) => (
                <CardBox key={idx}>
                <strong>{r.date}</strong> | 거리: {r.distance}
                </CardBox>
            ))
            ) : (
            <CardBox>기록이 없습니다.</CardBox>
            )}
        </CardContainer>
        </TrailContainer>
        </Container>
    </TrailCardContainer>
  );
}

export default TrailCard;
