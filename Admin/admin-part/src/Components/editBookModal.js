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


function EditBookModal(probs) {
  //this state used to get image from input type=(file) to upload it to firebase
  const [imageUpload, setImageUpload] = useState(null);

  //this state used to load image to img element after choose image
  const [imageUrls, setImageUrls] = useState([]);

  //to upload image to the firebase
  const uploadFile = () => {
    //if no image uploaded return
    if (imageUpload == null) return;
    // upload image to storage in firebase to spacific path
    // V4 this uuid to generate unique name
    const imageRef = ref(storage, `images/book/${imageUpload.name + v4()}`);
    /*
    * this used to uplaod image as bytes and then 
    * get url from firebase respone
    * get this url and send it with (admin/user/book/author) data to mongoDB
    * set this image to element img preview in upload page
    */
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        //send this url with data
        console.log(url)
        //set image to img element in page
        setImageUrls(() => [url]);
      });
    });
  };

  const item = probs.item;
  // console.log(item);

  // initial values for formik
  const initialValues = {
    bookName: item.title,
    category: item.category,
    author: item.auhtor,
    image: item.img
  }

  //to handle the submit action with formik
  const onSubmit = values => {
    // console.log(values);
    // axios.patch(`http://localhost:3000/books?${item._id}` , values)
    uploadFile();
    probs.onClick();
  }

  //to handle the validations on the inputs with formik
  const validate = values => {
    let errors = {};
    if (!values.bookName) {
      errors.bookName = '*Required .. Please Enter Book Name';
    }
    if (!values.category) {
      errors.category = '*Required .. Please Enter Category Name';
    }
    if (!values.author) {
      errors.author = '*Required .. Please Enter Author';
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
      <Modal show={probs.state} onHide={probs.onClick} size="lg">
        <Modal.Header className="px-4" closeButton>
          <Modal.Title className="ms-auto">Edit Book</Modal.Title>
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
                  autoComplete='off'
                  name='bookName'
                  value={formik.values.bookName}
                  onChange={formik.handleChange}
                  autoFocus />
                {formik.errors.bookName ? (<span className='error'>{formik.errors.bookName}</span>) : null}
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
                  {React.Children.toArray(probs.categriesData.map((item) => {
                    return <option>{item['Name'].toString()}</option>
                  }))}
                </Form.Select>
                {formik.errors.category ? (<span className='error'>{formik.errors.category}</span>) : null}
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
                  {React.Children.toArray(probs.authorData.map((item) => {
                    return <option>{item['fName'].toString() + ' ' + item['lName'].toString()}</option>
                  }))}
                </Form.Select>
                {formik.errors.author ? (<span className='error'>{formik.errors.author}</span>) : null}
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
                Edit Book
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditBookModal;