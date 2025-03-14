import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 72.8vw;
    justify-content: space-between;
`;

const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width : 22vw;
    height: 28vw;
    background-color: #F0F0EF;
    border-radius: 15px;
    margin: 1.5vw;
`; 

const CardImg = styled.div`
    width: 19vw;
    height: 19vw;
    margin: 1.5vw 1.5vw 0vw 1.5vw;
    background-color: lightgray;
`;

export const Card = () => {
  return (
    <Container>
        <CardContainer>
            <CardBox>
                <CardImg/>
            </CardBox>
            <CardBox>
                <CardImg/>
            </CardBox>
            <CardBox>
                <CardImg/>
            </CardBox>
        </CardContainer>
    </Container>
  )
}
