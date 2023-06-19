import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { validateToken } from './client/connectionClient';


 const homePageImage = process.env.PUBLIC_URL + '/homet.jpg'
 const tipsImage = process.env.PUBLIC_URL + '/tips.jpeg'
 const propertiesSale = process.env.PUBLIC_URL + '/properties_sale.jpeg'
 const addAdsImage = process.env.PUBLIC_URL + '/add_ads.jpg'
 const editImage = process.env.PUBLIC_URL + '/editimage.jpg'
 const brokersImage = process.env.PUBLIC_URL + '/brokers.jpg'
 const contactImage = process.env.PUBLIC_URL + '/contact.jpg'
 const editprofile = process.env.PUBLIC_URL + '/editprofile.jpg'
 const aboutImage = process.env.PUBLIC_URL + '/about.jpg'

function NavbarHome() {
  const nav = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const {username, onlogged, setOnlogged, superuser, setSuperUser} = useContext(AppContext)


  useEffect(()=>{
    validateToken().then((response)=>{
      if (response.superuser){
        setSuperUser(true)
      } else {
        setSuperUser(false)
      }
    })
  },[])

  const stylenavbar = {
    backgroundImage: path === "/" ? `url(${homePageImage})`: path === "/tips" ? `url(${tipsImage})`: path === "/properties_sale" ? `url(${propertiesSale})`: path === "/my-properties" ? `url(${propertiesSale})` :
    path === "/add-ads" ? `url(${addAdsImage})`: path === "/properties_rent" ? `url(${propertiesSale})`: path === "/edit-ads" | path == "/edit-tips" ? `url(${editImage})`: path === "/my-tips" ? `url(${tipsImage})`:
    path === "/brokers" ? `url(${brokersImage})`: path === "/contact" ? `url(${contactImage})`: path === "/edit-profile" ? `url(${editprofile})`: path === "/about" ? `url(${aboutImage})`: "none",
    height: path !== "/dashbord" && path !== "/map" && path !== "/login" && path !== "/signup" &&'100vh',
    // path === "/" ? "100vh": path === "/tips" ? '100vh': path === "/properties_sale" ? '100vh': path === "/my-properties"? '100vh': path === "/add-ads"? '100vh': path === "/properties_rent" ? '100vh':
    // path === "/edit-ads" ? '100vh': path === "/my-tips" ? '100vh': path === "/edit-tips" ? '100vh': path === "/brokers" ? '100vh': path === "/contact" ? '100vh': path === "/edit-profile" ? '100' : "0",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition:"center center",
  }
 

  return (
    <div  style={stylenavbar}>

      <Navbar key={false} bg="dark" variant='dark' expand={false} className="mb-3" style={{opacity: '0.9'}}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' ><img src={process.env.PUBLIC_URL + '/logot.png'} style={{width:"150px", height: "100px"}}/></Navbar.Brand>
          {onlogged ? <Navbar.Brand as={Link} to='/'>{username} שלום</Navbar.Brand> : <Navbar.Brand>שלום</Navbar.Brand> }
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
            style={{backgroundColor: "black", color: "white", opacity:'0.8'}}
          >
            <Offcanvas.Header closeButton closeVariant='white' className='title-offcanvas'>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                זירת הנדלן
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3" style={{direction:'rtl'}}>
                <Nav.Link className='link-mains' as={Link} to='/about'>אודות</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/properties_sale'>נכסים למכירה</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/properties_rent'>נכסים לשכירות</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/map'>מפת נכסים</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/tips' >טיפים לרכישת נכס</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/brokers' >השותפים שלנו</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/contact'>יצירת קשר</Nav.Link>

                {superuser && <Nav.Link className='link-mains' as={Link} to='/dashbord'>דשבורד מנהל</Nav.Link>}

                {onlogged ? 
                  <>
                  <NavDropdown
                  title="התוספות שלי"
                  id={`offcanvasNavbarDropdown-expand-${false}`}
                  style={{color: 'darkgreen', direction:"rtl"}}
                  >
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/my-properties'>הדירות שלי</NavDropdown.Item>
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/my-tips'>הטיפים שלי</NavDropdown.Item>
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/add-ads'>העלאת מודעה</NavDropdown.Item>
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/edit-profile'>עריכת הפרופיל שלי</NavDropdown.Item>
                  </NavDropdown>

                  <Button variant='outline-danger' onClick={()=>{
                  localStorage.removeItem("token");
                  localStorage.removeItem("issuperuser");
                  setOnlogged(false);
                  setSuperUser(false)
                  nav('/login');
                  nav('/login');}}>logout</Button>
                  </> 
                  :
                  <Button variant='success' onClick={()=>{nav('/login')}}>login</Button>
                  }

                {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${false}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      </div>
  );
}

export default NavbarHome;
