import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { useSelector } from "react-redux";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
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
  const { mode } = useSelector((state) => state.NavbarReducer);
  let color;
  let fontClr;
  if (mode === "light") {
    color = "linear-gradient(45deg, #FE6B8B 25%, #FF8E53 45%)";
    fontClr = "white";
  } else {
    color = grey[1000];
    fontClr = "dark";
  }
  const [CategoryData, setCategoryData] = useState([]);
  const refresh = 0;
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
    <div className={styles.container}>
      <Carousel responsive={responsive} className="p-8" showDots={true}>
        {CategoryData.map((currItem, index) => (
          <Card
            sx={{
              minWidth: 275,
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              background: color,
              color: fontClr,
              borderRadius: 2,
              paddingTop: 3,
              m: 2,
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
              <IconButton aria-label="Show" size="small" color='primary'>
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
