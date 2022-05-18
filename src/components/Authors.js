import React,{Component} from 'react';
import { Card,CardBody,CardTitle} from 'reactstrap';
import {Link} from "react-router-dom";
import '../assets/css/Authors.css'
import { LOCALHOST } from '../GLOBAL';
import Navcomp from './Navcom';
import Footer from './Footer';

function GetAuthors() {
  return fetch(LOCALHOST+'authors/')
      .then(response => response.json())
}

class Authors extends Component {

  constructor(props) {
    super(props);
    this.state={
        authors : [],
    };
  }

  componentDidMount(){

    
    GetAuthors()
    .then(data => { this.setState({ authors: data,});
    });
  }

  render() {
    return (
        <div>
            <Navcomp></Navcomp>
            <div className="card">
        <center>
          <h2 style={{'color':'gray'}}>Authors Names</h2> 
          
          {this.state.authors.map((author , index) =>
            <div className="thumb" key={index}>
            <Card>
              <img style={{width:250, height:250}}
                   src={LOCALHOST+author.photo}
                   alt="Card image cap"/>
              <CardBody>
                <CardTitle>
                  <Link to={'/authors/'+author._id}>
                    <h3> {author.firstName + " " + author.lastName} </h3>
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
            </div>
          )}
          </center>
        </div>
        <Footer></Footer>
        </div>
    );
  }
}

export default Authors;
