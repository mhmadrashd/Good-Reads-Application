import React , {Component} from 'react';
import {Table} from "reactstrap";
import Link from "react-router-dom/es/Link";
import '../assets/css/Categories.css'
import { LOCALHOST } from '../GLOBAL';


function GetCategories() {
    return fetch(LOCALHOST + 'categories/')
        .then(response =>
        response.json())
  }
/******************************************* */  
export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state={
            categories : [],
        };
    }

    componentDidMount(){
      
      GetCategories()
      .then(data => {
        this.setState({
            categories: data,
        })
      });
    }

    render() {
        
        return (
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

        );
    }
}
