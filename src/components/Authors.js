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
    .then(data => {
    data.forEach(element => {
        console.log(element);
    });
        
        this.setState({ authors: data,});
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
            <div className="Card" key={index}>
            <Card>
             <center>
             <img style={{width:500, height:400}}
                //    src={LOCALHOST+author.photo}
                src = "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg"
                   alt="Card image cap"/>
             </center>
              <CardBody>
                <CardTitle>
                  <Link to={'/authors/'+author._id}>
                    <h3> {author.firstname + " " + author.lastname} </h3>
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
            </div>
          )}
          </center>
        </div>
        {/* <Footer></Footer> */}
        </div>
    );
  }
}

export default Authors;
