import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import './category.css'

export default function Card(props) {
  return (
    <div class="Card">
      <MDBCard style={{ width: '23rem' }}>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' />
        <MDBCardBody>
          <MDBCardText>
            <a> {props.name}</a>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}