import React from "react";
import NavComp from "./Navcom";
import Footer from "./Footer";
import Card from "./Card";
import "./Book.css";
import StarRating from "./Rating";
import Select from "./Select";
import Content from "./Content_Less";
function Book() {
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
          <h1>Book Name</h1>
          <a>By Author</a>
          <br></br>
          <a>Category Name</a>
          <br></br>
            <StarRating/>

        </div>
        <Content />
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Book;
