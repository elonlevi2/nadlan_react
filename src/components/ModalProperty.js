import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
// import CarouselImages from './CarouselImages';
import { PhotoFetch, UserFetch } from '../client/axiosToApiProperies';

function ModalProperty({property, show, setShow, images}) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [realEstate, setRealEstate] = useState()
    const [lastname, setLastname] = useState()
    const [photo, setPhoto] = useState([])


    useEffect(()=>{
        async function User() {
            const res = await UserFetch(property.real_estate)
            setRealEstate(res.data[0].first_name)
            setLastname(res.data[0].last_name)
        }
        async function fetchData() {
          const res = await PhotoFetch(property.id)
          console.log(res.data)
          setPhoto(res.data)
        }
        User()
        fetchData()
    }, [])

    // useEffect(()=>{
    //   async function fetchData() {
    //     const res = await PhotoFetch(property.id)
    //     console.log(res.data)
    //     setPhoto(res.data[0].image)}
    //   fetchData()
    // },[])

  return (
    <>
    <Modal fullscreen={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        {/* <Modal.Title style={{textAlign:'center'}}>
            <div className='div-of-title'>
                <h3>זירת הנדלן מציגה:</h3>
            </div>
        </Modal.Title> */}
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

            </div>

            <div className='div-of-photo'>
            {photo && photo.map((p)=>{return <img key={p.id} style={{width:"200px", height:"200px"}} src={`http://127.0.0.1:8000${p.image}`}/>})}
                {/* <CarouselImages property_id={property.id}/> */}
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

export default ModalProperty