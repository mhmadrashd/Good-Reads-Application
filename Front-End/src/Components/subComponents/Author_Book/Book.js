import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './Select';
import StarRating from './Rating'
import './Book.css'
import { Box } from '@mui/material';
import Image from './Images/LibararyBG.jpg'
const LOCALHOST = 'http://localhost:3000/';



export default function Book() {

  const { id } = useParams();

  console.log("ID " + id);


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



  useEffect(() => {
    fetch("http://localhost:3000/book/" + id)
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





  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/book/userBookBID/" + id)
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data => {

        // console.log("Data : " + data._id);
        setReviewInfo({
          review: data
        })

      }

      )





  }, [])




  console.log("First Nmae: " + BookInfo.author_fname);

  console.log("Review " + ReviewInfo.review);






  // console.log("bbbbb  ", BookInfo);

  var list = ReviewInfo.review.map((data) => {

    return (
      <div class="booksofauthor"><img class=" bookimg" src="https://www.clipartmax.com/png/middle/72-722180_these-are-some-cats-avatar-i-drew-during-my-free-time-black.png" width="70px" height="70px"></img>

        <div class="selectandrating">
          <div><Select /></div>
          <div><StarRating stars={data.rating} /></div>
        </div>
        <div class="rating">
          <h6>{data.user.fName} {data.user.lName}</h6>

          <strong>{data.review}</strong>
          <br></br>
          <strong>{data.created_at}</strong>

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
    }}>
      <div className='parentContainer'>
        <div>
          <div className="cardAndrateAndselect">
            <Card bookname={BookInfo.bookName} photo={BookInfo.image} />
            <div className="selectt">
              <Select />
            </div>
            <div className="ratingg">
              <StarRating />
            </div>
          </div>
          <div className="beside">
            <h3 className="bookname"> {BookInfo.bookName}</h3>
            <h6 className="authorname"> {BookInfo.author_fname}  {BookInfo.author_lname}</h6>
            <h6 className="category"> {BookInfo.category}</h6>
            <div className="rating">
              <StarRating stars={BookInfo.stars} /> <span className="userRatingnum">  {BookInfo.rate} Average Rating</span>
            </div>
            <div className="description">
              <p>
                {BookInfo.description}
              </p>
            </div>
          </div>
        </div>

        <div className="authorbooks">
          <h5 className="s">Reviews</h5>
          {/* <>{listt}</> */}

          <div class="authorbooks">
            <h5 class="s">Reviews</h5>
            <>{list}</>

          </div>
        </div>
      </div>
    </Box>
  );

};




