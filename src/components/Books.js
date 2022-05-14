import React ,{Component} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {Link} from "react-router-dom";
import { LOCALHOST } from '../GLOBAL';
import '../assets/css/Categories.css'
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
        <center>
          <h2 style={{'color':'gray'}}>Books Names</h2> 
          {this.state.books.map((book , index) =>
            <div className="thumb" key={index}>
            <Card>
              <img style={{width:300, height:310}}
                   src={LOCALHOST+book.photo}
                   alt="Card image cap"/>
              <CardBody>
                <CardTitle>
                  <Link to={'/books/'+book._id}>
                   <h3>{book.name} </h3>
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
            </div>
          )}
          </center>
        </div>
    );
  }
}

export default Books;
