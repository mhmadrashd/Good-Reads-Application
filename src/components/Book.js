import React, { Component } from "react";
import NavComp from "./Navcom";
import Footer from "./Footer";
import Card from "./Card";
import "../assets/css/Book.css";
import StarRating from "./Rating";
import Select from "./Select";
import Content from "./Content_Less";
import { LOCALHOST } from "../GLOBAL";

function GetBook(data) {
  return fetch(LOCALHOST + "books/" + data).then((response) => response.json());
}

function GetReview(data) {
  return fetch(LOCALHOST + "review/" + data).then((response) =>
    response.json()
  );
}

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: "",
      bookId: this.props.match.params.id,
      author: "",
      category: "",
      reviews: [],
    
    };
  }

  GetData() {
    GetBook(this.state.bookId).then((data) => {
      GetReview(this.state.bookId).then((reviews) => {
        console.log(reviews);
        this.setState({
          currentBook: data,
          author: data.authorId,
          category: data.categoryId,
          reviews: reviews,
        });
      });
    });
  }

  render() {
    return (
      <div>
        <NavComp></NavComp>

        <div class="body">
          <div class="container">
            <Card />
            <div class="read">
              <Select />
              <StarRating />
            </div>
          </div>
          <div>
            {/* <h1>Book Name</h1> */}
            {this.state.currentBook}
            {/* <a>By Author</a> */}
            {this.state.author}
            <br></br>
            {/* <a>Category Name</a> */}
            {this.state.category}
            <br></br>
            <StarRating />
          </div>
          <Content />
        </div>

        <Footer></Footer>
      </div>
    );
  }
}

export default Book;

// function Book() {
//   return (

//   );
// }

// export default Book;

// function GetBooks() {
//   return fetch(LOCALHOST + 'Books/')
//       .then(response =>
//       response.json())
// }
// export default class Books extends Component {

//   constructor(props) {
//       super(props);
//       this.state={
//           Books : [],
//       };
//   }

//   componentDidMount(){

//     GetBooks()
//     .then(data => {
//       this.setState({
//           Books: data,
//       })
//     });
//   }

//   render() {

//       return (
//         <div>
//         <NavComp></NavComp>

//         <div class="body">
//           <div class="container">
//             <Card />
//             <div class="read">
//               <Select />
//               <StarRating />
//             </div>
//           </div>
//           <div>
//             <h1>Book Name</h1>
//             <a>By Author</a>
//             <br></br>
//             <a>Category Name</a>
//             <br></br>
//               <StarRating/>

//           </div>
//           <Content />
//         </div>

//         <Footer></Footer>
//       </div>

//       );
//   }
// }
