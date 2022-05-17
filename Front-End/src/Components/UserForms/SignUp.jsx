import React from 'react'
import AccountBox from './accountBox/AccountBox'
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;


const SignUp = () => {
    return (
        <Container>
            <AccountBox/>
        </Container>
    )
}

export default SignUp