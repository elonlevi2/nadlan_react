import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ModalMailToBroker from './ModalMailToBroker';

function CardBroker({broker}) {
    const [show, setShow] = useState(false);

  return (<>
    <Card style={{ width: '18rem', direction:'rtl', display:'inline-table', marginInline:'1.5rem', marginBottom:'3rem',
     backgroundColor:"black", color:"white" }}>
      <Card.Body>
        <Card.Title>{broker.first_name} {broker.last_name}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>
          {broker.email}
        </Card.Text>
        <Button variant='light' onClick={()=>{setShow(true)}}>send mail</Button>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
    <ModalMailToBroker show={show} setShow={setShow} emailBroker={broker.email}/>
  </>)
}

export default CardBroker