import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import CardOfProperty from './CardOfProperty'
import { Button } from 'react-bootstrap'
import { propertiesOfUseraxios } from '../client/axiosToPropertyOfUser'

function PropertyOfUser() {
    const [properties, setProperties] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)
    const [rooms, setRooms] = useState("")


    const addProperties = async ()=> {
        const res = await propertiesOfUseraxios(pagenum, 10)

        if (!res.has_more) {
            setHasmore(false)
        }
        setPagenum((prev) => {
          return prev + 1;
        });

        const newProperties = [...properties, ...res.data]

        setProperties(newProperties)
      }


  return (<>
    <div className='div-of-filter-properties'>



      <div className='div-of-filter'>

        <div className='div-all-options'>
          <p>חיפוש נכס:</p>
          <form>
            <input type='number' placeholder='מספר חדרים דוגמא 4' onChange={(e)=>{setRooms(e.target.value)}}/>
            {rooms}
            <br/>

            <Button variant='danger' type='submit'>החל</Button>
          </form>
          {/* <select name="days" id="days">
            <option value="#">שכונה?</option>
          </select> */}
        </div>

        

      </div>


      <div className='div-of-title-properites'>

        <div className='div-of-title'>
          <h2>מאגר הנכסים האישיים שלי</h2>
        </div>
        <div className='div-of-all-properties'>

        <InfiniteScroll
          loadMore={addProperties}
          hasMore={hasmore}
          loader={<div key={0}>loading...</div>}
          >
          {properties && properties.map((p)=>{return <CardOfProperty key={p.id} property={p}/>})}

          </InfiniteScroll>
        </div>

      </div>


    </div>
    </>)
}

export default PropertyOfUser