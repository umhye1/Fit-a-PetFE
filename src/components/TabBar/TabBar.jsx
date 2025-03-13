import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const TabContainer = styled.div`
  width: 100%;
  height: 10vh;
  position : absolute;
  bottom : 0;
  display: flex;
`;

const MenuContainer = styled.div`
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3D8D7A;
  border: 0.1px solid ; 
  border-color: #A3D1C6;
  color: #B3D8A8;
  font-size: 1.3vw;
  &:hover {
        color: #B3D8A8;
   }
`;

const TabBar = () => {
  return (
    <TabContainer>
        <MenuContainer className='ChatBox'>
            <Link to= "/chatbox" style={{ textDecoration: "none"}}>채팅함</Link>
        </MenuContainer>
        <MenuContainer className='Community'>
            <Link to ="/community" style={{ textDecoration: "none"}}>커뮤니티</Link>
        </MenuContainer>
        <MenuContainer className='Map'>
            <Link to ="/map" style={{ textDecoration: "none"}}>지도</Link>
        </MenuContainer>
        <MenuContainer className='WalkBox'>
            <Link to ="/walkbox" style={{ textDecoration: "none"}}>산책기록함</Link>
        </MenuContainer>
        <MenuContainer className='Profile'>
            <Link to ="/profile" style={{ textDecoration: "none"}}>프로필</Link>
        </MenuContainer>
    </TabContainer>
  )
}

export default TabBar
