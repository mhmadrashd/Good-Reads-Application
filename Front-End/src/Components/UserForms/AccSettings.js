import { CssBaseline } from '@mui/material'
import React from 'react'
import Footer from '../subComponents/Footer'
import Navbar from '../subComponents/navbar/navbar'
import AccountSettings from './accountSettings'

function AccSettings() {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <AccountSettings />
            <Footer />
        </>
    )
}

export default AccSettings