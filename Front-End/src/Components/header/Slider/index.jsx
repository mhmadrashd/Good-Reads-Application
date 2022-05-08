import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { sliderData } from "./data";
import styles from "./index.module.scss";

const Slider = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  const wrapper = {
    transform: `translateX(${slideIndex * -100}vw)`,
  };
  return (
    <div className={styles.container}>
      <div className={styles.arrowLeft} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.wrapper} style={wrapper}>
        {sliderData.map((item) => (
          <div className={styles.slide} key={item.id}>
            <div className={styles.imgContainer}>
              <img src={item.img} alt="" />
            </div>
            <div className={styles.infoContainer}>
              <h1 className={styles.title}>{item.head}</h1>
              <p className={styles.desc}>{item.paragraph}</p>
              <button onClick={() => navigate("shop")}>Show Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.arrowRight} onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
