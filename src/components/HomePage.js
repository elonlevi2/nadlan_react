import React, {useEffect, useState } from 'react'
import './Home.css'
import { Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsFillEnvelopeAtFill, BsFillGeoAltFill, BsInstagram } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import Contact from './Contact';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { PhotoFetch, propertiesToHome } from '../client/axiosToApiProperies';
import Carousel from 'react-bootstrap/Carousel';



function HomePage() {
  const handleDragStart = (e) => e.preventDefault();
  const [properties, setProperties] = useState([])
  const [items, setItems] = useState([])

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
        console.log(resJ)
        setItems((prev)=>[...prev ,resJ])
      }
    }
    image()
  },[properties])

  

  return (
    <>
    <div className='about'>
      {/* <img src='https://scholarlykitchen.sspnet.org/wp-content/uploads/2018/11/iStock-857146092.jpg' className='image'/>

      <div className='box'>

        <div>
          <h2 className='title'>who we are?</h2>
        </div>

        <div>
          <p className='content'>
            ברוכים הבאים לתיווך נכסים - yonatan maor - real estate
          </p>
          <p className='content'>
          תיווך דירות למכירה והשכרה / נדל"ן מסחרי / מגרשים למכירה / דירות לתקופות קצרות
          </p>
        </div>

        <div>
          <p className='content'>
          פאר תיווך נכסים גאה לשווק נכסים ומגרשים ברמה גבוהה למכירה והשכרה בכל הארץ. אנו מאמינים כי עסקת נדל"ן היא בין ההחלטות המשמעותיות והמשפיעות שתקבלו בחייכם ואנחנו יודעים כיצד לתרגם את החלום שלכם לעסקה המתאימה והמדויקת ביותר עבורכם. נעניק לכם ייעוץ וליווי לאורך כל תהליך הפרויקט, תוך הקפדה על רמת אמינות ושקיפות גבוהות ומקצועיות בלתי מתפשרת, כך שתוכלו להרגיש שקטים, רגועים ושבעי רצון. אנו מזמינים אתכם לפגישת ייעוץ ללא התחייבות
          </p>
        </div>
      </div> */}

        <Carousel variant='dark' style={{height:"33rem", width:"75rem", position:"absolute", left:"8%", top:"120%"}}>
        <Carousel.Item style={{paddingLeft:"12.5rem"}}>
          <Card style={{width: '50rem'}}>
          <Card.Img style={{width:'800px', height:'400px'}} variant="top" src={items && `http://localhost:8000${items[0]}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>

                  <div style={{fontSize:'18px'}}>
                    דירת {properties.length > 0 && properties[0].rooms} חדרים ב{properties.length > 0 && properties[0].address}<br/>
                    מיקום:{properties.length > 0 && properties[0].location}
                  </div>

                </div>
                
              </Card.Text>
          </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item style={{paddingLeft:"12.5rem"}}>
        <Card style={{width: '50rem'}}>
          <Card.Img style={{width:'800px', height:'400px'}} variant="top" src={items && `http://localhost:8000${items[1]}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>
                
                  <div style={{fontSize:'18px'}}>
                    דירת {properties.length > 0 && properties[1].rooms} חדרים ב{properties.length > 0 && properties[1].address}<br/>
                    מיקום:{properties.length > 0 && properties[1].location}
                  </div>

                </div>
                
              </Card.Text>
          </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item style={{paddingLeft:"12.5rem"}}>
        <Card style={{width: '50rem'}}>
          <Card.Img style={{width:'800px', height:'400px'}} variant="top" src={items && `http://localhost:8000${items[1]}`}/>
          <Card.Body>
              <Card.Text>
                
                <div style={{display:'flex', flexDirection:"column" ,gap:'1rem', direction:'rtl', textAlign:'center'}}>
                
                  <div style={{fontSize:'18px'}}>
                    דירת {properties.length > 0 && properties[2].rooms} חדרים ב{properties.length > 0 && properties[2].address}<br/>
                    מיקום:{properties.length > 0 && properties[2].location}
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
        <Button variant='outline-dark' size='lg' as={Link} to={"/properties_sale"} style={{width:"330px"}} >נכסים למכירה</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/properties_rent"} style={{width:"330px"}}>נכסים להשכרה</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/tips"} style={{width:"330px"}}>טיפים לרכישת דירה</Button>
      </div>
      <div className='div-button-to-site'>
        <Button variant='outline-dark' size='lg' as={Link} to={"/brokers"} style={{width:"330px"}} >השותפים שלנו</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/contact"} style={{width:"330px"}}>יצירת קשר</Button>
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

          {/* <div className='dropdown'>
            <Link className='dropbtn'>נכסים</Link>
            <br/>
            <div className="dropdown-content">
              <Link to="/properties_sale">נכסים למכירה</Link>
              <Link to="/properties_rent">נכסים לשכירות</Link>
            </div>
          </div> */}



        </div>
      </div>

    </div>

    </>
  )
}

export default HomePage