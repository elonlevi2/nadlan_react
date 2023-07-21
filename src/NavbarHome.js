import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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
  const {setUsername, username, onlogged, setOnlogged} = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const superuser = localStorage.getItem('issuperuser') === 'true'


  const stylenavbar = {
    backgroundImage: path === "/" ? `url(${homePageImage})`: path === "/tips" ? `url(${tipsImage})`: path === "/properties_sale" ? `url(${propertiesSale})`: path === "/my-properties" ? `url(${propertiesSale})` :
    path === "/add-ads" ? `url(${addAdsImage})`: path === "/properties_rent" ? `url(${propertiesSale})`: path === "/edit-ads" | path == "/edit-tips" ? `url(${editImage})`: path === "/my-tips" ? `url(${tipsImage})`:
    path === "/brokers" ? `url(${brokersImage})`: path === "/contact" ? `url(${contactImage})`: path === "/edit-profile" ? `url(${editprofile})`: path === "/about" ? `url(${aboutImage})`: "none",
    height: path === '/t' ? '30vh' : path === '/login' ? '0vh' : path === '/signup' ? '0vh' : path !== "/dashbord" && path !== "/map" && '100vh',
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition:"center center",
  }
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleClose = () => setMenuOpen(false)

  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("issuperuser");
    setOnlogged(false);
    setUsername('')
    nav('/login');
    nav('/login');
    toggleMenu();}
 

  return (
    <div  style={stylenavbar} className='in-phone'>

      <Navbar key={false} bg="dark" variant='dark' expand={false} className="mb-3" style={{opacity: '0.9'}}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' ><img src={process.env.PUBLIC_URL + '/logot.png'} style={{width:"150px", height: "100px"}}/></Navbar.Brand>
          {onlogged ? <Navbar.Brand as={Link} to='/'>{username} ,שלום</Navbar.Brand> : <Navbar.Brand>ברוכים הבאים</Navbar.Brand> }
          <Navbar.Toggle onClick={toggleMenu} aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
            restoreFocus={false}
            show={menuOpen}
            onHide={handleClose}
            style={{backgroundColor: "black", color: "white", opacity:'0.8'}}
          >
            <Offcanvas.Header closeButton closeVariant='white' className='title-offcanvas'>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                זירת הנדלן
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3" style={{direction:'rtl'}}>
                <Nav.Link className='link-mains' as={Link} to='/about' onClick={toggleMenu}>אודות</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/properties_sale' onClick={toggleMenu}>נכסים למכירה</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/properties_rent' onClick={toggleMenu}>נכסים לשכירות</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/map' onClick={toggleMenu}>מפת נכסים</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/tips' onClick={toggleMenu}>טיפים לרכישת נכס</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/brokers' onClick={toggleMenu}>השותפים שלנו</Nav.Link>
                <Nav.Link className='link-mains' as={Link} to='/contact' onClick={toggleMenu}>יצירת קשר</Nav.Link>

                {superuser && <Nav.Link className='link-mains' as={Link} to='/dashbord' onClick={toggleMenu}>דשבורד מנהל</Nav.Link>}

                {onlogged ? 
                  <>
                  <NavDropdown
                  title="התוספות שלי"
                  id={`offcanvasNavbarDropdown-expand-${false}`}
                  style={{color: 'darkgreen', direction:"rtl"}}
                  >
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/my-properties' onClick={toggleMenu}>הדירות שלי</NavDropdown.Item>
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/my-tips' onClick={toggleMenu}>הטיפים שלי</NavDropdown.Item>
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/add-ads' onClick={toggleMenu}>העלאת מודעה</NavDropdown.Item>
                  <NavDropdown.Item className="link-dropdown" as={Link} to='/edit-profile' onClick={toggleMenu}>עריכת הפרופיל שלי</NavDropdown.Item>
                  </NavDropdown>

                  <Button variant='outline-danger' onClick={logout}>logout</Button>
                  </> 
                  :
                  <Button variant='success' onClick={()=>{nav('/login'); toggleMenu()}}>login</Button>
                  }

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
