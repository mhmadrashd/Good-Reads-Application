import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
// import Select from './Select';
import StarRating from './Rating'
import './Book.css'
import { Box, Rating, TextField } from '@mui/material';
import Image from './Images/LibararyBG.jpg'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDialog } from "../../../../Redux/DataSlice";
import MsgDialogs from '../../../../assets/handleErrors';

const LOCALHOST = 'https://goodread-backend.herokuapp.com/';
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
export default function Book() {
  //Select
  // const [state, setState] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [strValue, setStrValue] = React.useState(0);
  const [revValue, setRevValue] = React.useState("");
  const [hover, setHover] = React.useState(-1);

  // const handleChange = (event) => {
  //   setState(event.target.value);
  //   if (state !== '' && strValue !== 0 && revValue !== "") setDisable(false)
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRevChange = (event) => {
    setRevValue(event.target.value);
    if (strValue !== 0 && revValue !== "") setDisable(false); else setDisable(true)
  };

  //End Select
  const { id } = useParams();
  const [BookInfo, setBookInfo] = useState({
    bookID: id,
    bookName: '',
    author_fname: '',
    author_lname: '',
    category: '',
    reviews: [],
    description: '',
    rate: '',
    image: '',
    stars: 0,
  });
  const [ReviewInfo, setReviewInfo] = useState({
    review: []
  });
  //1 Add To list
  //2 Add review
  const [DialogState, setDialogState] = useState(1);

  const refresh = 0;
  useEffect(() => {
    fetch(`${LOCALHOST}book/` + id)
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data =>
        setBookInfo({
          bookID: data._id,
          bookName: data.title,
          author_fname: data.auhtor.fName,
          author_lname: data.auhtor.lName,
          category: data.category.Name,
          description: data.description,
          rate: data.rating,
          image: data.img,
          stars: 4
        })
      )
  }, [refresh])
  useEffect(() => {
    fetch(`${LOCALHOST}book/userBookBID/` + id)
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data => {
        setReviewInfo({
          review: data
        })
      }
      )
  }, [refresh])

  const dispatch = useDispatch();
  const { openDialog } = useSelector((state) => state.DataReducer);

  const addToList = () => {
    axios.post(`${LOCALHOST}book/userBook`, {
      "book": BookInfo.bookID,
      "state": 2,
      "rating": 0,
      "review": ""
    }, { withCredentials: true, credentials: 'include' })
      .then(function (response) {
        setDialogState(1)
        dispatch(setOpenDialog(true))
        // window.location.reload()
        // setReviewInfo({ review: [...ReviewInfo.review, revValue] })
      })
      .catch(function (error) {
        if (error.response.data === 555) {
          setDialogState(4)
          dispatch(setOpenDialog(true))
        }
      });
  }

  const addToReview = () => {
    axios.patch(`${LOCALHOST}book/userBook`, {
      "book": BookInfo.bookID,
      "rating": strValue || 0,
      "review": revValue || ""
    }, { withCredentials: true, credentials: 'include' })
      .then(function (response) {
        response.data === 222 ? setDialogState(2) : setDialogState(3)
        dispatch(setOpenDialog(true))
        console.log(response);
        // window.location.reload()
        // setReviewInfo({ review: [...ReviewInfo.review, revValue] })
      })
      .catch(function (error) {
        if (error.response.data === 555) {
          setDialogState(3)
          dispatch(setOpenDialog(true))
        }
      });
  }

  var list = ReviewInfo.review.map((data, index) => {
    if (data.review === "") return;
    return (
      <div className="booksofauthor" key={index}>
        <img
          className=" bookimg"
          alt=""
          src="https://www.clipartmax.com/png/middle/72-722180_these-are-some-cats-avatar-i-drew-during-my-free-time-black.png"
          width="70px"
          height="70px" />

        <div className="selectandrating">
          <div>
            <StarRating stars={data.rating} />
          </div>
        </div>
        <div className="rating">
          <h6>{data.user.fName} {data.user.lName}</h6>
          <strong>{data.review}</strong>
          <br />
          <strong>
            {!isNaN(Date.parse(data.created_at)) && !(Number.isInteger(data.created_at)) ?
              new Date(data.created_at).toLocaleString()
              : data.created_at}
          </strong>
        </div>

        <hr></hr>
      </div>)
  })

  return (
    <Box sx={{
      width: "100%", margin: 0,
      overflow: "hidden",
      backgroundSize: 'cover',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${Image})`,
      fontFamily: 'Courier New',
      fontWeight: 600
    }}
    >
      <div className='parentContainer'>
        <div>
          <div className="cardAndrateAndselect">
            <Card bookname={BookInfo.bookName} photo={BookInfo.image} />
            <div className="selectt">

              <button
                onClick={() => { addToReview() }}
                className={"mainbtn"}
                disabled={disable}
              >
                Add Review <AddIcon className={"mainicon"} />
              </button>
            </div>
            <div className="ratingg" >

              <Box
                sx={{
                  width: 200,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Rating
                  sx={{ marginLeft: "10px" }}
                  name="hover-feedback"
                  size="large"
                  required
                  value={strValue}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setStrValue(newValue);
                    if (strValue !== 0 && revValue !== "") setDisable(false); else setDisable(true);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {strValue !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : strValue]}</Box>
                )}
              </Box>
              <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                required
                rows={4}
                onChange={
                  handleRevChange
                }
                sx={{ marginLeft: "10px", width: "420px", marginTop: "10px" }}
              />

            </div>
          </div>
          <div className="beside">
            <h6 className="authorname"> Author: {BookInfo.author_fname}  {BookInfo.author_lname}</h6>
            <h5 className="category"> {BookInfo.category}</h5>
            <div className="rating">
              <StarRating stars={BookInfo.stars} /> <span className="userRatingnum">  {BookInfo.rate} Average Rating</span>
            </div>
            <button
              onClick={() => { addToList() }}
              className={"addToListBtn"}
            >
              Add To List <AddIcon className={"mainicon"} />
            </button>
            <div className="description">
              <p>
                {BookInfo.description}
              </p>
            </div>
          </div>
        </div>
        <div className="authorbooks">
          <h5 className="s">Reviews</h5>
          <>{list}</>
        </div>
      </div>
      {openDialog && DialogState === 1 ?
        <MsgDialogs title="Add To List" msg={"Book Added Successfully"} state={1} />
        : openDialog && DialogState === 2 ?
          <MsgDialogs title="Add Review" msg={"Review Added Successfully"} state={1} />
          : openDialog && DialogState === 3 ?
            <MsgDialogs title="Add Review" msg={"Review Failed! Book not listed in your list"} state={2} />
            : openDialog && DialogState === 4 ?
              <MsgDialogs title="Add To List" msg={"Book in list"} state={2} />
              : ""}
    </Box>
  );

};




