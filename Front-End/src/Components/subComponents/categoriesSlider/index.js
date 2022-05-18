import React, { useLayoutEffect, useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from "react-router";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const CategoriesSlider = () => {
  const { mode } = useSelector((state) => state.DataReducer);

  let color;
  let fontColor;
  let btnColor;
  if (mode === "light") {
    color = "#FAFAFC";
    fontColor = "rgba(131, 131, 131,1)"
    btnColor = 'primary'
  } else {
    color = "rgba(33, 35, 41,.8)";
    fontColor = "rgba(216, 140, 26,1)"
    btnColor = "success"
  }
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--background-color",
      mode === "dark" ? "rgba(38, 40, 51, .5)" : "rgba(241, 237, 248, .5)"
    );
    root?.style.setProperty("--text-color", mode === "dark" ? "#fff" : "dark");
  }, [mode])

  const [CategoryData, setCategoryData] = useState([]);
  const refresh = 0;
  const navigate = useNavigate();
  useLayoutEffect(() => {
    axios.get('http://localhost:3000/category/')
      .then((response) => {
        setCategoryData(...CategoryData, response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [refresh])
  return (
    <div className={`${styles.container} Categories`}>
      <Carousel responsive={responsive} className="p-8" showDots={true}>
        {CategoryData.map((currItem, index) => (
          <Card
            sx={{
              minWidth: 275,
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              borderColor: 'transparent',
              paddingTop: 3,
              m: 2,
              backgroundColor: color,
              color: fontColor,
              boxShadow: 3
            }}
            key={index}
            variant="outlined"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="700"
            data-aos-offset="150"
            data-aos-delay={100 * (index * 2)}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {currItem.Name}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label="Show" size="small" color={btnColor} onClick={() => navigate(`category/${currItem._id}`)}>
                <ArrowCircleRightIcon />
                Show
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Carousel>
    </div >
  );
};

export default CategoriesSlider;
