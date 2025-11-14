import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { UI } from '../../../styles/uiToken';

const Box = styled.div`
  width: 100%;
  padding: 2vw;
  background: ${UI.white};
  border: 0.06vw solid #99CC31;
  border-radius: 1vw;
  box-shadow: ${UI.shadow};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2vw;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.div`
  grid-column: 1 / -1;
  font-size: 1.1vw;
  font-weight: 700;
  color: #2E2923;
  margin-bottom: 0.5vw;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  font-size: 0.95vw;
`;
const Label = styled.span`
  min-width: 5.5vw;
  font-weight: 700;
  color: #2E2923;
`;
const Value = styled.span`
  color: #4A4031;
  font-weight: 600;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
`;
const Chip = styled.span`
  padding: 0.25vw 0.6vw;
  background: ${UI.chip};
  color: ${UI.chipText};
  border-radius: 999px;
  font-size: 0.85vw;
  font-weight: 700;
`;

const Placeholder = styled.div`
  grid-column: 1 / -1;
  font-size: 0.9vw;
  color: #8b8b8b;
`;

export default function PetpostInfo({ petId, fetcher }) {
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  const defaultFetcher = useCallback(async (id) => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`/api/pets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    if (!res.ok) throw new Error(`펫정보 요청 실패: ${res.status}`);
    const data = await res.json();
    return data?.data ?? data;
  }, []);

  useEffect(() => {
    if (!petId && !fetcher) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await (fetcher || defaultFetcher)(petId);
        setPet(result);
      } catch (e) {
        setError(e.message);
        setPet(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [petId, fetcher, defaultFetcher]);

  return (
    <Box>
      <SectionTitle>펫 정보</SectionTitle>
      {loading && <Placeholder>불러오는 중…</Placeholder>}
      {error && <Placeholder>오류: {error}</Placeholder>}
      {!loading && !error && pet && (
        <>
          <Field><Label>이름</Label><Value>{pet.name ?? '-'}</Value></Field>
          <Field><Label>종</Label><Value>{pet.species ?? '-'}</Value></Field>
          <Field><Label>성별</Label><Value>{pet.gender ?? '-'}</Value></Field>
          <Field><Label>나이</Label><Value>{pet.age ? `${pet.age}살` : '-'}</Value></Field>
          <Field style={{ gridColumn: '1 / -1' }}>
            <Label>성향</Label>
            <ChipWrap>
              {(pet.traits ?? []).length
                ? pet.traits.map((t, i) => <Chip key={i}>{t}</Chip>)
                : <Value>-</Value>}
            </ChipWrap>
          </Field>
          <Field style={{ gridColumn: '1 / -1' }}>
            <Label>소개</Label><Value>{pet.bio ?? '-'}</Value>
          </Field>
        </>
      )}
      {!loading && !error && !pet && <Placeholder>펫 정보를 선택하면 표시됩니다.</Placeholder>}
    </Box>
  );
}
