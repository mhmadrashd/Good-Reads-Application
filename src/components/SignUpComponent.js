import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const SignUpComponent = ({ clicked, handleSignUpClose }) => {
  return (
    <Modal show={clicked} onHide={handleSignUpClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create a free account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>FirstName</Form.Label>
            <Form.Control type="text" placeholder="FirstName" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>LastName</Form.Label>
            <Form.Control type="text" placeholder="FirstName" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control className="" type="file" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSignUpClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSignUpClose}>
          SignUp
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SignUpComponent;
