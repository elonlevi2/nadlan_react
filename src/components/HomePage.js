import React, { useContext } from 'react'
import './Home.css'
import { Button, Dropdown, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsFillEnvelopeAtFill, BsFillGeoAltFill, BsInstagram } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import DropdownContext from 'react-bootstrap/esm/DropdownContext';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';


function HomePage() {

  return (
    <>
    <div className='about'>
      <img src='https://scholarlykitchen.sspnet.org/wp-content/uploads/2018/11/iStock-857146092.jpg' className='image'/>

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
      </div>
    </div>
    <div className='sending-to-the-site'>

      <h2 className='title-sending-to-the-site'>What Are You Looking For...?</h2>

      <div className='div-button-to-site'>
        <Button variant='outline-dark' size='lg' as={Link} to={"/properties_sale"} style={{width:"330px"}} >נכסים למכירה</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/properties_rent"} style={{width:"330px"}}>נכסים להשכרה</Button>
        <Button variant='outline-dark' size='lg' as={Link} to={"/tips"} style={{width:"330px"}}>טיפים לרכישת דירה</Button>
      </div>

      
    </div>

    <div className='div-details'>

      <div className='div-details-contact'>
        <h6>יצירת קשר</h6>  

        <div className='div-details-contact-icons'>
          <span style={{fontSize:"13px"}}><BsFillEnvelopeAtFill/> name@gmail.com</span>
          <span style={{fontSize:"13px"}}><BsFillGeoAltFill/> הר חומה, ירושלים </span>
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
          <Link className='links' to="#">כל הנכסים</Link>

          <div className='dropdown'>
            <Link className='dropbtn'>נכסים</Link>
            <br/>
            <div className="dropdown-content">
              <Link to="/properties_sale">נכסים למכירה</Link>
              <Link to="/properties_rent">נכסים לשכירות</Link>
            </div>
          </div>



        </div>
      </div>

      {/* <div className='div-contact-content-img'>
        <img src={process.env.PUBLIC_URL + '/logo2.png'} style={{width:"100px", height: "100px"}}/>

      </div> */}

    </div>

    </>
  )
}

export default HomePage