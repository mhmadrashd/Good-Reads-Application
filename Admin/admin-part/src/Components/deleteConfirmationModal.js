import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'

function DeleteModal(probs) {
    const confirmDeletion = () => {
        console.log("delete", probs.item);
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