import React from 'react';
import NavComp from './Navcom'

import Footer from './Footer';
import Card from './Card';
import '../assets/css/category.css'
import StarRating from './Rating'


// var list=[1,2,3,4]
//   var listt=list.map((li)=>{
    
//   return <Card></Card>

//   })

function Category() {
    var list=[1,2,3,4,5,6]
    var listt=list.map((li)=>{
      
    return <Card ></Card>
  
    })
  
    return (
      
    <div>
        <NavComp></NavComp>
        <div class='list'>
        <>{listt}</>
        </div>
        <Footer></Footer>
    </div>
      
    );
  }
  
  export default Category;
  