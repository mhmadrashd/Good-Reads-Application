import React , {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Table} from "reactstrap";
// import Link from "react-router-dom/es/Link";
// import Link from "react-router-dom/es/Link";

import '../assets/css/Categories.css'
import { LOCALHOST } from '../GLOBAL';
import Footer from './Footer';
import Navcomp from './Navcom';

const Link = require("react-router-dom").Link;

function GetCategories() {
    return fetch(LOCALHOST + 'categories/')
        .then(response =>
        response.json())
  }
export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state={
            categories : [],
        };
    }

    GetData(){
      
    //Handle cookies Here

      GetCategories()
      .then(data => {
        this.setState({
            categories: data,
        })
      });
    }

    render() {
        
        return (
            <div>
              <Navcomp></Navcomp>
            <div className="card" style={{'textAlign': "center"}}>
              
              <Table>
                <thead>
                <tr>
                  <h2 style={{'color':'gray'}}>Categories Names</h2> 
                  
                </tr>
                </thead>
              <thead>
              {this.state.categories.map((category , index) =>
                  <tr>
                      <th key={index}>
                        <Link to={"/categories/" + category._id + "/" + category.name}>
                          {category.name}
                        </Link>
                      </th>
                  </tr>)}
              </thead>
            </Table>
        </div>
        <Footer></Footer>
        </div>

        );
    }
}
