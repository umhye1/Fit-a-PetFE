import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { UI } from '../../../styles/uiToken';
import { useNavigate } from 'react-router-dom';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw;
`;
const Card = styled.div`
  width: 56vw;
  background: ${UI.white};
  border: 0.06vw solid #99CC31;
  border-radius: 1vw;
  box-shadow: ${UI.shadow};
  padding: 2vw;
`;
const Title = styled.h2`
  font-size: 1.4vw; 
  margin: 0 0 1.2vw 0; 
  color: #2E2923;
`;
const Row = styled.div`
  display: flex; 
  gap: 1vw; 
  margin-bottom: 1vw;
`;
const Label = styled.label`
  width: 7vw; 
  font-weight: 700; 
  font-size: 0.95vw; 
  color: #2E2923;
`;
const Input = styled.input`
  flex: 1; 
  border: 0.06vw solid #99CC31;
  border-radius: 0.6vw;
  padding: 0.6vw 0.8vw; 
  font-size: 0.95vw;
`;
const Select = styled.select`
  flex: 1; 
  border: 0.06vw solid #99CC31; 
  border-radius: 0.6vw;
  padding: 0.6vw 0.8vw; 
  font-size: 0.95vw; 
  background: ${UI.white};
`;
const Textarea = styled.textarea`
  flex: 1; 
  min-height: 16vw; 
  resize: vertical;
  border: 0.06vw solid #99CC31; 
  border-radius: 0.6vw; 
  padding: 0.8vw;
  font-size: 0.95vw; 
  line-height: 1.5;
`;
const Hint = styled.div`
  font-size: 0.8vw; 
  color: #8b8b8b; 
  margin-top: 0.3vw;
`;
const ButtonRow = styled.div`
  display: flex; 
  justify-content: flex-end; 
  gap: 0.8vw; 
  margin-top: 1.2vw;
`;
const Button = styled.button`
  border-radius: 1.3889vw; 
  padding: 0.6vw 1.2vw; 
  font-size: 0.9vw; 
  font-weight: 700;
  border: 0.1vw solid #99CC31; 
  background-color: #D9EDAF; 
  color: #2E2923;
  &:hover { opacity: .9; }
`;

export default function PetpostWrite() {
  const nav = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: '', category: 'FREE', content: '', tags: ''
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFile = (e) => setFile(e.target.files?.[0] ?? null);

  const submit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setErrorMsg('제목과 내용을 입력하세요.');
      return;
    }
    try {
      setSubmitting(true);
      setErrorMsg('');

      // 파일 포함 시 multipart
      const token = localStorage.getItem('accessToken');
      const body = new FormData();
      body.append('title', form.title);
      body.append('category', form.category);
      body.append('content', form.content);
      body.append('tags', form.tags);
      if (file) body.append('image', file);

      const res = await fetch('/api/petposts', {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
          // multipart 이므로 Content-Type 자동 생성 (헤더에 지정하지 않음)
        },
        body
      });
      if (!res.ok) throw new Error(`작성 실패: ${res.status}`);
      // const data = await res.json();

      alert('작성 완료!');
      nav('/petposts'); // 목록/상세로 이동 경로 프로젝트에 맞춰 변경
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>게시글 작성</Title>

        <Row>
          <Label>제목</Label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </Row>

        <Row>
          <Label>카테고리</Label>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="HOT">인기글</option>
            <option value="ALL">전체 게시판</option>
            <option value="FREE">자유 게시판</option>
            <option value="INFO">반려동물 정보</option>
            <option value="FOOD">맛집</option>
            <option value="TRAIL">산책로 추천</option>
          </Select>
        </Row>

        <Row style={{ alignItems: 'flex-start' }}>
          <Label>내용</Label>
          <div style={{ flex: 1 }}>
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
            />
            <Hint>이미지는 아래에서 업로드할 수 있어요.</Hint>
          </div>
        </Row>

        <Row>
          <Label>태그</Label>
          <Input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="쉼표(,)로 구분해 입력"
          />
        </Row>

        <Row>
          <Label>이미지</Label>
          <div style={{ flex: 1 }}>
            <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} />
            {!!file && <Hint>선택됨: {file.name}</Hint>}
          </div>
        </Row>

        {errorMsg && <Hint style={{ color: 'crimson' }}>{errorMsg}</Hint>}

        <ButtonRow>
          <Button type="button" onClick={() => nav(-1)}>취소</Button>
          <Button type="button" onClick={submit} disabled={submitting}>
            {submitting ? '작성 중…' : '작성하기'}
          </Button>
        </ButtonRow>
      </Card>
    </Page>
  );
}
