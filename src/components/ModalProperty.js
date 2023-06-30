import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { PhotoFetch, UserFetch } from '../client/axiosToApiProperies';
import ModalMailToBroker from './ModalMailToBroker';
import { s3Url } from '../config';

function ModalProperty({property, show, setShow}) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [realEstate, setRealEstate] = useState()
    const [lastname, setLastname] = useState()
    const [photo, setPhoto] = useState([])
    const [showEmail, setShowEmail] = useState(false);
    const [email, setEmail] = useState(false);



    useEffect(()=>{
        async function User() {
            const res = await UserFetch(property.real_estate)
            setRealEstate(res.data[0].first_name)
            setLastname(res.data[0].last_name)
            setEmail(res.data[0].email)
        }
        async function PhotoData() {
          const res = await PhotoFetch(property.id)
          setPhoto(res.data)
        }
        User()
        PhotoData()
    }, [])


  return (
    <>
    <Modal fullscreen={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
            <div className='div-of-title'>
                <h3>זירת הנדלן מציגה:</h3>
            </div>
            <div className='div-of-details'>
                <p>דירת {property.rooms} חדרים ל{property.type === 'sale' ? 'מכירה': 'השכרה'} ב{property.location} </p>
                <p>כתובת: {property.address}</p>
                <p>{property.size} מ״ר</p>
                <p>{property.description}</p>
            </div>

            <div className='div-of-contact'>
                <p>ליצירת קשר:</p>
                <p>{realEstate} {lastname} - {property.phone}</p>
                <Button variant='success' onClick={()=>{setShowEmail(true)}}>שלח מייל למתווך</Button>
                <ModalMailToBroker show={showEmail} setShow={setShowEmail} emailBroker={email}/>

            </div>

            <div className='div-of-photo'>
            {photo && photo.map((p)=>{return <img key={p.id} style={{width:"200px", height:"200px"}} src={`${s3Url}${p.image}`}/>})}
            </div>
            <br/>

            
          
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

export default ModalProperty