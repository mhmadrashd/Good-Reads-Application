import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { sliderData } from "./data";
import styles from "./index.module.scss";
import axios from "axios";

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
  let BooksData = useRef([]);
  useLayoutEffect(() => {
    axios.get('http://localhost:3000/book/')
      .then((response) => {
        BooksData.current.values = response.data;
        console.log(BooksData.current.values)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.arrowLeft} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.wrapper} style={wrapper}>
        {BooksData.current.values.map((item) => (
          <div className={styles.slide} key={item.id}>
            <div className={styles.imgContainer}>
              <img src={item.img} alt="" />
            </div>
            <div className={styles.infoContainer}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.description}</p>
              <button onClick={() => navigate("show")}>Show Now</button>
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