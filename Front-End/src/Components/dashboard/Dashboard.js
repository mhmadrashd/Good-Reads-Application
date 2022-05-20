import React from 'react'
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material";
import Navbar from "../subComponents/navbar/navbar";
import Footer from "../subComponents/Footer";
import { ThemeProvider } from '@mui/styles';
import VerticalTabs from './SideTabs/SideBarTabs';

function Dashboard() {
    const { mode } = useSelector((state) => state.DataReducer);
    const theme = createTheme({
        palette: {
            mode: mode || "light",
        },
    });
    return (
        <ThemeProvider theme={theme} >
            <Navbar />
            <VerticalTabs />
            <Footer />
        </ThemeProvider>
    )
}

export default Dashboard