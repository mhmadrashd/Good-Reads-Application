import React ,{Component} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {Link} from "react-router-dom";
import { LOCALHOST } from '../GLOBAL';
// import '../assets/css/Categories.css'
import '../assets/css/Books.css'
import Footer from './Footer';
import Navcomp from './Navcom';

function GetBooks() {
    return fetch(LOCALHOST + 'books/')
        .then(response =>
        response.json())
  }
  class Books extends Component {

  constructor(props) {
    super(props);
    this.state={
        books : [],
    };
  }

  componentDidMount(){

    //Handle cookies Here

    GetBooks()
    .then(data => {
      this.setState({
          books: data,
      });
    });
  }

  render() {
    return (
        <div className="card">
            <Navcomp></Navcomp>
        <center >
          <h2 style={{'color':'Black'}}>Books Names</h2> 
          {this.state.books.map((book , index) =>
            <div className="Card" key={index}>
            <Card >
             <center> <img style={{width:300, height:300,}}
                  //  src={LOCALHOST+book.photo}
                  src = "https://wallpaperaccess.com/full/3525258.jpg"
                   alt="Card image cap"/>
                   
                   
                   </center>
              <CardBody>
                <CardTitle>
                  <Link to={'/books/'+book._id}>
                   <h3>{book.bookName} </h3>
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
            </div>
          )}
          </center>
            {/* <Footer></Footer> */}
        </div>
    );
  }
}

export default Books;
