import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { PhotoFetch, UserFetch } from '../client/axiosToApiProperies';
import ModalMailToBroker from './ModalMailToBroker';

function ModalProperty({property, show, setShow, images}) {
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
        async function fetchData() {
          const res = await PhotoFetch(property.id)
          setPhoto(res.data)
        }
        User()
        fetchData()
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
                <p>דירת {property.rooms} חדרים ל{property.type === 'sale' ? 'מכירה': 'להשכרה'} ב{property.location} </p>
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
            {photo && photo.map((p)=>{return <img key={p.id} style={{width:"200px", height:"200px"}} src={`http://127.0.0.1:8000${p.image}`}/>})}
                {/* <CarouselImages property_id={property.id}/> */}
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