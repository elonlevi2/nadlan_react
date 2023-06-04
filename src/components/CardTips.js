import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import ModalTips from './ModalTips';
import { UserFetch } from '../client/axiosToApiProperies';
import { Link, useLocation } from 'react-router-dom';

function CardTips({tip}) {
  const location = useLocation()
  const path = location.pathname
  const [show, setShow] = useState(false);
  const [realEstate, setRealEstate] = useState("");



  useEffect(()=>{
    async function fetch(){
      const res = await UserFetch(tip.real_estate)
      console.log(res.data[0])
      setRealEstate(res.data[0].first_name)
    }
    fetch()
    
  },[])

  return (<>
    <Card style={{backgroundColor: "floralwhite" , width:"18rem", display:'inline-table', marginInline:'5rem', marginBottom:'3rem', border:'black solid 2px'}}>
      <Card.Header as="h5">הטיפ של {realEstate}</Card.Header>
      <Card.Body>
        <Card.Title>{tip.title}</Card.Title>
        {/* <Card.Text>
          {tip.content}
        </Card.Text> */}

        <div style={{display:'flex', justifyContent:'space-between' , gap:'1rem'}}>
          <Button variant="outline-success" onClick={()=>{setShow(true)}}>ראה עוד</Button>
          {path === '/my-tips' && <Button size='sm'  variant='outline-success' as={Link} to={`/edit-tips?id=${tip.id}`}>ערוך מודעה </Button> }
        </div>

      </Card.Body>
    </Card>

    <ModalTips title={tip.title} content={tip.content} show={show} setShow={setShow}/>

    </>)
}

export default CardTips