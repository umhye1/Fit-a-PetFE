import React from 'react'
import styled from 'styled-components';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #3D8D7A;
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
    color: black; 
    text-decoration: none;
    &:visited { 
        color: #F3F4E3;
    }
    &:hover { 
        color: #F3F4E3; 
    }
    &:active { 
        color: #F3F4E3; 
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
    color: black;
    &:visited { 
        color: #F3F4E3;
    }
    &:hover { 
        color: #F3F4E3; 
    }
    &:active { 
        color: #F3F4E3; 
    }

`

const Menu2 = styled(NavLink)`
    font-size: 1vw;
    font-weight: 700;
    border: 0.08vw solid black; 
    border-radius: 20px;
    padding : 0.3vw 0.9vw;
    margin : 0.6vw;

    text-decoration: none;
    color: black;
    &:visited { 
        color: #F3F4E3;
        border: 0.08vw solid #F3F4E3; 
    }
    &:hover { 
        color: #F3F4E3; 
        border: 0.08vw solid #F3F4E3; 
    }
    &:active { 
        color: #F3F4E3; 
        border: 0.08vw solid #F3F4E3; 
    }
`


const Header = ({onHover,closeMenu}) => {
    
  
    return (
    <Container>
        <HeaderContainer>
        <MenuContainer1 onClick={closeMenu}>
            <Menu1 
                to = "/feed"
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
            <Menu2>로그인</Menu2>
            <Menu2>산책기록함</Menu2>
        </MenuContainer2>
    </HeaderContainer>
    </Container>
  )
}

export default Header