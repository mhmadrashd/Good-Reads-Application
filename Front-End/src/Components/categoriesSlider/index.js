import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styles from "./index.module.scss";
import axios from "axios"

const CategoriesSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  let [bookData, setBookData] = useState([]);
  let [bookData2, setBookData2] = useState([]);
  let x = 0;
  useEffect(() => {
    axios.get('http://localhost:3001/imgsPaths')
      .then((response) => {
        let data = response.data.map((res) => {
          console.log(res)
          return res
        })
        console.log(data)
        setBookData(data)
        console.log(bookData)
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('http://localhost:3001/book/')
      .then((response) => {
        let data2 = response.data.map((res) => {
          console.log(res.title)
          return res
        })
        console.log(data2)
        setBookData2(data2)
        console.log(bookData2)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [x])
  const wrapper = {
    transform: `translateX(${slideIndex * -100}vw)`,
  };
  return (
    <div className={styles.container}>
      <div className={styles.arrowLeft} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div >
        {bookData.map((item, index) => (
          <div className={styles.slide} key={index}>
            <h1 className={styles.title}>{item}</h1>
          </div>
        ))}
      </div>
      <div >
        {bookData2.map((item, index) => (
          <div className={styles.slide} key={index + 20}>
            <h1 className={styles.title}>{item.title}</h1>
          </div>
        ))}
      </div>
      <div className={styles.arrowRight} onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default CategoriesSlider;
