import React from "react";
import styles from "./index.module.scss";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from "@mui/material";
import { scroller } from "react-scroll/modules";


const Main = () => {
  //Go to section after click item from menu in navbar
  const scrollToSection = (page) => {
    scroller.scrollTo(page, {
      duration: 500,
      delay: 0,
      offset: -70,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <div className={`${styles.container} Home topPage`} >
      <div className={`${styles.vd}`}>
        <video
          src="https://firebasestorage.googleapis.com/v0/b/goodreadsapplication.appspot.com/o/main.mp4?alt=media&token=0127f931-be55-41f8-9695-d41f0460e905"
          type="video/mp4"
          autoPlay={true}
          loop
          muted={true}
        />
      </div>
      <div className={styles.maindiv}>
        <h1 className={styles.maintxt}>Welcome To Our Good Reading Books Page</h1>
        <p className={styles.mainp}>
          A good book is the precious life-blood of a master-spirit,
          embalmed and treasured up on purpose to a life beyond life,
          and as such it must surely be a necessary commodity.
        </p>
        <Button
          onClick={() => { scrollToSection("Books") }}
          className={styles.mainbtn}
        >
          Get Started <ArrowForwardIosIcon className={styles.mainicon} />
        </Button>
      </div>
    </div>
  );
};

export default Main;
