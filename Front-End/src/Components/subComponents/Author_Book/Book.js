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
    reviews: '',
    rate: '',
    image: '',
    stars: 0,

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
          reviews: data.description,
          rate: data.rating,
          image: data.img,
          stars: 4
        })

      )
  }, [])

  console.log("First Nmae: " + BookInfo.author_fname);





  // console.log("bbbbb  ", BookInfo);

  return (
  <Box sx={{ width:"100%",margin:0 ,
            overflow:"hidden", 
            backgroundSize:'cover', 
            backgroundRepeat:"no-repeat", 
            backgroundPosition:"center" ,
            backgroundImage: `url(${Image})`,
            fontFamily: 'Courier New',
            fontWeight:600}}>
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
              {BookInfo.reviews}
            </p>
          </div>
        </div>
      </div>
      <div className="authorbooks">
        <h5 className="s">Reviews</h5>
        {/* <>{listt}</> */}
      </div>
    </div>
    </Box>
  );

};




