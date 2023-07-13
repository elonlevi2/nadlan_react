import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalMailToBroker from './ModalMailToBroker';
import { useState } from 'react';

function ModalTips(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const [showEmail, setShowEmail] = useState(false);

  
  return (
    <>
      <Modal fullscreen={true} show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <div className='div-of-details'>
            <p style={{fontSize:"34px"}}>{props.title}:</p>
            <p style={{fontSize:"24px"}}>{props.content}</p>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button variant='success' onClick={()=>{setShowEmail(true)}}>שלח מייל למתווך</Button>
          </div>

          <ModalMailToBroker show={showEmail} setShow={setShowEmail} emailBroker={props.email}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalTips