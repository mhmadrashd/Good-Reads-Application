import React, {Component} from 'react';
import {Progress, CardBody, Input, ListGroup,
ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import {Link} from "react-router-dom";
import { LOCALHOST } from '../GLOBAL';

function AddReview(data) {
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

function GetReview(data) {
  return fetch(LOCALHOST + 'review/'+data)
      .then(response =>
      response.json())
}

function GetBook(data) {
  return fetch(LOCALHOST + 'books/'+data)
      .then(response =>
      response.json())
}

function SetStatusReading(data) {
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

 class Book extends Component {
 
   constructor(props) {
     super(props);
     this.state={
       currentBook : '',
       bookId : this.props.match.params.id,
       author: '',
       category: '',
       reviews: [],
       newReview: '',
     };
   }
 
   GetData(){
     
    //Handle cookies Here

     GetBook(this.state.bookId).then((data) => {
       GetReview(this.state.bookId).then((reviews)=>{
         console.log(reviews);
         this.setState({
           currentBook: data,
           author: data.authorId,
           category: data.categoryId,
           reviews: reviews,
         });
       })
     })
   }
 
   handle_update_review = (event) => {
     this.setState({
       newReview: event.target.value,
     });
   }
 
   handle_status_reading = (event) => {
     console.log(event.target.value);
     SetStatusReading({
       'readingStatus': event.target.value,
       'bookId': this.state.bookId,
      //  'userId': new Cookies().get("currentUser")._id,
     }).then((data)=>{
       console.log(data);
     })
   }
 
   handle_add_review = () => {
     // check if review just space or blank
     if((/^ *$/.test(this.state.newReview)) || (/^$/.test(this.state.newReview))) {
         alert("please enter valid review");
     }
     else {
        //  let currentUser = new Cookies().get('currentUser');
         AddReview({
         'body': this.state.newReview,
        //  'userId': currentUser._id,
         'bookId': this.state.bookId,
         }).then(data => {
             console.log(data);
             GetReview(this.state.bookId).then((reviews)=> {
               this.setState({
                 newReview : "",
                 reviews: reviews,
             });
             alert("Review added successfully");
             })
           });
     }
   }
 
   render() {
     return (
         <div className="container-fluid">
           <div className="row BookPage">
           
             <div className="col_trainings BookImg">
               <div className="Img">
                   <img style={{width:150, height:200}}
                        src={"http://LOCALHOST:4000/"+this.state.currentBook.photo}
                        alt="Card image cap"/>
                </div>
               <div>
                 <Input width="50%" type="select"
                        name="select1" id="exampleSelect"
                        onChange={this.handle_status_reading}
                 >
                   <option value="not read">not read</option>
                   <option value="want to read">want to read</option>
                   <option value="reading">reading</option>
                   <option value="read">read</option>
                 </Input>
 
                 <CardBody>
                   <p>user eveluation</p>
                 </CardBody>
               </div>
             </div>
 
             <div className="col_downloads BookData">
               <h1>{this.state.currentBook.name}</h1>
 
               <h3>
                 <Link to={'/authors/'+this.state.author._id}>
                     {"By "+ this.state.author.firstName + " " +
                     this.state.author.lastName}
                 </Link>
               </h3>
               <h3>
                 <Link to={"categories/"+this.state.category._id+"/"+this.state.category.name}>
                     {this.state.category.name + " Category"}
                 </Link>
               </h3>
               <p>
                 <div className="text-center">{this.state.currentBook.rate+"%"}</div>
                 <Progress value={this.state.currentBook.rate}/>
               </p>
             </div>
           </div>
           <h1>Reviews</h1>
           <div stclassName="row">
             <input style={{"width":"80%"}} type="text" value={this.state.newReview}
               onChange={this.handle_update_review}
             />
             <button onClick={this.handle_add_review}>add Your Review</button>
             <ListGroup>
               {this.state.reviews.map((rev)=>
                 <ListGroupItem>
                   <ListGroupItemHeading>
                     {rev.userId.firstName + " " + rev.userId.lastName}
                   </ListGroupItemHeading>
                   <ListGroupItemText>
                     {rev.body}
                   </ListGroupItemText>
                 </ListGroupItem>
               )}
             </ListGroup>
           </div>
         </div>
     );
   }
 };
 
 export default Book;
 