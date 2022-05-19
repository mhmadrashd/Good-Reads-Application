import React, { useEffect } from 'react'
import { Facebook, LinkedIn, GitHub, MailOutline, Phone } from '@mui/icons-material'
import styles from './index.module.scss'
import { Link, useLocation } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { scroller } from 'react-scroll/modules'
const Footer = () => {
    const { mode } = useSelector((state) => state.DataReducer);

    //Go to section after click item from menu in footer
    const scrollToSection = (page) => {
        scroller.scrollTo(page, {
            duration: 500,
            delay: 0,
            offset: -70,
            smooth: "easeInOutQuart",
        });
    };

    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty(
            "--background-color",
            mode === "dark" ? "#262833" : "#e0e0e0"
        );
        root?.style.setProperty("--text-color", mode === "dark" ? "#fff" : "dark");
        Aos.init({ duration: 1500 });
    }, [mode])
    const location = useLocation()
    const currentLocation = location.pathname === '/login' ? '/login' : location.pathname === '/register' ? '/register' : '/'
    return (
        <div className={styles.Container}
            data-aos="fade-up"
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Typography variant="p" className={styles.desc}>Reading books benefits both your physical and mental health,
                        and those benefits can last a lifetime. They begin in early childhood and continue through the senior years.
                        Here’s a brief explanation of how reading books can change your brain — and your body — for the better.</Typography>
                    <div className={styles.socailContainer}>
                        <a href='https://www.facebook.com/' className={styles.socailIcon} style={{ backgroundColor: "#3B5999" }}>
                            <Facebook />
                        </a>
                        <a href='https://www.linkedin.com/' className={styles.socailIcon} style={{ backgroundColor: "#0077B7" }}>
                            <LinkedIn />
                        </a>
                        <a href='https://github.com/mhmadrashd/Good-Reads-Application' target={"_blank"} className={styles.socailIcon} style={{ backgroundColor: "#000" }} rel="noreferrer">
                            <GitHub />
                        </a>
                    </div>
                </div>
                <div className={styles.center}>
                    <Typography variant="h6" className={styles.title}>Useful Links</Typography>
                    <ul className={styles.List}>
                        <li className={styles.listItem} onClick={() => scrollToSection('Home')}>Home</li>
                        <li className={styles.listItem} onClick={() => scrollToSection('Books')}>Book</li>
                        <li className={styles.listItem} onClick={() => scrollToSection('Categories')}>Categories</li>
                        <li className={styles.listItem} onClick={() => scrollToSection('Authors')}>Authors</li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <Typography variant="h6" className={styles.title}>Contact</Typography>
                    <div className={styles.ContactItem}>
                        <Phone style={{ marginRight: "10px" }} /> +20-100-000-0000
                    </div>
                    <div className={styles.ContactItem}>
                        <MailOutline style={{ marginRight: "10px" }} /> Team3@ITI-IOT-Intak42.eg
                    </div>
                </div>
            </div>
            <div className={styles.lowerFotter}>
                <div className={styles.left}>
                    @2022 <Link to={currentLocation}>Tam 3</Link> - Reactjs Nodejs MongoDB Readx-Toolkit MUI AOS Tailwindcss Formik
                </div>
            </div>
        </div>
    )
}

export default Footer