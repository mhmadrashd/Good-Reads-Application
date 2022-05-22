import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styles from "./index.module.scss";
import axios from "axios";

const BooksSlider = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [BooksData, setBooksData] = useState([]);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < BooksData.length ? slideIndex + 1 : 0);
    }
  };
  const wrapper = {
    transform: `translateX(${slideIndex * -100}vw)`,
  };
  const refresh = 0;
  useLayoutEffect(() => {
    axios.get('http://localhost:3000/book/', { withCredentials: true, credentials: 'include' })
      .then((response) => {
        setBooksData(...BooksData, response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [refresh])

  return (
    <div className={`${styles.container} Books`} >
      <div className={styles.arrowLeft} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.wrapper} style={wrapper}>
        {BooksData.map((item, index) => (
          <div className={styles.slide} key={index}
            data-aos="zoom-in-left"
            data-aos-easing="linear"
            data-aos-duration="700"
            data-aos-delay={100 * (index * 2)}>
            <div className={styles.imgContainer}>
              <img src={item.img} alt="" />
            </div>
            <div className={styles.infoContainer}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.description}</p>
              <button onClick={() => navigate(`/book/${item._id}`)}>Show Now</button>
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

export default BooksSlider;
