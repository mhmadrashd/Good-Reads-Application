import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    height: 100vh;
    display:flex;
    position: relative;
    overflow: hidden;
`;

const SideBar = styled.div`
    height: 100%;
    min-width:200px;
    background:linear-gradient(45deg, #FE6B8B 60%, #FF8E53 90%);
    
`;

const UlList = styled.ul`
    height: auto;
    width: 100%;
    padding:0;
`;

const UnOrderedLi = styled.li`
    /* width: 100%; */
    height:50px;
    list-style-type: none;
    margin: 0;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: center;
    align-items: center;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    outline: 0;
    border-radius: 0;
    user-select: none;
    vertical-align: middle;
    text-decoration: none;
    line-height: 1.25;
    letter-spacing: 0.01857em;
    text-transform: uppercase;
    max-width: 360px;
    min-width: 90px;
    position: relative;
    flex-shrink: 0;
    padding: 12px 16px;
    overflow: hidden;
    white-space: normal;
    &:hover{
        cursor: pointer;
        color: #0a427a;

    };

    &:active{
    color: #0a427a;
    border-right: 5px solid #0a427a;
    }
`;

const NSideBar = () => {
    return (
        <Container>
            <SideBar>
                <UlList>
                    <UnOrderedLi>ALL</UnOrderedLi>
                    <UnOrderedLi>Read</UnOrderedLi>
                    <UnOrderedLi>Current Reading</UnOrderedLi>
                    <UnOrderedLi>Want to Read</UnOrderedLi>
                </UlList>
            </SideBar>
        </Container>
    )
}

export default NSideBar