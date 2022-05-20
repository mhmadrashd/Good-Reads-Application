import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import axios from 'axios';
const URLServer = "http://localhost:3000";

function AddCategoryModal(probs) {

  //initial values for formik
  const initialValues = {
    Name: ''
  }

  //to handle the submit action with formik
  const onSubmit = (values) => {
    try {
      axios.post(`${URLServer}/category`, {
        Name: values.Name,
      })
        .then(function (response) {
          probs.onClick()
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {

      console.log(error)
    }
  }

  //to handle the validations on the inputs with formik
  const validate = values => {
    let errors = {};
    if (!values.Name) {
      errors.Name = '*Required .. Please Enter Category Name';
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
          <Modal.Title className="ms-auto">Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="categoryName">
              <Col sm={3}>
                <Form.Label>Category Name</Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name='Name'
                  // value={input.Name}
                  value={formik.values.Name}
                  autoComplete="off"
                  // onChange={handleChange}
                  onChange={formik.handleChange}
                  placeholder="Enter the Category Name"
                  autoFocus />
                {formik.errors.Name ? (<span className='error'>{formik.errors.Name}</span>)
                  : null}
              </Col>
            </Form.Group>
            <div className='text-center'>
              <Button variant="outline-dark"
                // onClick={handleClick} 
                type="submit ">
                Add Category
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddCategoryModal;