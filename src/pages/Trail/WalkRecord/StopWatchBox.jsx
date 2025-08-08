import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/* ===== Soft Pastel UI Tokens ===== */
const UI = {
  bg: '#F9FCF6',
  card: '#E8F6C8',
  white: '#FFFFFF',
  text: '#4A4031',
  sub: '#7B6F5D',
  line: '#ECE7DF',
  primary: '#5E513E',
  primaryHover: '#4A3F31',
  chip: '#FFF5F7',
  chipText: '#5C4B4B',
  shadow: '0 6px 16px rgba(0,0,0,0.06)',
  radius: '18px',
  radiusLg: '22px',
  radiusSm: '12px',
};

/* ===== Layout ===== */
const Wrap = styled.div`
  width: 26.5vw;
  background: ${UI.bg};
  border-radius: ${UI.radiusLg};
  box-shadow: ${UI.shadow};
  overflow: hidden;
`;

const Card = styled.div`
  background: ${UI.card};
  padding: 1.1vw 1.2vw 1vw;
`;

const ChipDate = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4vw;
  // background: ${UI.bg};
  color: ${UI.chipText};
  font-weight: 800;
  border-radius: 999px;
  padding: 0.35vw 0.5vw;
  font-size: clamp(12px, .9vw, 14px);
`;

/* ===== Timer ===== */
const NowRow = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-top: .8vw;
`;
const NowLabel = styled.span`
  color: ${UI.sub}; font-weight: 700;
  font-size: clamp(12px, .9vw, 14px);
`;
const NowValue = styled.span`
  color: ${UI.text}; font-weight: 900;
  letter-spacing: .02em;
  font-size: clamp(14px, 1.05vw, 16px);
`;

const Timer = styled.div`
  margin: .8vw 0 1vw;
  background: ${UI.white};
  border: 1px solid ${UI.line};
  border-radius: ${UI.radiusLg};
  padding: 1.1vw 1vw;
  text-align: center;
  box-shadow: ${UI.shadow};
  font-size: clamp(22px, 2.4vw, 34px);
  font-weight: 900;
  color: ${UI.text};
`;

const BtnRow = styled.div`
  display: flex; gap: .6vw; justify-content: center;
`;
const Btn = styled.button`
  appearance: none; border: 0; cursor: pointer;
  padding: .5vw 1.1vw; min-width: 6vw;
  border-radius: 999px; box-shadow: ${UI.shadow};
  font-weight: 800; font-size: clamp(12px,.9vw,14px);
  transition: transform .08s ease, opacity .12s ease, background .2s ease;
  &:active{ transform: translateY(1px); }
  &:disabled{ opacity:.5; cursor:not-allowed; }
`;
const Ghost = styled(Btn)`background: ${UI.white}; color:${UI.text};`;
const Primary = styled(Btn)`background:${UI.primary}; color:#fff; &:hover{background:${UI.primaryHover};}`;

/* ===== Info ===== */
const Section = styled.div`
  background: ${UI.white};
  border: 1px solid ${UI.line};
  border-radius: ${UI.radius};
  padding: .9vw 1vw;
  margin-top: 1vw;
`;

const InfoList = styled.ul`
  list-style: none; margin: 0; padding: 0;
  display: grid; row-gap: .55vw;
`;
const Item = styled.li`
  display: flex; justify-content: space-between; align-items: center;
  padding: .35vw .2vw; border-radius: ${UI.radiusSm};
`;
const Label = styled.span`
  color: ${UI.sub}; font-weight: 700; font-size: clamp(12px,.9vw,14px);
`;
const Value = styled.span`
  color: ${UI.text}; font-weight: 900; font-size: clamp(13px,1vw,15px);
`;

/* ===== Inputs ===== */
const Field = styled.div`margin-top: .8vw; display: grid; row-gap: .4vw;`;
const L = styled.label`color: ${UI.sub}; font-weight: 700; font-size: clamp(12px,.9vw,14px);`
const TA = styled.textarea`
  min-height: 5vw; resize: vertical;
  font-size: clamp(12px,.95vw,14px);
  border: 1px solid ${UI.line}; border-radius: ${UI.radius};
  padding: .7vw .9vw; background:${UI.bg}; color:${UI.text};
  outline: none; transition: box-shadow .15s ease, border-color .15s ease;
  &:focus{ border-color:${UI.primary}; box-shadow:0 0 0 3px rgba(94,81,62,.12); }
`;
const Num = styled.input`
  width: 6vw;
  font-size: clamp(12px,.95vw,14px);
  border: 1px solid ${UI.line}; border-radius: ${UI.radiusSm};
  padding: .5vw .7vw; background:${UI.bg}; color:${UI.text};
  outline: none; transition: box-shadow .15s, border-color .15s;
  &:focus{ border-color:${UI.primary}; box-shadow:0 0 0 3px rgba(94,81,62,.12); }
`;

