import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from 'axios';


function EditAuthorModal(probs){
  //this state used to get image from input type=(file) to upload it to firebase
  const [imageUpload, setImageUpload] = useState(null);
  //this state used to load image to img element after choose image
  const [imageUrls, setImageUrls] = useState([]);
  const uploadFile = () => {
    //if no image uploaded return
    if (imageUpload == null) return;
    // upload image to storage in firebase to spacific path
    // V4 this uuid to generate unique name
    const imageRef = ref(storage, `images/author/${imageUpload.name + v4()}`);
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
  const item=probs.item;
  // console.log(item);

  //initial values for the formik
  const initialValues={
    fname :item.fName,
      lname:item.lName,
      dob:item.DOB,
      image:item.img
    }
    //to handle the validations on the inputs with formik
    const validate=values=>{
      let errors = {};
      if(!values.fname){
        errors.fname='*Required .. Please Enter First Name';
      }
      if(!values.lname){
        errors.lname='*Required .. Please Enter Last Name';
      }
      if(!values.dob){
        errors.dob = '*Required .. Please select date of birth';
      }
      return errors;
    }
    //to handle the submit action with formik
  const  onSubmit= values=>{
    // console.log(values);
    uploadFile();
    // axios.patch(`http://localhost:3001/authors?${item._id}` , values);
    probs.onClick();
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
          <Modal.Title className="ms-auto">Edit Author</Modal.Title>
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
                        autoComplete='off'
                        name='fname'
                        // value={addedAuthor.fname}
                        value={formik.values.fname}
                        onChange={formik.handleChange}
                        autoFocus/>                   
                      {formik.errors.fname?(<span className='error'>{formik.errors.fname}</span>):null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lastName">
                <Col sm={2}>
                    <Form.Label>Last Name</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        autoComplete='off'
                        name='lname'
                        value={formik.values.lname}
                        onChange={formik.handleChange}
                        />
                        {formik.errors.lname?(<span className='error'>{formik.errors.lname}</span>):null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="dob">
                <Col sm={2}>
                    <Form.Label>Date of Birth</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        type="date"
                        name='dob'
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        />
                        {formik.errors.dob?(<span className='error'>{formik.errors.dob}</span>):null}
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
                Edit Author
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditAuthorModal;