import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import { listMyPosts, deletePost, listMyPets, createPet, updatePet, deletePetApi } from '../../lib/api';
// ↑ 백엔드 DTO 확정 후 위 API 함수들 연결 예정

/* ====================== Layout ====================== */
const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 15vw;
  flex-shrink: 0;
  border-right: 0.08vw solid #99CC31;
`;

const SideTitle = styled.div`
  display: flex;
  padding: 4vw 0 2vw 6vw;
  font-weight: 600;
  font-size: 1.2vw;
  color: #2E2923;
`;

const SideItem = styled.button`
  display: flex;
  align-items: center;
  padding: 0.8vw 0 0.8vw 6vw;
  font-weight: 600;
  font-size: 1vw;
  color: ${p => (p.$active ? '#9DBD5D' : '#2E2923')};
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  &:hover { color: #9DBD5D; }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 1.5vw;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5.7vw 0 0;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.2vw;
  font-weight: 600;
  margin: 2.2vw 0 1vw 3vw;
  color: #2E2923;
`;

const SubRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8vw;
  margin-right: 3vw;
`;

const ActionBtn = styled.button`
  padding: 0.3vw 0.9vw;
  border-radius: 1.3889vw;
  font-size: 0.8vw;
  font-weight: 600;
  background: ${p => p.$danger ? '#ffebe9' : '#D9EDAF'};
  color: ${p => p.$danger ? '#b60205' : '#2E2923'};
  border: 0.1vw solid ${p => p.$danger ? '#ff7b72' : '#99CC31'};
  cursor: pointer;
`;

/* ====================== Tables / Cards ====================== */
const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.9vw;
  margin: 0.9vw 6.25vw 0.3vw 3vw;
  border: 0.1vw solid #99CC31;
  border-radius: 0.6vw;
`;

const RowTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  justify-content: space-between;
`;

const PostTitle = styled.div`
  font-size: 1vw;
  font-weight: 600;
  color: #2E2923;
`;

const Meta = styled.div`
  font-size: 0.75vw;
  color: #5a5a5a;
`;

const Excerpt = styled.div`
  font-size: 0.88vw;
  color: #2E2923;
  margin-top: 0.5vw;
  white-space: pre-wrap;
`;

const Empty = styled.div`
  margin: 0 3vw;
  padding: 1vw 0 0 0;
  font-size: 0.8vw;
  color: #666;
`;

/* ====================== Pets ====================== */
const PetsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16vw, 1fr));
  gap: 1vw;
  margin: 0 3vw;
`;

const PetCard = styled.div`
  border: 0.1vw solid #99CC31;
  border-radius: 0.9vw;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
`;

const PetName = styled.div`
  font-size: 1vw;
  font-weight: 700;
  color: #2E2923;
`;

const PetMeta = styled.div`
  font-size: 0.8vw;
  color: #555;
`;

/* ====================== Modal ====================== */
const ModalBack = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.25);
  display: ${p => (p.$open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBody = styled.div`
  width: 40vw;
  background: #fff;
  border-radius: 0.9vw;
  border: 0.1vw solid #99CC31;
  padding: 1.5vw;
  display: flex;
  flex-direction: column;
  gap: 0.9vw;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4vw;
`;

const Label = styled.label`
  font-size: 0.85vw;
  font-weight: 600;
`;

const Input = styled.input`
  height: 2.5vw;
  border: 0.08vw solid #B8DD6D;
  padding: 0 0.75vw;
  font-size: 0.8vw;
`;

const Select = styled.select`
  height: 2.5vw;
  border: 0.08vw solid #B8DD6D;
  padding: 0 0.75vw;
  font-size: 0.8vw;
  background: #fff;
`;

/* ====================== Helpers ====================== */
const fmt = d => {
  if (!d) return '';
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? String(d) : t.toLocaleString();
};

const TABS = [
  { key: 'posts', label: '내가 쓴 글' },
  { key: 'comments', label: '내가 쓴 댓글' },
  { key: 'pets', label: '내 펫 관리' },
];

export default function MyPage() {
  const navigate = useNavigate();
  const { isLoggedIn, me } = useAuth();

  // 로그인 가드
  useEffect(() => {
    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.');
      navigate('/login', { state: { from: '/mypage' } });
    }
  }, [isLoggedIn, navigate]);

  const [tab, setTab] = useState('posts');

  // ===== posts state (더미) =====
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);

  // ===== comments state (더미) =====
  const [comments, setComments] = useState([]);
  const [loadingCmt, setLoadingCmt] = useState(false);

  // ===== pets state =====
  const [pets, setPets] = useState([]);
  const [loadingPet, setLoadingPet] = useState(false);
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  // ⚠️ 통일: sex는 'male'|'female', age는 문자열 입력값 보관 → 저장 시 숫자 변환
  const [petForm, setPetForm] = useState({
    name: '',
    type: 'DOG',
    sex: 'male',
    age: '1',
    traits: '', // 콤마 구분 입력
  });
  const [savingPet, setSavingPet] = useState(false);

  // 탭 전환마다 해당 데이터 로딩
  useEffect(() => {
    if (tab === 'posts') {
      (async () => {
        setLoadingPost(true);
        try {
            const list = await listMyPosts({ page:0, size: 50});
            setPosts(list);
        } catch (e){
            const status = e?.response?.status;
            if (status === 401) {
                window.alert('로그인이 필요합니다.');
                navigate('/login', { state: { from: '/mypage' } });
                return;
            }
            console.error('[MY POSTS FAIL]', e);
            setPosts([]);
        } finally {
          setLoadingPost(false);
        }
      })();
    }

    if (tab === 'comments') {
      (async () => {
        setLoadingCmt(true);
        try {
          // TODO: API 연동: const list = await listMyComments({ page:0, size:10 });
          const list = [
            { comment_id: 5, post_id: 11, content: '잘 봤어요!', created_at: new Date().toISOString(), post_title: '첫 글' },
          ];
          setComments(list);
        } finally {
          setLoadingCmt(false);
        }
      })();
    }
    if (tab === 'pets') {
      (async () => {
        setLoadingPet(true);
        try {
          const list = await listMyPets();
          setPets(list.map(p => ({
            pet_id: p.id,
            name: p.name,
            sex: (p.sex || '').toLowerCase(),    // 정규화
            age: p.age,
            traits: Array.isArray(p.traits) ? p.traits : [],
          })));
        } catch (e) {
          const status = e?.response?.status;
          if (status === 401) {
            window.alert('로그인이 필요합니다.');
            navigate('/login', { state: { from: '/mypage' } });
            return;
          }
          console.error('[MY PETS FAIL]', e);
          setPets([]);
        } finally {
          setLoadingPet(false);
        }
      })();
    }
  }, [tab, me?.nickname, navigate]);

  /* ====================== Posts handlers ====================== */
  const goPost = (id) => navigate(`/post/${id}`);
  const editPost = (id) => navigate(`/postWrite?edit=${id}`); // 에디터 재활용
  const removePost = async (id) => {
    if (!window.confirm('게시글을 삭제할까요?')) return;
    try {
        await deletePost(id);
    } catch (e) {
        const status = e?.response?.status;
        if (status === 401) {
        window.alert('로그인이 필요합니다.');
        navigate('/login', { state: { from: '/mypage' } });
        return;
        }
        window.alert('삭제 중 오류가 발생했습니다.');
        console.error('[DELETE POST FAIL]', e);
        return;
    }

    setPosts(prev => prev.filter(p => p.post_id !== id)); // optimistic
  };

  /* ====================== Comments handlers ====================== */
  const goCommentPost = (postId) => navigate(`/post/${postId}`);
  const removeComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제할까요?')) return;
    // TODO: await deleteComment(commentId);
    setComments(prev => prev.filter(c => c.comment_id !== commentId));
  };

  /* ====================== Pets handlers ====================== */
  const openCreatePet = () => {
    setEditingPet(null);
    // 기본값 통일
    setPetForm({ name: '', type: 'DOG', sex: 'male', age: '1', traits: '' });
    setPetModalOpen(true);
  };

  const openEditPet = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name || '',
      type: 'DOG', // 서버 타입 연동 전까지 고정
      sex: (pet.sex || 'female').toLowerCase(),
      age: typeof pet.age === 'number' ? String(pet.age) : (pet.age || '1'),
      traits: Array.isArray(pet.traits) ? pet.traits.join(', ') : (pet.traits || ''),
    });
    setPetModalOpen(true);
  };

  const savePet = async () => {
    if (savingPet) return;
    const payload = { ...petForm };
    if (!payload.name.trim()) return window.alert('이름을 입력하세요.');
    const ageNum = Number(payload.age);
    if (!Number.isFinite(ageNum) || ageNum < 1) {
      return window.alert('나이는 1 이상의 숫자로 입력하세요.');
    }

    const genderType = ((payload.sex || 'female') === 'male' ? 'MALE' : 'FEMALE'); // MALE|FEMALE|NEUTER
 const petType    = (payload.type || 'DOG').toUpperCase();                      // DOG|CAT
 const traitNames = typeof payload.traits === 'string'
   ? payload.traits.split(',').map(s => s.trim()).filter(Boolean)
   : Array.isArray(payload.traits) ? payload.traits.filter(Boolean) : [];

 const req = {
   name: payload.name.trim(),
   age: ageNum,
   weight: null,            // 입력 안 쓰면 null/0.0 등 서버 허용값
   genderType,              // ★ 서버 DTO 필드명
   petType,                 // ★ 서버 DTO 필드명
   image: null,
   traitNames               // ★ 서버 DTO 필드명(List<String>)
 };

    

    try {
      setSavingPet(true);
      if (editingPet) {
        await updatePet(editingPet.pet_id, req);
      } else {
        await createPet(req);
      }
      const fresh = await listMyPets();
      setPets(fresh.map(p => ({
        pet_id: p.id,
        name: p.name,
        sex: (p.sex || '').toLowerCase(),
        age: p.age,
        traits: Array.isArray(p.traits) ? p.traits : [],
      })));
      setPetModalOpen(false);
    } catch (e) {
      const msg = e?.response?.data?.message || e.message || '저장 중 오류가 발생했습니다.';
      window.alert(msg);
    } finally {
      setSavingPet(false);
    }
  };

  // const deletePet = async (petId) => {
  //   if (!window.confirm('펫 정보를 삭제할까요?')) return;
  //   try{
  //     await deletePetApi(petId);
  //     setPets(prev => prev.filter(p => p.pet_id !== petId));
  //   } catch (e) {
  //     const msg = e?.response?.data?.message || e.message || '삭제 중 오류가 발생했습니다.';
  //     window.alert(msg);
  //   }
  // };

  /* ====================== Render helpers ====================== */
  const categoryLabel = useMemo(() => ({
    FREE: '자유',
    INFO: '정보',
    QUESTION: '질문',
  }), []);

  /* ====================== Render ====================== */
  return (
    <Page>
      <Sidebar>
        <SideTitle>마이페이지</SideTitle>
        {TABS.map(t => (
          <SideItem key={t.key} onClick={() => setTab(t.key)} $active={tab === t.key}>
            {t.label}
          </SideItem>
        ))}
        <SideItem as={Link} to="/post">커뮤니티로 이동</SideItem>
      </Sidebar>

      <Main>
        <HeaderRow>
          <Title>
            {tab === 'posts' && '내가 쓴 글'}
            {tab === 'comments' && '내가 쓴 댓글'}
            {tab === 'pets' && '내 펫 관리'}
          </Title>

          <SubRow>
            {tab === 'posts' && (
              <ActionBtn as={Link} to="/postWrite">새 글쓰기</ActionBtn>
            )}
            {tab === 'pets' && (
              <ActionBtn onClick={openCreatePet}>펫 등록</ActionBtn>
            )}
          </SubRow>
        </HeaderRow>

        {/* ===== 내 글 ===== */}
        {tab === 'posts' && (
          <>
            {loadingPost && <Empty>불러오는 중…</Empty>}
            {!loadingPost && posts.length === 0 && <Empty>작성한 글이 없습니다.</Empty>}

            {!loadingPost && posts.map(p => (
              <Card key={p.post_id}>
                <RowTop>
                  <PostTitle>{p.title}</PostTitle>
                  <Meta>{categoryLabel[p.category] || p.category} · {fmt(p.created_at)}</Meta>
                </RowTop>
                <Excerpt>
                  {(p.content || '').slice(0, 140)}
                  {(p.content || '').length > 140 ? '…' : ''}
                </Excerpt>
                <SubRow style={{ marginTop: '0.6vw' }}>
                  <ActionBtn onClick={() => goPost(p.post_id)}>보기</ActionBtn>
                  <ActionBtn onClick={() => editPost(p.post_id)}>수정</ActionBtn>
                  <ActionBtn $danger onClick={() => removePost(p.post_id)}>삭제</ActionBtn>
                </SubRow>
              </Card>
            ))}
          </>
        )}

        {/* ===== 내 댓글 ===== */}
        {tab === 'comments' && (
          <>
            {loadingCmt && <Empty>불러오는 중…</Empty>}
            {!loadingCmt && comments.length === 0 && <Empty>작성한 댓글이 없습니다.</Empty>}
            {!loadingCmt && comments.map(c => (
              <Card key={c.comment_id}>
                <RowTop>
                  <PostTitle>댓글</PostTitle>
                  <Meta>{fmt(c.created_at)}</Meta>
                </RowTop>
                <Excerpt style={{ marginBottom: '0.4vw' }}>{c.content}</Excerpt>
                <Meta>게시글: <strong>{c.post_title || `#${c.post_id}`}</strong></Meta>
                <SubRow style={{ marginTop: '0.6vw' }}>
                  <ActionBtn onClick={() => goCommentPost(c.post_id)}>원글 보기</ActionBtn>
                  <ActionBtn $danger onClick={() => removeComment(c.comment_id)}>댓글 삭제</ActionBtn>
                </SubRow>
              </Card>
            ))}
          </>
        )}

        {/* ===== 내 펫 ===== */}
        {tab === 'pets' && (
          <>
            {loadingPet && <Empty>불러오는 중…</Empty>}
            {!loadingPet && pets.length === 0 && <Empty>등록된 펫이 없습니다. 우측 상단 ‘펫 등록’으로 추가하세요.</Empty>}
            {!loadingPet && (
              <PetsWrap>
                {pets.map(pet => (
                  <PetCard key={pet.pet_id}>
                    <PetName>{pet.name}</PetName>
                      <PetMeta>성별: {pet.sex === 'male' ? '남아' : '여아'}</PetMeta>
                      {typeof pet.age === 'number' && <PetMeta>나이: {pet.age}살</PetMeta>}
                      {Array.isArray(pet.traits) && pet.traits.length > 0 && (
                        <PetMeta>성향: {pet.traits.join(', ')}</PetMeta>
                      )}
                    <SubRow style={{ marginTop: '0.6vw' }}>
                      <ActionBtn onClick={() => openEditPet(pet)}>편집</ActionBtn>
                      {/* <ActionBtn $danger onClick={() => deletePet(pet.pet_id)}>삭제</ActionBtn> */}
                    </SubRow>
                  </PetCard>
                ))}
              </PetsWrap>
            )}
          </>
        )}
      </Main>

      {/* ===== 펫 등록/편집 모달 ===== */}
      <ModalBack $open={petModalOpen} onClick={() => setPetModalOpen(false)}>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          <h2 style={{ fontSize: '1.1vw', margin: 0 }}>
            {editingPet ? '펫 정보 편집' : '펫 등록'}
          </h2>

          <Field>
            <Label>이름</Label>
            <Input
              value={petForm.name}
              onChange={e => setPetForm(f => ({ ...f, name: e.target.value }))}
              placeholder="예) 콩이"
            />
          </Field>

          <Field>
            <Label>종류</Label>
            <Select
              value={petForm.type}
              onChange={e => setPetForm(f => ({ ...f, type: e.target.value }))}
            >
              <option value="DOG">강아지</option>
              <option value="CAT">고양이</option>
            </Select>
          </Field>

          <Field>
            <Label>성별</Label>
            <Select
              value={petForm.sex}
              onChange={e => setPetForm(f => ({ ...f, sex: e.target.value }))}
            >
              <option value="female">여아</option>
              <option value="male">남아</option>
            </Select>
          </Field>

          <Field>
            <Label>나이 (살)</Label>
            <Input
              type="number"
              min={1}
              step={1}
              value={petForm.age}
              onChange={e => setPetForm(f => ({ ...f, age: e.target.value }))}
              placeholder="예) 3"
            />
          </Field>

          <Field>
            <Label>성향 (콤마로 구분)</Label>
            <Input
              value={petForm.traits}
              onChange={e => setPetForm(f => ({ ...f, traits: e.target.value }))}
              placeholder="예) 온순함, 겁많음"
            />
          </Field>

          <div style={{ display: 'flex', gap: '0.6vw', justifyContent: 'flex-end' }}>
            <ActionBtn onClick={() => setPetModalOpen(false)}>취소</ActionBtn>
            <ActionBtn onClick={savePet} disabled={savingPet}>
              {savingPet ? '저장 중…' : (editingPet ? '저장' : '등록')}
            </ActionBtn>
          </div>
        </ModalBody>
      </ModalBack>
    </Page>
  );
}
