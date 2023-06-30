import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import ModalProperty from './ModalProperty';
import { PhotoFetch } from '../client/axiosToApiProperies';
import { s3Url } from '../config';

function CardPropertyHome({properties}) {
    const [show1, setShow1] = useState(false);
    const [image, setImage] = useState("");

    useEffect(()=>{
        async function fetchData() {
          const res = await PhotoFetch(properties.id)
          setImage(res.data[0].image)}
        fetchData()
      },[])

  return (<>
        <Card className='card'>
          <Card.Img className='card-img' variant="top" src={`${s3Url}${image}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>

                  <div style={{fontSize:'18px'}}>
                    דירת {properties.rooms} חדרים ב{properties.address}<br/>
                    מיקום: {properties.location}
                    <br/>
                    <Button variant='success' onClick={()=>{setShow1(true);}}>לעוד פרטים</Button>
                    <ModalProperty show={show1} setShow={setShow1} property={properties}></ModalProperty>

                  </div>

                </div>
                
              </Card.Text>
          </Card.Body>
        </Card>
  </>)
}

export default CardPropertyHome