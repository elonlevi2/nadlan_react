import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalTips(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);

  
  return (
    <>
      <Modal fullscreen={true} show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{alignItems:"center"}}>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='div-of-details'>
            <p style={{fontSize:"34px"}}>{props.title}:</p>
            <p style={{fontSize:"24px"}}>{props.content}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalTips