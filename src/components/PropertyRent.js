import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import '../client/axiosToApiProperies'
import { PhotoFetch, propertiesRentFetch, propertiesSaleFetch, propertiesSaleFetchRooms } from '../client/axiosToApiProperies'
import CardOfProperty from './CardOfProperty'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PropertiesRent() {
    const [properties, setProperties] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)
    const [action, setAction] = useState('rent')
    const [rooms, setRooms] = useState("")
    const [filters, setFilters] = useState({})

    const addProperties = async ()=> {
        const res = await propertiesRentFetch(action, pagenum, 10, rooms)
        if (!res.has_more) {
            setHasmore(false)
        }
        setPagenum((prev) => {
          return prev + 1;
        });

        const newProperties = [...properties, ...res.data]

        setProperties(newProperties)
      }


      const handelsubmit = (e)=> {
        e.preventDefault()
        addProperties(); 
      }

      const resetfilters = ()=> {
        setAction('all')
        setRooms('')
        setPagenum(0)
        setProperties([])
        addProperties()
      }

  return (<>

    <div className='div-of-filter-properties'>



      <div className='div-of-filter'>

        <div className='div-all-options'>
          <p>חיפוש נכס:</p>
          <form onSubmit={handelsubmit}>
            <input type='number' placeholder='מספר חדרים דוגמא 4' onChange={(e)=>{
              setProperties([]);
              setRooms(e.target.value);
              setAction('filters');
              setPagenum(0);
            }}/>{/*set properties to [] onchange and doing new axios*/}
            {rooms}
            <br/>

            <Button variant='danger' type='submit'>החל</Button>
          </form>
          <Button variant='success' onClick={resetfilters}>איפוס הסינון</Button>

          {/* <select name="days" id="days">
            <option value="#">שכונה?</option>
          </select> */}
        </div>

        

      </div>


      <div className='div-of-title-properites'>

        <div className='div-of-title'>
          <h2>מאגר הנכסים</h2>
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

export default PropertiesRent