const SaveWrap = styled.div`margin-top: 1vw;`;
const Save = styled.button`
  width: 100%; border: 0; cursor: pointer;
  padding: .85vw 1.1vw; border-radius: ${UI.radius};
  background:${UI.primary}; color:#fff;
  font-weight: 900; font-size: clamp(13px,1vw,16px);
  box-shadow:${UI.shadow}; transition: background .2s, transform .08s, opacity .12s;
  &:hover{ background:${UI.primaryHover}; }
  &:active{ transform: translateY(1px); }
  &:disabled{ opacity:.5; cursor:not-allowed; }
`;

/* ===== Component ===== */
const StopwatchBox = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [now, setNow] = useState(new Date());
  const [memo, setMemo] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => { const t = setInterval(()=>setNow(new Date()), 1000); return ()=>clearInterval(t); }, []);
  useEffect(() => {
    let id; if (isRunning) { const base = Date.now() - elapsedTime;
      id = setInterval(()=> setElapsedTime(Date.now()-base), 1000);
    } return ()=>clearInterval(id);
  }, [isRunning]);

  const p2 = (n)=>String(n).padStart(2,'0');
  const hh = p2(now.getHours()), mm = p2(now.getMinutes()), ss = p2(now.getSeconds());
  const fmt = (ms)=>{ const s=Math.floor(ms/1000); return `${p2(Math.floor(s/3600))}:${p2(Math.floor((s%3600)/60))}:${p2(s%60)}`; };

  const onStartStop = () => {
    if (isRunning){ setIsRunning(false); setEndTime(new Date()); }
    else { setIsRunning(true); setStartTime(new Date()); setEndTime(null); setElapsedTime(0); }
  };
  const onReset = () => { setIsRunning(false); setElapsedTime(0); setStartTime(null); setEndTime(null); setMemo(''); setRating(0); };

  const onSave = async () => {
    if (!startTime || !endTime) return;
    const payload = {
      walkDate: startTime.toISOString().split('T')[0],
      walkStart: startTime.toTimeString().split(' ')[0],
      walkEnd: endTime.toTimeString().split(' ')[0],
      record: fmt(elapsedTime),
      memo,
      rating: Number(rating),
    };
    console.log('save:', payload);
    await fetch('/api/walk-record/save', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    alert('산책 기록 저장 완료!');
  };

  const canSave = !!startTime && !!endTime;

  return (
    <Wrap>
      <Card>
        {/* <ChipDate> {new Date().toLocaleDateString()}</ChipDate> */}

        <NowRow>
          <NowLabel>현재 시각</NowLabel>
          <NowValue>{hh} : {mm} : {ss}</NowValue>
        </NowRow>

        <Timer>{fmt(elapsedTime)}</Timer>

        <BtnRow>
          <Ghost onClick={onReset}>리셋</Ghost>
          <Primary onClick={onStartStop}>{isRunning ? '산책 끝' : '산책 시작'}</Primary>
        </BtnRow>

        <Section>
          <InfoList>
            <Item><Label>산책 날짜</Label><Value>{new Date().toLocaleDateString()}</Value>
          </Item>
            <Item><Label>산책 시작</Label><Value>{startTime ? startTime.toLocaleTimeString() : '—'}</Value></Item>
            <Item><Label>산책 종료</Label><Value>{endTime ? endTime.toLocaleTimeString() : '—'}</Value></Item>
            <Item><Label>산책 시간</Label><Value>{fmt(elapsedTime)}</Value></Item>
          </InfoList>

          <Field>
            <L htmlFor="memo">메모</L>
            <TA id="memo" placeholder="산책 중 메모를 남겨보세요" value={memo} onChange={(e)=>setMemo(e.target.value)} />
          </Field>

          <Field>
            <L htmlFor="rating">별점 (1~5)</L>
            <Num id="rating" type="number" min="1" max="5" value={rating} onChange={(e)=>setRating(e.target.value)} />
          </Field>

          <SaveWrap>
            <Save disabled={!canSave} onClick={onSave}>저장하기</Save>
          </SaveWrap>
        </Section>
      </Card>
    </Wrap>
  );
};

export default StopwatchBox;
