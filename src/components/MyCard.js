import React from 'react';
import { Card, Button } from 'react-bootstrap';

function MyCard() {
  return (<>
    <div style={{backgroundColor:"darkgoldenrod" , height:"0.5vh"}}>
    </div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/t.png'} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            This is a sample text for the card.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>);
}

export default MyCard;