import React, {useEffect, useState } from 'react'
import { Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsFillEnvelopeAtFill, BsFillGeoAltFill, BsInstagram } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import Contact from './Contact';
import 'react-alice-carousel/lib/alice-carousel.css';
import { PhotoFetch, propertiesToHome } from '../client/axiosToApiProperies';
import Carousel from 'react-bootstrap/Carousel';
import ModalProperty from './ModalProperty';



function HomePage() {
  const handleDragStart = (e) => e.preventDefault();
  const [properties, setProperties] = useState([])
  const [items, setItems] = useState([])
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);


  useEffect(()=>{
    async function fetch() {
      const res = await propertiesToHome()
      setProperties([...res])
    }
    fetch()
  },[])

  useEffect(()=>{
    async function image() {
      for (let i = 0; i < properties.length; i++) {
        const res = await PhotoFetch(properties[i].id)
        const resJ = res.data[0].image
        setItems((prev)=>[...prev ,resJ])
      }
    }
    image()
  },[properties])

  

  return (
    <>
    <div className='div-carousel'>

        <Carousel className='carousel' variant='dark'>
        <Carousel.Item className='carousel-item'>
          <Card className='card'>
          <Card.Img className='card-img' variant="top" src={items && `http://localhost:8000${items[0]}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>

                  <div style={{fontSize:'18px'}}>
                    דירת {properties.length > 0 && properties[0].rooms} חדרים ב{properties.length > 0 && properties[0].address}<br/>
                    מיקום: {properties.length > 0 && properties[0].location}
                    <br/>
                    <Button variant='success' onClick={()=>{setShow1(true);}}>לעוד פרטים</Button>
                    {properties.length > 0 && <ModalProperty show={show1} setShow={setShow1} property={properties[0]}></ModalProperty>}


                  </div>

                </div>
                
              </Card.Text>
          </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item className='carousel-item'>
        <Card className='card'>
          <Card.Img className='card-img' variant="top" src={items && `http://localhost:8000${items[1]}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>
                
                  <div style={{fontSize:'18px'}}>
                    דירת {properties.length > 0 && properties[1].rooms} חדרים ב{properties.length > 0 && properties[1].address}<br/>
                    מיקום:{properties.length > 0 && properties[1].location}
                    <br/>
                    <Button variant='success' onClick={()=>{setShow2(true);}}>לעוד פרטים</Button>
                    {properties.length > 0 && <ModalProperty show={show2} setShow={setShow2} property={properties[1]}></ModalProperty>}
                  </div>

                </div>
                
              </Card.Text>
          </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item className='carousel-item'>
        <Card className='card'>
          <Card.Img className='card-img' variant="top" src={items && `http://localhost:8000${items[1]}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>
                
                  <div style={{fontSize:'18px'}}>
                    דירת {properties.length > 0 && properties[2].rooms} חדרים ב{properties.length > 0 && properties[2].address}<br/>
                    מיקום:{properties.length > 0 && properties[2].location}
                    <br/>
                    <Button variant='success' onClick={()=>{setShow3(true);}}>לעוד פרטים</Button>
                    {properties.length > 0 && <ModalProperty show={show3} setShow={setShow3} property={properties[2]}></ModalProperty>}
                  </div>

                </div>
                
              </Card.Text>
          </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>

    </div>
    <div className='sending-to-the-site'>

      <h2 className='title-sending-to-the-site'>What Are You Looking For...?</h2>

      <div className='div-button-to-site'>
        <Button variant='outline-dark' size='lg' as={Link} to={"/properties_sale"} className='button-on-div'>נכסים למכירה</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/properties_rent"} className='button-on-div'>נכסים להשכרה</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/tips"} className='button-on-div'>טיפים לרכישת דירה</Button>
      </div>
      <div className='div-button-to-site'>
        <Button variant='outline-dark' size='lg' as={Link} to={"/brokers"} className='button-on-div'>השותפים שלנו</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/contact"} className='button-on-div'>יצירת קשר</Button>
      </div>

      
    </div>

    <div className='div-details'>

      <div className='div-details-contact'>
        <h6>יצירת קשר</h6>
        <Contact/>
        <br/>  

        <div className='div-details-contact-icons'>
          <span style={{fontSize:"13px"}}><BsFillEnvelopeAtFill/> name@gmail.com</span>
          {/* <span style={{fontSize:"13px"}}><BsFillGeoAltFill/> הר חומה, ירושלים </span> */}
          <span style={{fontSize:"13px"}}><AiOutlinePhone/> 050-0000000</span>
          <span style={{fontSize:"13px"}}><CiFacebook/> Profil</span>
          <span style={{fontSize:"13px"}}><BsInstagram/> Profil</span>
          
        </div>

      </div>

      <div className='div-details-contact'>
        <h6>כללי</h6>

        <div className='div-details-contact-icons'>
          <Link className='links' to="/brokers">הכרות השותפים</Link>
          
        </div>
      </div>

      <div className='div-details-contact'>
        <h6>נכסים</h6>

        <div className='div-details-contact-icons'>
          <Link className='links' to="/properties_sale">נכסים למכירה</Link>
          <Link className='links' to="/properties_rent">נכסים לשכירות</Link>

        </div>
      </div>

    </div>

    </>
  )
}

export default HomePage