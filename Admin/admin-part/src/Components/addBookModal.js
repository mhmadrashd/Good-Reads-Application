import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from 'axios';
const URLServer = "http://localhost:3000";

function AddBookModal(probs) {

  //this state used to get image from input type=(file) to upload it to firebase
  const [imageUpload, setImageUpload] = useState(null);

  //this state used to load image to img element after choose image
  const [imageUrls, setImageUrls] = useState([]);

  //initial values for formik 
  const initialValues = {
    bookName: '',
    category: '',
    author: '',
    image: ''
  }

  // to handle the submit action with formik
  const onSubmit = values => {
    // values.image=
    console.log(values);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/book/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          values.image = url;
          axios.post(`${URLServer}/book`, values)
            .then((response) => {
              console.log(response);
            }).catch((error) => {
              console.log(error);
            })
          return url;
        })
    });
    probs.onClick();
  }

  // to handle the validations on the inputs with formik
  const validate = values => {
    let errors = {};
    if (!values.bookName) {
      errors.bookName = '*Required .. Please Enter Book Name';
    }
    if (!values.category) {
      errors.category = '*Required .. Please select Category Name';
    }
    if (!values.author) {
      errors.author = '*Required .. Please select Author Name';
    }
    return errors;
  }

  // creating the formik object
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <div>
      <Modal show={probs.state} onHide={probs.onClick} size="lg" >
        <Modal.Header className="px-4" closeButton>
          <Modal.Title className="ms-auto">Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="bookName">
              <Col sm={2}>
                <Form.Label>Book Name</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter the Book Name"
                  autoComplete='off'
                  name='bookName'
                  // value={addedBook.bookName}
                  value={formik.values.bookName}
                  onChange={formik.handleChange}
                  autoFocus />
                {formik.errors.bookName ? (<span className='error'>{formik.errors.bookName}</span>)
                  : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="category">
              <Col sm={2}>
                <Form.Label>Category</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Select name='category'
                  value={formik.values.category}
                  onChange={formik.handleChange}>
                  <option></option>
                  {React.Children.toArray(probs.categriesData.map((item) => {
                    return <option>{item['Name'].toString()}</option>
                  }))}
                </Form.Select>
                {formik.errors.category ? (<span className='error'>{formik.errors.category}</span>)
                  : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="author">
              <Col sm={2}>
                <Form.Label>Author</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Select name='author'
                  value={formik.values.author}
                  onChange={formik.handleChange}>
                  <option></option>
                  {React.Children.toArray(probs.authorData.map((item) => {
                    return <option>{item['fName'].toString() + ' ' + item['lName'].toString()}</option>
                  }))}
                </Form.Select>
                {formik.errors.author ? (<span className='error'>{formik.errors.author}</span>) : null}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="file-upload">
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
                Add Book
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddBookModal;