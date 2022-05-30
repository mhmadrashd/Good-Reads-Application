import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRefreshAdmin } from '../../../../Redux/DataSlice';
const URLServer = "https://goodread-backend.herokuapp.com";

function DeleteModal(probs) {
    const currentTable = probs.table;
    const dispatch = useDispatch();
    const confirmDeletion = (e) => {
        // console.log(e);
        if (currentTable === "first") {
            // console.log("first");
            axios.delete(`${URLServer}/category/${probs.item._id}`, {
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
        }
        else if (currentTable === "second") {
            // console.log(currentTable);
            axios.delete(`${URLServer}/book/${probs.item._id}`, {
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
        }
        else if (currentTable === "third") {
            // console.log(currentTable);
            axios.delete(`${URLServer}/author/${probs.item._id}`, {
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
        }
        // console.log("delete", probs.item);
        probs.onClick();
    }
    const cancelDeletion = () => {
        probs.onClick();
    }

    return (
        <div>
            <Modal show={probs.state} onHide={probs.onClick} size="lg">
                <Modal.Header className="px-4" closeButton>
                    <Modal.Title className="ms-auto">Delete Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                    <div as={Row} className='text-center'>
                        {/* <Col sm={4}> */}
                        <Button variant="primary" className='m-3' onClick={confirmDeletion}>
                            Delete
                        </Button>
                        {/* </Col>
                <Col sm={4}> */}
                        <Button variant="secondary" className='m-3' onClick={cancelDeletion}>
                            Cancel
                        </Button>
                        {/* </Col> */}
                    </div>
                </Modal.Body>


            </Modal>
        </div>
    )
}

export default DeleteModal;