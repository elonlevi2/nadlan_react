import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {TbHomeQuestion} from 'react-icons/tb'
import {MdOutlineBed} from 'react-icons/md'
import '../client/axiosToApiProperies'
import { PhotoFetch } from '../client/axiosToApiProperies';
import { Link, useLocation } from 'react-router-dom';
import ModalProperty from './ModalProperty';
import { s3Url } from '../config';

function CardOfProperty({property}) {
  const location = useLocation()
  const path = location.pathname
  const [show, setShow] = useState(false);
  const [images, setImages] = useState('')

  useEffect(()=>{
    async function fetchData() {
      const res = await PhotoFetch(property.id)
      setImages(res.data[0].image)}
    fetchData()
  },[])
    
  return (<>
      <Card className='card-property'>
      <Card.Img className='card-img-property' variant="top" src={`${s3Url}${images}`}/>
      <Card.Body>
          <Card.Title>
            <div style={{height: "35px", padding:'0.5rem', backgroundColor:'black', color: 'white', display:'inline-block', width:'100%', fontFamily:'ariel', textAlign:'center'}}>
            מחיר: {property.price}₪
            </div>
          </Card.Title>
          <Card.Text>
            
            <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>

              

            
              <div style={{fontSize:'16px'}}>
                דירת {property.rooms} חדרים ב{property.location}<br/>
                מיקום: {property.address}
              </div>

              <div>
                <div style={{fontWeight:'bold'}}>עוד על הנכס:</div>

                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <span><TbHomeQuestion style={{fontSize:'35px'}}/><div style={{fontSize:"15px"}}>{property.size} מ״ר</div></span>
                  <span><MdOutlineBed style={{fontSize:'35px'}}/><div style={{fontSize:"15px"}}>{property.rooms}</div></span>
                  
                </div>
                {path === '/my-properties' ? 
                  <div style={{ display:'flex', justifyContent:'space-between' , gap:'1rem'}}>
                    {path === '/my-properties' && <Button size='sm' className='link-property' variant='outline-success' as={Link} to={`/edit-ads?id=${property.id}`}>ערוך מודעה </Button> }
                    <Button variant='outline-success' className='link-property' onClick={()=>{setShow(true)}}>לעוד מידע</Button>
                  </div>
                  :
                  <div style={{gap:'1rem'}}>
                  <Button variant='outline-success' className='link-property' onClick={()=>{setShow(true)}}>לעוד מידע</Button>
                  </div>}
                <ModalProperty show={show} setShow={setShow} property={property}></ModalProperty>

              </div>
            </div>
            
          </Card.Text>
      </Card.Body>
      </Card>
            
    </>)
}

export default CardOfProperty