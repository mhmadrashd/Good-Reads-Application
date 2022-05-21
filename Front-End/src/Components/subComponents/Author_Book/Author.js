import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Select from './Select';
import StarRating from './Rating'
import './Author.css'
import { Box } from '@mui/material';
import Image from './Images/LibararyBG.jpg'
const LOCALHOST = 'http://localhost:3000/';

// http://localhost:3000/book/authBook/:id

export default function Author() {

  const { id } = useParams();

  console.log("ID " + id);


  const [AuthorInfo, setAuthorInfo] = useState({

    ID: id,
    fname: '',
    lname: '',
    dob: '',
    info: '',
    image: '',

  });

  const [AuthorBook, setAuthorBook] = useState({

    Books: []
 
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
  }, [])


  useEffect(() => {
    fetch("http://localhost:3000/book/authBook/" + id)
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data =>{

        // console.log("Data : " + data._id);
        setAuthorBook({
          Books: data
        })

        }

      )

      



  }, [])

  console.log("First Nmae: " + AuthorInfo.fname);


  // console.log("bbbbb  ", AuthorInfo);
  var list = AuthorBook.Books.map((data)=>{

    return (
      <div  class="booksofauthor"><img class=" bookimg" src={data.img} width="70px" height="70px"></img> 
      
      <div class="selectandrating">
          <div><Select/></div>
      <div><StarRating stars={data.rating}/></div>
      </div>
      <div class="rating">
          <h6>{data.title}</h6>
          <h6>{data.category.Name}</h6>

          
     
          <br></br>
          <strong>{data.created_at}</strong>
          
      </div>
      
       <hr></hr>
       </div>)


  })
  return (
    <Box sx={{ width:"100%",margin:0 ,
    overflow:"hidden", 
    backgroundSize:'cover', 
    backgroundRepeat:"no-repeat", 
    backgroundPosition:"center" ,
    backgroundImage: `url(${Image})`,
    fontFamily: 'Courier New',
    fontWeight:600}}>
    <div className='parentContainer' >
      <div>
        <div class="cardAndrateAndselect">
          <Card bookname={AuthorInfo.fname + AuthorInfo.lname} photo={AuthorInfo.image} />


        </div>
        <div class="beside">
          {/* <h3 class="bookname"> {AuthorInfo.bookName}</h3> */}
          <h6 class="authorname"> {AuthorInfo.fname}  {AuthorInfo.lname}</h6>
          <h6 class="category"> {!isNaN(Date.parse(AuthorInfo.dob)) 
                                && !(Number.isInteger(AuthorInfo.dob)) ?
                                new Date(AuthorInfo.dob).toDateString()
                                : AuthorInfo.dob} </h6>

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
        <>{list}</>
      </div>
    </div>

    </Box>
  );

};



