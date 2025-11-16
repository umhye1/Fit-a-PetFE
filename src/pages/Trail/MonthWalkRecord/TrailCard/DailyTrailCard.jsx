import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { UI } from '../../../../styles/uiToken';
import { getWalkRecordDetail, updateWalkRecord, deleteWalkRecord } from '../../../../lib/api';

const Panel = styled.div`
  width: 100%;                 
  background: ${UI.white};
  border: 1px solid ${UI.lightgreenButton};
  border-radius: ${UI.radiusLg};
  box-shadow: ${UI.shadow};
  padding: 1.2vw 1.4vw;       
  box-sizing: border-box;
`;


const Row = styled.div`
  display: flex;
  color: ${UI.chipText}; 
  font-size: 1.2vw;
  font-weight: 700;             
  margin-bottom: 0.6vw;

  & > span:first-child {
    width: 10vw;               
    font-weight: 800;
    color: ${UI.text};
    font-size: 1.2vw;
  }

  @media (max-width: 1200px) {
    font-size: 1.2vw;
    & > span:first-child { width: 24vw; }
  }
`;

const Placeholder = styled.div`
  font-size: 0.85vw;
  color: ${UI.textSubtle};
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
    margin: 1vw;
`;


const Title = styled.div`
  font-size: 1.1vw;          
  font-weight: 800;
  color: ${UI.text};
  margin-bottom: 1vw;

  @media (max-width: 1200px) {
    font-size: 1.8vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5vw;
`;

const EditButton = styled.button`
    border: 1px solid ${UI.lightgreenButton};
    border-radius: ${UI.radiusLg};
    background: ${UI.lightgreenButton};
    color: ${UI.text};
    font-size: 0.95vw;           
    font-weight: 600;
`
const DeleteButton = styled.button`
    border: 1px solid ${UI.lightgreenButton};
    border-radius: ${UI.radiusLg};
    background: ${UI.lightgreenButton};
    color: ${UI.text};
    font-size: 0.95vw;            
    font-weight: 600;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;    
    margin: 1vw;
`;

/**
 * DailyTrailCard
 * @param {object}   props
 * @param {string|number|null} props.trailId 선택된 기록 ID(없으면 안내 문구)
 * @param {object|null}         props.fallbackRecord 목록에서 넘기는 임시 데이터(상세 응답 오기 전 표시)
 * @param {function}            [props.fetcher] 상세조회 함수 주입 (테스트/추상화용)
 *        (trailId: string|number, token?: string) => Promise<any>
 *        미전달 시 기본 fetch(`/api/trails/${trailId}`)
 */
