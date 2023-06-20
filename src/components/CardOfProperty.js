import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {TbHomeQuestion} from 'react-icons/tb'
import {MdOutlineBed} from 'react-icons/md'
import '../client/axiosToApiProperies'
import { PhotoFetch } from '../client/axiosToApiProperies';
import { Link, useLocation } from 'react-router-dom';
import ModalProperty from './ModalProperty';


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
      <Card style={{width: '15rem' , display:'inline-table', marginInline:'1.5rem', marginBottom:'3rem'}}>
      <Card.Img style={{width:'250px', height:'250px'}} variant="top" src={`http://127.0.0.1:8000${images}`}/>
      <Card.Body>
          <Card.Title>
            <div style={{height: "35px", padding:'0.5rem', backgroundColor:'black', color: 'white', display:'inline-block', width:'100%', fontFamily:'ariel', textAlign:'center'}}>
            מחיר: {property.price}₪
            </div>
          </Card.Title>
          <Card.Text>
            
            <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>

              

            
              <div style={{fontSize:'18px'}}>
                דירת {property.rooms} חדרים ב{property.location}<br/>
                מיקום:{property.address}
              </div>

              <div>
                <div style={{fontWeight:'bold'}}>עוד על הנכס:</div>

                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <span><TbHomeQuestion style={{fontSize:'35px'}}/><div style={{fontSize:"15px"}}>{property.size} מ״ר</div></span>
                  <span><MdOutlineBed style={{fontSize:'35px'}}/><div style={{fontSize:"15px"}}>{property.rooms}</div></span>
                  {/* <TbHomeQuestion style={{fontSize:'25px'}}/> */}
                  
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
          {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      </Card>
            
    </>)
}

export default CardOfProperty