import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { LOCALHOST } from '../GLOBAL';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './Select';
import StarRating from './Rating'
import '../assets/css/Author.css'

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

const  GetAuthor = (data) => {
  return fetch(LOCALHOST + 'Authors/'+data)
      .then(response =>
      response.json())
}



export default function Author () {
 
  const {id} = useParams();

  console.log(id);


   const [AuthorsInfo,  setAuthorsInfo] = useState({
    AuthorID: id,
    FirstName: '',
    LastName: '',

   DateofBirth: '',
   Bio: '',

    photo: ''
    
  });

 useEffect(()=>{

    GetAuthor(AuthorsInfo.AuthorID).then((data) => {
    console.log(",.,.", );
  console.log("zzzzzzzzz  ", data);
   

  

     setAuthorsInfo({
        AuthorID: data._id,
        FirstName: data.firstname,
        LastName: data.lastname,
    
       DateofBirth: data.DOB,
       Bio: data.bio,
    
        photo: data.photo
    });
  })



 },[]);

 

 
   console.log("bbbbb  ", AuthorsInfo);
  
     return (
       
        <div class="parentContainer">
        
        <div><Card name={AuthorsInfo.FirstName} />
            <div class="beside">
                <h3 class="i">{AuthorsInfo.FirstName } {AuthorsInfo.LastName}</h3>
                <small>{AuthorsInfo.DateofBirth}</small>
                <div class="description"><p>

                    {AuthorsInfo.Bio}
                </p>
                
                </div>
            
            </div>
        </div>
        <div class="authorbooks" >
            <h5 class="s">Author Books</h5>
            {/* <>{listt}</> */}
        </div>
    </div>
     );
   
 };
 
 


