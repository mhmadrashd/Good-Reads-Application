import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import './category.css'
import { Bloodtype } from '@mui/icons-material';

export default function Card(props) {
  return (
    <div class="Card">
      <MDBCard style={{ width: '23rem' }}>
        <MDBCardImage src={props.photo} alt='...' position='top' />
        <MDBCardBody>
          <MDBCardText>
            <strong>
                <a> {props.bookname}</a>
            </strong>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}