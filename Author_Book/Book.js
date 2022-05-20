import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../author/Card';
import Select from '../author/Select';
import StarRating from '../author/Rating'
import './Book.css'

const LOCALHOST = 'http://localhost:3000/';



export default function Book() {

  const { id } = useParams();

  console.log("ID "+id);


  const [BookInfo, setBookInfo] = useState({
       
        bookID: id,
        bookName: '',
        author_fname: '',
        author_lname: '',
        category: '',
        reviews: '',
        rate: '',
        image: ''

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
        image: data.img
      })

    )
  },[])

console.log( "First Nmae: " + BookInfo.author_fname);

 



  // console.log("bbbbb  ", BookInfo);

  return (

    <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card bookname={BookInfo.bookName} photo={BookInfo.image} />
          <div class="selectt">
            <Select />
          </div>
          <div class="ratingg">
            <StarRating />
          </div>
        </div>
        <div class="beside">
          <h3 class="bookname"> {BookInfo.bookName}</h3>
          <h6 class="authorname"> {BookInfo.author_fname}  {BookInfo.author_lname}</h6>
          <h6 class="category"> {BookInfo.category}</h6>
          <div class="rating">
            <StarRating /> <span class="userRatingnum">  {BookInfo.rate} ratings</span>
          </div>
          <div class="description">
            <p>
              {BookInfo.reviews}
            </p>
          </div>
        </div>
      </div>
      <div class="authorbooks">
        <h5 class="s">Reviews</h5>
        {/* <>{listt}</> */}
      </div>
    </div>

    
  );

};




