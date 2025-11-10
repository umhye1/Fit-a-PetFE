import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useNavigate } from "react-router-dom";
import ChatRoom from '../../components/Chat/ChatRoom';
import footPrint from '../../assets/images/footprint.png';
import { useAuth } from '../../pages/Login/AuthContext';

const Container = styled.div`
  width:100%;
  height:5vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  background-color:#B8DD6D;
`;

const HeaderContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  position:relative;
`;

const LogoContainer = styled(NavLink)`
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  padding:1vw 2vw;
  justify-content:center;
  font-size:2vw;
  font-weight:600;
  color:#2E2923;
  text-decoration:none;
  
  &:hover,
  &:active{color:#4A4031;}
`;
const MenuContainer1 = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding-left:2.5vw;
`;

const MenuContainer2 = styled.div`
    display:flex;
    align-items:center;
    padding-right:2.5vw;
`;

const Menu1 = styled(NavLink)`
  font-size:1vw;
  font-weight:600;
  padding:0.3vw 0.2vw;
  margin:0.6vw;
  text-decoration:none;
  color:#2E2923;
  
  &:hover,
  &:active{
    color:#4A4031;
    }
`;

const Menu2 = styled(NavLink)`
  font-size:1vw;
  font-weight:700;
  border:0.08vw solid #99CC31;
  background:#99CC31;
  border-radius:1.3889vw;
  padding:0.3vw 0.9vw;
  margin:0.6vw;
  text-decoration:none;
  color:#2E2923;
  
  &:hover,
  &:active{
    color:#4A4031;
    border:0.08vw solid #4A4031;
    }
`;

const MenuBtn = styled.button`
  font-size:1vw;
  font-weight:700;
  border:0.08vw solid #99CC31;
  background:#99CC31;
  border-radius:1.3889vw;
  padding:0.3vw 0.9vw;
  margin:0.6vw;
  color:#2E2923;
  cursor:pointer;
  
  &:hover{
    color:#4A4031;
    border:0.08vw solid #4A4031;
    }
`;

const ChatContainer = styled.div`
  position:fixed;
  right:1vw;
  top:6vw;
  overflow:hidden;
  border-radius:25px;
  box-shadow:rgb(0 0 0 / 30%) 0px 12px 60px 5px;
`;

const ChatIcon = styled.img`
    width:2vw;
    margin:0.5vw;
`;

const Header = ({ onHover, closeMenu }) => {
  const [chatRoom, setChatRoom] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleChatRoom = () => setChatRoom(prev => !prev);
  const handleLogout = () => {
    logout?.();           // 토큰 제거 + 상태 갱신 (AuthContext에서 구현)
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <HeaderContainer>
        <MenuContainer1 onClick={closeMenu}>
          <Menu1 to="/post" onMouseEnter={()=> onHover('feed')} onClick={closeMenu}>커뮤니티</Menu1>
          <Menu1 to="/map" onMouseEnter={()=> onHover('map')} onClick={closeMenu}>지도</Menu1>
        </MenuContainer1>

        <LogoContainer to="/">fit-a-pet</LogoContainer>

        <MenuContainer2>
          <ChatIcon src={footPrint} onClick={handleChatRoom}/>
          <Menu2 to="/myPetRoom">펫 룸</Menu2>

          {isLoggedIn ? (
            <>
              <Menu2 to="/mypage">마이페이지</Menu2>
              <MenuBtn onClick={handleLogout}>로그아웃</MenuBtn>
            </>
          ) : (
            <Menu2 to="/login">로그인</Menu2>
          )}

          <Menu2 to="/trail">산책기록함</Menu2>

          {chatRoom && (
            <ChatContainer>
              <ChatRoom />
            </ChatContainer>
          )}
        </MenuContainer2>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
