import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
const LogIn = ({ clicked, handleLogInClose }) => {
  return (
    <Modal show={clicked} onHide={handleLogInClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Welcome Back</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogInClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogInClose}>
          LogIn
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogIn;