export default function DailyTrailCard({ trailId, fallbackRecord, fetcher,onDeleted, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMemo, setEditMemo] = useState('');
  const [editRating, setEditRating] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const defaultFetcher = useCallback(async (id) => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`/trails/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      method: 'GET'
    });
    if (!res.ok) throw new Error(`상세 요청 실패: ${res.status}`);
    const data = await res.json();
    return data?.data ?? data;
  }, []);


  const run = useCallback(async () => {
    if (!trailId) {
      setDetail(null);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await (fetcher || defaultFetcher)(trailId);
      setDetail(data);

      setEditMemo(data.memo || '');
      setEditRating(
        data.rating === null || data.rating === undefined ? '' : String(data.rating)
      );
    } catch (e) {
      setError(e.message);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [trailId, fetcher, defaultFetcher]);

  useEffect(() => {
    run();
  }, [run]);

  const showing = detail ?? fallbackRecord ?? null;

  const handleEditClick = () => {
    if (!showing) return;
    setIsEditing(true);
    setEditMemo(showing.memo || '');
    setEditRating(
      showing.rating === null || showing.rating === undefined
        ? ''
        : String(showing.rating)
    );
  };

  const handleSave = async () => {
    const id = trailId || showing?.recordId;
    if (!id) return;

    try {
      setSaving(true);
      const payload = {
        memo: editMemo,
        rating:
          editRating === '' || editRating === null
            ? null
            : Number(editRating),
      };
      const updated = await updateWalkRecord(id, payload);
      setDetail(updated);          // 상세 화면 갱신
      setIsEditing(false);
      onUpdated?.(updated);        // 부모가 있으면 records 동기화
      alert('수정이 저장되었습니다.');
    } catch (e) {
      console.error(e);
      alert(e.message || '수정 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

   const handleDelete = async () => {
    const id = trailId || showing?.recordId;
    if (!id) return;
    if (!window.confirm('이 산책 기록을 삭제하시겠습니까?')) return;

    try {
      setDeleting(true);
      await deleteWalkRecord(id);

      setDetail(null);
      setIsEditing(false);
      
      onDeleted?.(id);   // 부모에서 목록에서도 제거 가능
      alert('삭제되었습니다.');
    } catch (e) {
      console.error(e);
      alert(e.message || '삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };


  return (
    <Panel>
      <TitleContainer>
        <Title>선택한 날짜 상세</Title>
        <ButtonContainer>
            <EditButton
              type="button"
              onClick={handleEditClick}
              disabled={!showing || loading || deleting}
            >
              {isEditing ? '수정 중' : '수정'}
            </EditButton>
            <DeleteButton
              type="button"
              onClick={handleDelete}
              disabled={!showing || loading || saving}
            >
              삭제
            </DeleteButton>
        </ButtonContainer>
      </TitleContainer>

      <DetailContainer>
      {!trailId && !showing && (
        <Placeholder>날짜 또는 기록을 선택하면 상세 정보가 표시됩니다.</Placeholder>
      )}
      {loading && <Placeholder>불러오는 중...</Placeholder>}
      {error && <Placeholder>오류: {error}</Placeholder>}

      {showing && !loading && !error && (
        <>
          <Row><span>날짜</span><div>{showing.walkDate || showing.date || '-'}</div></Row>
          <Row><span>시작</span><div>{showing.walkStart || '-'}</div></Row>
          <Row><span>종료</span><div>{showing.walkEnd || '-'}</div></Row>
          <Row>
            <span>소요시간</span>
            <div>{showing.formattedDuration || showing.record || showing.duration || '-'}</div>
          </Row>
          <Row><span>거리(km)</span><div>{showing.distance ?? '-'}</div></Row>
          {isEditing ? (
              <>
                <Row>
                  <span>메모</span>
                  <div style={{ flex: 1 }}>
                    <textarea
                      value={editMemo}
                      onChange={(e) => setEditMemo(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '4vw',
                        fontSize: '0.9vw',
                        padding: '0.4vw 0.6vw',
                        borderRadius: '0.6vw',
                        border: `1px solid ${UI.line}`,
                        resize: 'vertical',
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <span>평점</span>
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editRating}
                      onChange={(e) => setEditRating(e.target.value)}
                      style={{
                        width: '4vw',
                        fontSize: '0.9vw',
                        padding: '0.3vw 0.4vw',
                        borderRadius: '0.6vw',
                        border: `1px solid ${UI.line}`,
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <span></span>
                  <div>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving || deleting}
                      style={{
                        marginRight: '0.5vw',
                        padding: '0.4vw 0.9vw',
                        borderRadius: '0.6vw',
                        border: 'none',
                        background: UI.primary,
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.9vw',
                      }}
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      disabled={saving || deleting}
                      style={{
                        padding: '0.4vw 0.9vw',
                        borderRadius: '0.6vw',
                        border: `1px solid ${UI.line}`,
                        background: '#fff',
                        color: UI.text,
                        fontWeight: 600,
                        fontSize: '0.9vw',
                      }}
                    >
                      취소
                    </button>
                  </div>
                </Row>
              </>
            ) : (
              <>
                <Row><span>메모</span><div>{showing.memo || '-'}</div></Row>
                <Row><span>평점</span><div>{showing.rating ?? '-'}</div></Row>
              </>
            )}
          </>
        )}
      </DetailContainer>
    </Panel>
  );
}

