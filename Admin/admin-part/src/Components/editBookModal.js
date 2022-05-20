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


function EditBookModal(probs) {
  //this state used to get image from input type=(file) to upload it to firebase
  const [imageUpload, setImageUpload] = useState(null);

  //this state used to load image to img element after choose image

  const item = probs.item;

  // initial values for formik
  const initialValues = {
    title: item.title,
    category: (probs.categriesData.filter(category => category._id === item.category))[0]["Name"],
    auhtor:(probs.authorData.filter(author => author._id === item.auhtor))[0]['fName']+" "+(probs.authorData.filter(author => author._id === item.auhtor))[0]['lName'],
    description:item.description,
    img:item.img
  }

  
  //to handle the submit action with formik
  const onSubmit = values => {
    // const varx  = {
    //   title: values.title,
    //           category: (probs.categriesData.filter(category => category.Name=== values.category))[0]["_id"],
    //           auhtor:(probs.authorData.filter(author => `${author.fName} ${author.lName}`=== values.auhtor))[0]["_id"],
    //           description: values.description
    // }
    // console.log(varx);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/author/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          axios.patch(`${URLServer}/book/${item._id}`, {
            title: values.title,
            category: (probs.categriesData.filter(category => category.Name=== values.category))[0]["_id"],
            auhtor:(probs.authorData.filter(author => `${author.fName} ${author.lName}`=== values.auhtor))[0]["_id"],
            description: values.description,
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
    if (!values.title) {
      errors.title = '*Required .. Please Enter Book Name';
    }
    if (!values.category) {
      errors.category = '*Required .. Please Enter Category Name';
    }
    if (!values.auhtor) {
      errors.auhtor = '*Required .. Please Enter Author';
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
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Col sm={2}>
                <Form.Label>Book Name</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  name='title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  autoFocus />
                {formik.errors.title ? (<span className='error'>{formik.errors.title}</span>) : null}
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
                <Form.Select name='auhtor'
                  value={formik.values.auhtor}
                  onChange={formik.handleChange}>
                  {React.Children.toArray(probs.authorData.map((item) => {
                    return <option>{item['fName'].toString() + ' ' + item['lName'].toString()}</option>
                  }))}
                </Form.Select>
                {formik.errors.auhtor ? (<span className='error'>{formik.errors.auhtor}</span>) : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="lastName">
              <Col sm={2}>
                <Form.Label>Desription</Form.Label>
              </Col>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the auhtor Info"
                  autoComplete='off'
                  name='description'
                  value={formik.values.description}
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