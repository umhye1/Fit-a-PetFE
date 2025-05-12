import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { css } from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
// import axios from 'axios';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: center;
  padding-top: 2vw;
  margin-bottom: 4vw;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5vw;
    width: 100%;
`;

const MainTitleContainer = styled.div`
    padding: 1vw 1vw 1vw 5.1vw;
`;

const Title = styled.p`
    font-size: 1.2vw;
    font-weight: 600;
    color: #2E2923;
`;

const SubTitile = styled.div`
    font-size: 0.8vw;
    font-weight: 500;
    line-height: 150%; /* 0.9375vw */
    letter-spacing: -0.0187vw;
    color: #2E2923;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.5vw 5.85vw 0vw 5.1vw;
`;

const TitleInput = styled.input`
    flex-grow: 1;
    height: 2.5vw;
    box-sizing: border-box;
    padding: 0 0.75vw;  
    border: 0.08vw solid #B8DD6D;
    font-size: 0.8vw;
    font-weight: 600;
    line-height: 2.5vw;  // 높이랑 동일하게 맞춰서 중앙정렬
    color: #9e9e9e;

    &::placeholder {
        color: #9e9e9e;
        font-size: 0.75vw;
        font-weight: 600;
        line-height: 2.5vw;  // placeholder도 동일하게 중앙정렬
  }
`;

const SortContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    justify-content: center;
    select {
        width: 13vw;
        height: 2.5vw;
        border: 0.08vw solid #B8DD6D;
        border-left: none;
        padding: 0.5vw;
        font-weight: 600;
        font-size: 0.8vw;
        background-color: white;
        color: #2E2923;
    }
    option {
      // background-color: #D9EDAF;
    }
  }
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5vw 5.85vw 1.5vw 5.1vw;
`;

const ToolBox = styled.div`
    height: 3.65vw;
    width: 83vw;
    background: #D9EDAF;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 1.1vw;
    padding: 0vw 0vw 0vw 3vw;
`;


const Imageplus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1vw;
  margin-left: 0.75vw;
`;

const ImageP = styled.p`
  color: var(--Gray-Gray-700, #464a4d);
  font-size: 0.6vw;
  font-weight: 500;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BoldText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: Roboto;
  font-size: 0.9vw;
  font-weight: 700;
  line-height: 1.5vw; /* 166.667% */
`;

const ItalicText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: 'Roboto Serif';
  font-size: 1vw;
  font-style: italic;
  font-weight: 400;
`;

const UnderlineText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: 'Roboto Serif';
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  text-decoration-line: underline;
`;

const MidlineText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: 'Roboto Serif';
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: strikethrough;
`;

const BlankBox = styled.div`
  height: auto;
  fill: var(--black-white-white-1000, #fff);
  stroke-width: 0.1vw;
  stroke: var(--Gray-Gray-50, #fafafa);
   border: 0.08vw solid #B8DD6D;
`;

const InputContent = styled.div`
  width: 100%;
  height: 78%;
  flex-shrink: 0;
  min-height: 20vw;
  flex-grow: 1;
  color: var(--Gray-Gray-500, #9e9e9e);
  font-size: 0.75vw; 
  font-weight: 500; 
  line-height: 1.2vw;
  padding: 1.5vw; /* 내부 패딩 추가 */
  border: 0.1vw solid #fafafa;
  outline: none; /* 포커스 시 아웃라인 제거 */

  ${({ isBold }) =>
    isBold &&
    css`
      font-weight: bold;
    `}
  ${({ isItalic }) =>
    isItalic &&
    css`
      font-style: italic;
    `}
  ${({ isUnderline }) =>
    isUnderline &&
    css`
      text-decoration: underline;
    `}
  ${({ isStrikethrough }) =>
    isStrikethrough &&
    css`
      text-decoration: line-through;
    `}
`;

const EnrollContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`;

const Enroll = styled(Link)`
    display: flex;
    justify-content: center;
    
    width: 16vw;
    height: 2.6042vw;
    border-radius: 1vw;
    background-color: #B8DD6D;
    color: #2E2923;
    font-size: 0.9vw;
    font-weight: 600;
    border: none;
    cursor: pointer;
    box-shadow: none;
    line-height: 2.5vw
`;

const FeedWrite = () => {
//   const refreshAccessToken = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken'); 
//       const refreshToken = localStorage.getItem('refreshToken');
  
//     if (!refreshToken) {
//       console.log("no refresh!!!");
//       return;
//     }
  
//     console.log(accessToken);
//     console.log(refreshToken);
  
//     const response = await axios.post(
//         'https://bloodtrail.site/auth/regenerate-token',
//         {}, // POST 요청 본문이 필요하지 않은 경우 빈 객체 전달
//         {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'refresh': `Bearer ${refreshToken}`
//           }
//         }
//     );
  
//     console.log("refresh complete!!!!!!!!!!!!!!!!!!!!");
//     console.log(response.data);
    
//     } catch (error) {
//     console.error('Error refreshing access token: ', error); // 에러 처리
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       await refreshAccessToken();
//     };
//     init();
//   },[]);
  
//   const [imageFile, setImageFile] = useState(null);

//   const [postType, setPostType] = useState('');

//   const handlePostTypeChange = (event) => {
//     setPostType(event.target.value);
//   };

//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [isStrikethrough, setIsStrikethrough] = useState(false);

//   const toggleBold = () => setIsBold(!isBold);
//   const toggleItalic = () => setIsItalic(!isItalic);
//   const toggleUnderline = () => setIsUnderline(!isUnderline);
//   const toggleStrikethrough = () => setIsStrikethrough(!isStrikethrough);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.substr(0, 5) === 'image') {
//       setImageFile(file);
//       const img = document.createElement('img');
//       img.src = URL.createObjectURL(file);
//       img.style.maxWidth = '50%';
//       contentEditableRef.current.appendChild(img);
//     }
//   };

//   const handleSubmit = async () => {
//     const accessToken = localStorage.getItem('accessToken');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', contentEditableRef.current.innerText);
//     formData.append('types', postType);
//     if (imageFile) {
//       formData.append('files', imageFile);
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     };

//     try {
//       const response = await axios.post(
//         'https://bloodtrail.site/post', formData, config
//       );

//       if (response.data.isSuccess) {
//         alert('게시글이 성공적으로 등록되었습니다.');
//         window.location.href = "/community";
//       }
//       else {
//         alert(response.data.message);
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error('게시글 등록 중 오류가 발생했습니다.', error);
//       alert('게시글 등록에 실패했습니다.');
//     }
//   };

//   const [inputCompleted, setInputCompleted] = useState({
//     registrationNumber: false,
//     bloodProduct: false,
//     requireDay: false,
//     requirePlace: false,
//     bloodType: false,
//   });

//   const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);

//   const [title, setTitle] = useState('');

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   useEffect(() => {
//     const allCompleted = Object.values(inputCompleted).every(
//       (status) => status === true
//     );
//     setAllFieldsCompleted(allCompleted);
//   }, [inputCompleted]);

//   const changeImageOnEnter = (field, event) => {
//     if (event.key === 'Enter') {
//       setInputCompleted({ ...inputCompleted, [field]: true });
//     }
//   };

//   const [selectedImage, setSelectedImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const contentEditableRef = useRef(null);

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

  return (
  
      
      
    <Container>
        <MainContainer>
            <MainTitleContainer>
                <Title>글 작성하기</Title>
                <SubTitile>
                    타인을 비방하거나 비난하는 행위 등 이용약관에 어긋나는 글을 작성할
                    경우 삭제될 수 있습니다. 자세한 내용은 이용약관을 참고해주세요
                </SubTitile>
            </MainTitleContainer>


        <TitleContainer>
          <TitleInput
            placeholder="제목을 입력하세요."
            // value={title}
            // onChange={handleTitleChange}
          />
          <SortContainer>
            <select
            //   value={postType}
            //   onChange={handlePostTypeChange}
            >
              <option value="">게시판 선택</option>
              <option value="FREE">자유게시판</option>
              <option value="THINGSRECOMMEND">반려용품 추천</option>
              <option value="WALKRECOMMEND">산책로 추천</option>
            </select>
          </SortContainer>
        </TitleContainer>

        <BoxContainer>
            <ToolBox>
                {/* <Imageplus>
                <img
                    alt="사진 추가"
                    style={{ width: '1.2vw', height: '1.2vw' }}
                />
                <ImageP>사진추가</ImageP>
                </Imageplus> */}
                <input
                type="file"
                //   ref={fileInputRef}
                //   onChange={handleImageChange}
                style={{ display: 'none' }}
                accept="image/*"
                />
                <BoldText>B</BoldText>
                <ItalicText>I</ItalicText>
                <UnderlineText>U</UnderlineText>
                <MidlineText>T</MidlineText>
            </ToolBox>
            <BlankBox>
                <InputContent
                    contentEditable
                    placeholder="내용을 입력하세요."
                />
            </BlankBox>
        </BoxContainer>
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
        />

        <EnrollContainer>
          <Enroll to ="/">글 등록하기</Enroll>
        </EnrollContainer>
    
      </MainContainer>
    </Container>
  );
};

export default FeedWrite;
