import React from 'react'
import AccountBox from './accountBox/AccountBox'
import styled from 'styled-components';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { CssBaseline } from '@mui/material';

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
    const { mode } = useSelector((state) => state.DataReducer);
    const theme = createTheme({
        palette: {
            mode: mode || "light",
        },
    });
    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <Container>
                <AccountBox />
            </Container>
        </ThemeProvider>
    )
}

export default SignUp