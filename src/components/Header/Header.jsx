import React from 'react'
import styled from 'styled-components';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import ChatRoom from '../../components/Chat/ChatRoom';
import footPrint from '../../assets/images/footprint.png';

const Container = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #B8DD6D;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    
`;
const LogoContainer = styled(NavLink)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    padding: 1vw 2vw;
    justify-content: center;
    font-size: 2vw;
    font-weight: 600;
    color: #2E2923;
    text-decoration: none;


    &:hover ,
    &:active { 
        color: #4A4031;
    }
`

const MenuContainer1 = styled.div`
    display : flex;
    width: 20vw;
    justify-content: center;
    align-items: center;
`;

const MenuContainer2 = styled.div`
    display : flex;
    width: 20vw;
    margin-left:auto;
    align-items: center;
`;

const Menu1 = styled(NavLink)`
    font-size: 1vw;
    font-weight: 600; 
    padding : 0.3vw 0.2vw;
    margin : 0.6vw;
    
    text-decoration: none;
    color: #2E2923;
   
    &:hover ,
    &:active { 
        color: #4A4031;
    }

`

const Menu2 = styled(NavLink)`
    font-size: 1vw;
    font-weight: 700;
    border: 0.08vw solid #99CC31; 
    background-color: #99CC31;
    border-radius: 1.3889vw;
    padding : 0.3vw 0.9vw;
    margin : 0.6vw;

    text-decoration: none;
    color: #2E2923;
   
    &:hover ,
    &:active { 
        color: #4A4031; 
        border: 0.08vw solid #4A4031; 
    }
`
const ChatContainer = styled.div`
  position: fixed;
  right: 1vw;
  top: 6vw;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px;
  
`;

const ChatIcon = styled.img`
  width: 2vw;
  position: absolute;
  top: 5%;
  right: 21%;
  margin: 0.5vw;
  
`;


const Header = ({onHover,closeMenu}) => {

    const[chatRoom,setChatRoom] = useState(false);

    const handleChatRoom = () =>{
        if (chatRoom) 
            setChatRoom(false)
        else 
            setChatRoom(true)
    }
  
    return (
    <Container>
        <HeaderContainer>
        <MenuContainer1 onClick={closeMenu}>
            <Menu1 
                to = "/post"
                onMouseEnter={()=> {onHover('feed')}}
                onClick={closeMenu}>
                커뮤니티
            </Menu1>
            <Menu1
                to = "/map"
                onMouseEnter={()=> {onHover('map')}}
                onClick={closeMenu}>
                지도
            </Menu1>
        </MenuContainer1>

        <LogoContainer to ="/" >fit-a-pet</LogoContainer>

        <MenuContainer2>
            <ChatIcon src={footPrint} onClick={handleChatRoom}/>
            <Menu2 to = "myPetRoom">펫 룸</Menu2>
            <Menu2 to = "/login">로그인</Menu2>
            <Menu2 to = "/trail">산책기록함</Menu2>
            {chatRoom&&
                <ChatContainer>
                    <ChatRoom/>
                </ChatContainer>}
        </MenuContainer2>
    </HeaderContainer>
    </Container>
  )
}

export default Header