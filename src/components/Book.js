import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { LOCALHOST } from '../GLOBAL';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './Select';
import StarRating from './Rating'
import '../assets/css/Book.css'

const AddReview = (data) => {
  console.log(data);
  return fetch(LOCALHOST + 'review/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data will be send later');
  })
}

const GetReview = (data) => {
  return fetch(LOCALHOST + 'review/'+data)
      .then(response =>
      response.json())
}

const  GetBook = (data) => {
  return fetch(LOCALHOST + 'Book/'+data)
      .then(response =>
      response.json())
}

const  SetStatusReading = (data) => {
  console.log(data);
  return fetch(LOCALHOST + 'users/current/books/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // "Authorization": new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error');
  })
}
const Fn =  ()=>{
  const {id} = useParams();
  console.log("ID........" + id);
  return id;
}

export default function Book () {
 
  const {id} = useParams();

  console.log(id);


   const [BookInfo, setBookInfo] = useState({
    bookID: '',
    bookName: '',
    bookId: id,
    author: '',
    category: '',
    reviews: [],
    rate: '',
    newReview: '',
    photo: ''
    
  });

 useEffect(()=>{

  GetBook(BookInfo.bookId).then((data) => {
    console.log(",.,.", data.bookName);
  console.log("zzzzzzzzz  ", data);
   

  

    setBookInfo({
      bookID: data._id,
      bookName: data.title,
      author_fname: data.auhtor.fName,
      author_lname: data.auhtor.lName,

      category: data.category.Name,
      reviews: data.description,
      rate: data.rating,
      image: data.img
    });
  })



 },[]);
 const listt = BookInfo.reviews.map((li) => {
  return (
    <div class="booksofauthor">
      <img
        class=" userimg"
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        width="70px"
        height="70px"
      ></img>

      {li.username}
      <div class="userRating">
        <StarRating /> <span class="userRatingnum">{li.rating}</span>{' '}
      </div>

      <hr></hr>
    </div>
  );
});
 

 
   console.log("bbbbb  ", BookInfo);
  
     return (
       
      <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card bookname= {BookInfo.bookName} photo={BookInfo.photo} />
          <div class="selectt">
            <Select />
          </div>
          <div class="ratingg">
            <StarRating />
          </div>
        </div>
        <div class="beside">
          <h3 class="bookname"> {BookInfo.bookName}</h3>
          <h6 class="authorname"> {BookInfo.author_fname} + {BookInfo.author_lname}</h6>
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
        <>{listt}</>
      </div>
    </div>
     );
   
 };
 
 


