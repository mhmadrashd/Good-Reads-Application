import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../author/Card';

import './Author.css'

const LOCALHOST = 'http://localhost:3000/';



export default function Author() {

  const { id } = useParams();

  console.log("ID "+id);


  const [AuthorInfo, setAuthorInfo] = useState({
       
    ID: id,
    fname: '',
    lname: '',
    dob: '',
    info: '',
    image: '',

  });


  useEffect(() => {
    fetch("http://localhost:3000/author/" + id)
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => 

         setAuthorInfo({
        ID: data._id,
        fname: data.fName,
        lname: data.lName,
        dob: data.DOB,
        info: data.info,
        image: data.img,
      })

    )
  },[])

console.log( "First Nmae: " + AuthorInfo.fname);

 



  // console.log("bbbbb  ", AuthorInfo);

  return (

    <div class="parentContainer">
      <div>
        <div class="cardAndrateAndselect">
          <Card bookname={AuthorInfo.fname + AuthorInfo.lname} photo={AuthorInfo.image} />
          
          
        </div>
        <div class="beside">
          {/* <h3 class="bookname"> {AuthorInfo.bookName}</h3> */}
          <h6 class="authorname"> {AuthorInfo.fname}  {AuthorInfo.lname}</h6>
          <h6 class="category"> {AuthorInfo.dob}</h6>
          <div class="rating">
          </div>
          <div class="description">
            <p>
              {AuthorInfo.info}
            </p>
          </div>
        </div>
      </div>
      <div class="authorbooks">
        <h5 class="s">Author's Books</h5>
        {/* <>{listt}</> */}
      </div>
    </div>

    
  );

};




