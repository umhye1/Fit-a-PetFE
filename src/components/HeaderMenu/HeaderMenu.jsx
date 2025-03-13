import React from 'react'
import styled from 'styled-components'
import { Link , NavLink} from 'react-router-dom';

const HeaderMenuContainer = styled.div`
    width: 100%;     
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    backdrop-filter: blur(10.100000381469727px);
`;

const MenuContainer = styled.div`
    display : flex;
    width: 20vw;
    height: 4vw;
    justify-content: center;
    align-items: center;
    margin : 0.4vw;
`;

const Menu1 =styled(NavLink)`
    font-size: 1vw;
    font-weight: 600; 
    padding : 0.4vw 0.2vw;
    margin : 0.6vw;
    text-decoration: none;
    color: black;
    &:visited { 
        color: #3D8D7A;
    }
    &:hover { 
        color: #3D8D7A; 
    }
    &:active { 
        color: #3D8D7A;
    }
`

const HeaderMenu = ({hoveredComponent, onHover, onLeave, handleTouchEnd, handleTouchStart}) => {
  return (
    <HeaderMenuContainer>
        {hoveredComponent === 'feed' &&
        <MenuContainer
            className='Feed'
            onMouseEnter={()=>{ onHover(hoveredComponent)}}
            onMouseLeave={()=> onLeave()}
            onTouchStart={(handleTouchStart)}
            onTouchEnd={(handleTouchEnd)}
        >
            <Menu1 to ="/feed">피드</Menu1>
            <Menu1 to ="/petphoto">내 펫 뽐내기</Menu1>
        </MenuContainer>
        }

    </HeaderMenuContainer>
  )
}

export default HeaderMenu