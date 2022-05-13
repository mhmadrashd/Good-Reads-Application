import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchPanel from './SearchPanel';
import UserLogoComponent from './UserLogoComponent';
import booklogo from '../assets/images/booklogo.jpg';
import BeforeLogging from './BeforeLogging';
let loggedIn = false;
const NavComponent = () => {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className=" sticky-top nav-shadow  "
      >
        <div className="d-flex  align-content-around navbar">
          <LinkContainer to="">
            <Navbar.Brand>
              <Image
                width={70}
                height={40}
                roundedCircle
                className="App-logo "
                src={booklogo}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Authors</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Categories</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Books</Nav.Link>
              </LinkContainer>
            </Nav>
            {loggedIn ? (
              <Container>
                <SearchPanel />
              </Container>
            ) : null}
          </Navbar.Collapse>
          {loggedIn ? <UserLogoComponent /> : <BeforeLogging />}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
      </Navbar>
    </>
  );
};

export default NavComponent;
