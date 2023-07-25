import React, {useEffect, useState } from 'react'
import { Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsFillEnvelopeAtFill, BsFillGeoAltFill, BsInstagram } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import Contact from './Contact';
import 'react-alice-carousel/lib/alice-carousel.css';
import { propertiesToHome } from '../client/axiosToApiProperies';
import Carousel from 'react-bootstrap/Carousel';
import CardPropertyHome from './CardPropertyHome';


function HomePage() {
  const handleDragStart = (e) => e.preventDefault();
  const [properties, setProperties] = useState([])

  useEffect(()=>{
    async function fetch() {
      const res = await propertiesToHome()
      setProperties([...res])
    }
    fetch()
  },[])
  

  return (
    <>
    <div className='main-home-page'>
    <div className='div-carousel'>
      {properties.length > 0 ?
      <Carousel className='carousel' variant='dark'>
           {properties.map((property)=> {
        return  <Carousel.Item className='carousel-item'>
          <CardPropertyHome properties={property}/>
        </Carousel.Item> })}
      </Carousel>
      :
       <div>
          <h2 className='title-db-empty'>אין עדיין נכסים באתר</h2>
       </div>}

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
    </div>

    </>
  )
}

export default HomePage