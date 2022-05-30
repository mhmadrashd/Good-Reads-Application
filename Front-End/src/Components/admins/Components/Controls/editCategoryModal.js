import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRefreshAdmin } from '../../../../Redux/DataSlice';
const URLServer = "https://goodread-backend.herokuapp.com";

function EditCategoryModal(probs) {
  // console.log(probs.item);
  const initialValues = {
    editedCategory: probs.item["Name"]
  }
  const dispatch = useDispatch();
  //to handle the submit action with formik
  const onSubmit = values => {
    // console.log(values);
    axios.patch(`${URLServer}/category/${probs.item._id}`, {
      Name: values.editedCategory,
    }, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then(function (response) {
        probs.onClick()
        dispatch(setRefreshAdmin(1))
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    probs.onClick();
  }

  //to handle the validations on the inputs with formik
  const validate = values => {
    let errors = {};
    if (!values.editedCategory) {
      errors.editedCategory = '*Required .. Please Enter Category Name';
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
          <Modal.Title className="ms-auto">Edit Category</Modal.Title>
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
                  name='editedCategory'
                  // value={input.editedCategory}
                  autoComplete="off"
                  value={formik.values.editedCategory}
                  onChange={formik.handleChange}
                  autoFocus />
                {formik.errors.editedCategory ? (<span className='error'>{formik.errors.editedCategory}</span>) : null}
              </Col>
            </Form.Group>
            <div className='text-center'>
              <Button variant="outline-dark" type="submit ">
                Edit Category
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditCategoryModal;