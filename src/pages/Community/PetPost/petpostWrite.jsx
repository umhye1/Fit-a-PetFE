import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { UI } from '../../../styles/uiToken';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadImage, createPetPost, getPetPost, updatePetPost, listMyPets } from '../../../lib/api';

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
  border-radius: 1vw;ㄹ
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
  const { search, pathname } = useLocation();
  const editId = new URLSearchParams(search).get('edit');
  const isEdit = !!editId;

  const [form, setForm] = useState({ petId: '', title: '', category: 'GeneralPost', content: '', tags: '' });
  const [myPets, setMyPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);

  const onAuthFail = (e) => {
    const status = e?.response?.status ?? e?.status;
    if (status === 401 || status === 403) {
      alert('로그인이 필요합니다.');
      const from = isEdit ? `/petpostWrite?edit=${editId}` : '/petpostWrite';
      const fallbackFrom = `${pathname}${search || ''}`;
      nav('/login', { state: { from: from || fallbackFrom } });
      return true; 
    }
    return false;
  };


  useEffect(() => {
    (async () => {
      try {
        setLoadingPets(true);
        const rows = await listMyPets();
        setMyPets(rows);
        // 하나만 있으면 자동 선택
        if (rows.length === 1) setForm(f => ({ ...f, petId: String(rows[0].id) }));
      } catch(e) {
        console.error('[listMyPets FAIL]', e);
        if (onAuthFail(e)) return; // 로그인이동
      } finally {
        setLoadingPets(false);
      }
    })();
  }, []);
  
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 수정
  useEffect(()=>{
    if(!isEdit) return;
    (async () =>{
      try{
        const d = await getPetPost(editId);
        setForm({
          title: d.title ?? '',
          category: d.category ?? 'GeneralPost',
          content: d.content ?? '',
          petId: d.petId ? String(d.petId) : '',
          tags: (Array.isArray(d.tags) ? d.tags.join(','): (d.tags ?? ''))
        });
      } catch (e){
        setErrorMsg('게시글 정보를 불러오지 못했습니다.');
      }
    })();
  },[isEdit, editId]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFile = (e) => setFile(e.target.files?.[0] ?? null);



  const submit = async () => {
    if (!String(form.petId).trim()) {
      setErrorMsg('반드시 내 펫을 선택하세요.');
      return;
    }

    if (!form.title.trim() || !form.content.trim()) {
      setErrorMsg('제목과 내용을 입력하세요.');
      return;
    }
    try {
      setSubmitting(true);
      setErrorMsg('');

      // 이미지 presign 받아서 s3에 업로드
      let imageUrl = undefined;
      if (file) {
        imageUrl = await uploadImage(file); // 서버가 돌려준 최종 경로/URL\
      }
      // 태그 문자열 - 배열
      const tagsArray = form.tags
        ? form.tags.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      // 등록 / 수정
      const payload = {
        title: form.title,
        category: form.category,
        petId: Number(form.petId),
        content: form.content,
        tags: tagsArray,
        ...(imageUrl ? { imageUrl } : {}) // 새 파일 없으면 기존 이미지 유지(수정 시)
     };

      if (isEdit) {
        await updatePetPost(editId, payload);
        alert('수정 완료!');
        nav(`/petpostPage/${editId}`, { replace: true });
      } else {
        const created = await createPetPost(payload);
        const newId = created?.id;
        alert('작성 완료!');
        nav(newId ? `/petpostPage/${newId}` : '/petposts');
      }
    } catch (e) {
      if (onAuthFail(e)) return; // 401/403이면 알럿 후 로그인으로 이동
      setErrorMsg(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>{isEdit ? '게시글 수정' : '게시글 작성'}</Title>

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
            <option value="GeneralPost">자유게시판</option>
            <option value="InfoPost">정보게시판</option>
          </Select>
        </Row>

        <Row>
          <Label>반려동물</Label>
          <Select
            name="petId"
            value={form.petId}
            onChange={handleChange}
          >
            <option value="">내 펫 선택</option>
            {myPets.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
                {p.sex ? ` / ${String(p.sex).toUpperCase()}` : ''}
                {p.petType ? ` / ${p.petType}` : ''}
              </option>
            ))}
          </Select>
          {!!(!loadingPets && !myPets.length) && (
            <Hint>
              등록된 펫이 없습니다. 마이페이지 &gt; 내 펫 관리에서 먼저 펫을 등록해주세요.
            </Hint>
          )}
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
            {submitting ? (isEdit ? '수정 중…' : '작성 중…') : (isEdit ? '수정하기' : '작성하기')}
          </Button>
        </ButtonRow>
      </Card>
    </Page>
  );
}
