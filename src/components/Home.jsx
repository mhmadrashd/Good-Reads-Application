import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../App.css';
import SideBar from './SideBar';
let loggedIn = true;

export default function HomeComponent() {
  return (
    <>
      {loggedIn ? (
        <div className=" d-flex position-fixed">
          <SideBar />
        </div>
      ) : null}
      <Container className="bg">
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
