import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { grey, red } from '@mui/material/colors';
import { useSelector } from "react-redux";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from "react-router";
const URL = "https://goodread-backend.herokuapp.com";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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


const AuthorsSlider = () => {
  const { mode } = useSelector((state) => state.DataReducer);
  let color;
  let fontClr;
  let btnColor;
  if (mode === "light") {
    color = "linear-gradient(45deg, #FE6B8B 25%, #FF8E53 45%)";
    fontClr = "white";
    btnColor = 'primary'
  } else {
    color = grey[1000];
    fontClr = "dark";
    btnColor = "success";
  }
  const [CategoryData, setCategoryData] = useState([]);
  const refresh = 0;
  useLayoutEffect(() => {
    axios.get(`${URL}/author/`, { withCredentials: true, credentials: 'include' })
      .then((response) => {
        setCategoryData(...CategoryData, response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [refresh]);
  const navigate = useNavigate();
  return (
    <div className={`${styles.container} Authors`}>
      <Carousel responsive={responsive}
        className="p-8"
        showDots={true}
        transitionDuration={50}>
        {CategoryData.map((currItem, index) => (
          <Card key={index}
            sx={{ maxWidth: 345 }}
            data-aos="fade-down-left"
            data-aos-offset="150"
            data-aos-duration="1000"
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {currItem.fName.slice(0, 1)}
                </Avatar>
              }
              title={currItem.fName + " " + currItem.lName}
              subheader={new Date(currItem.DOB).toDateString()}
            />
            <CardMedia
              component="img"
              sx={{ height: 194 }}
              image={currItem.img}
              alt={currItem.fName + " " + currItem.lName}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {currItem.info}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="Show"
                size="small"
                color={btnColor}
                onClick={() => navigate(`/author/${currItem._id}`)}
              >
                <ArrowCircleRightIcon />
                Show
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default AuthorsSlider;
