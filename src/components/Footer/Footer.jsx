import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    width: 100%;
    height: 20vw;
    background-color: #F0F0EF;
`;

const FooterP = styled.div`
    padding: 4.9vw;
    font-size: 1vw;
    font-weight: 500;
`;

export const Footer = () => {
  return (
    <FooterContainer>
        <FooterP></FooterP>
    </FooterContainer>
  )
}
