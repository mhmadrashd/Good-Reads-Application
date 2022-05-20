import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from 'axios';
const URLServer = "http://localhost:3000";

function AddAuthorModal(probs) {

  //this state used to get image from input type=(file) to upload it to firebase
  const [imageUpload, setImageUpload] = useState(null);

  //this state used to load image to img element after choose image

  // initial values for formik 
  const initialValues = {
    fName: '',
    lName: '',
    DOB: '',
    info:'',
    img: ''
  }

  // to handle the submit action with formik
  const onSubmit = values => {
    console.log(values);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/author/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          axios.post(`${URLServer}/author`, {
            fName: values.fName,
            lName: values.lName,
            DOB: values.DOB,
            info:values.info,
            img: url
          })
            .then((response) => {
              probs.onClick();
              window.location.reload()
              console.log(response);
            }).catch((error) => {
              console.log(error);
            })
        })
    });
    probs.onClick();
  }

  //to handle the validations on the inputs with formik
  const validate = values => {
    let errors = {};
    if (!values.fName) {
      errors.fName = '*Required ..Please Enter First Name';
    }
    if (!values.lName) {
      errors.lName = '*Required ..Please Enter Last Name';
    }
    if (!values.DOB) {
      errors.DOB = '*Required ..Please select date of birth';
    }
    return errors;
  }

  // creating the formik object
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div>
      <Modal show={probs.state} onHide={probs.onClick} size="lg">
        <Modal.Header className="px-4" closeButton>
          <Modal.Title className="ms-auto">Add Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>

            <Form.Group as={Row} className="mb-3" controlId="firstName">
              <Col sm={2}>
                <Form.Label>First Name</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter the Author First Name"
                  autoComplete='off'
                  name='fName'
                  // value={addedAuthor.fName}
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                  autoFocus />

                {formik.errors.fName ? (<span className='error'>{formik.errors.fName}</span>) : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="lastName">
              <Col sm={2}>
                <Form.Label>Last Name</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter the Author Last Name"
                  autoComplete='off'
                  name='lName'
                  value={formik.values.lName}
                  onChange={formik.handleChange}
                />
                {formik.errors.lName ? (<span className='error'>{formik.errors.lName}</span>) : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="DOB">
              <Col sm={2}>
                <Form.Label>Date of Birth</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  name='DOB'
                  value={formik.values.DOB}
                  onChange={formik.handleChange}
                />
                {formik.errors.DOB ? (<span className='error'>{formik.errors.DOB}</span>) : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="lastName">
              <Col sm={2}>
                <Form.Label>Information</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the Author Info"
                  autoComplete='off'
                  name='info'
                  value={formik.values.info}
                  onChange={formik.handleChange}
                />
                {/* {formik.errors.lName ? (<span className='error'>{formik.errors.lName}</span>) : null} */}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="image">
              <Col sm={2}>
                <Form.Label>Image</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="file"
                  calssname="inputfile"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
              </Col>
            </Form.Group>

            <div className='text-center'>
              <Button variant="outline-dark" type="submit">
                Add Author
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddAuthorModal;