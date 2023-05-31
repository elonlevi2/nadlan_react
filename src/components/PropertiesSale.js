import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import '../client/axiosToApiProperies'
import { PhotoFetch, propertiesSaleFetch, propertiesSaleFetchRooms, propertiesSaleFilterFetch } from '../client/axiosToApiProperies'
import CardOfProperty from './CardOfProperty'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PropertiesSale() {
    const [properties, setProperties] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)
    const [rooms, setRooms] = useState("")
    const [city, setCity] = useState("")
    const [filter, setFilter] = useState(false)

    
    const addProperties = async ()=> {
        const res = await propertiesSaleFetch(pagenum, 10)
        if (!res.has_more) {
            setHasmore(false)
        }
        setPagenum((prev) => {
          return prev + 1;
        });

        const newProperties = [...properties, ...res.data]

        setProperties(newProperties)
      }


      const addPropertiesFilter = async ()=> {
        const res = await propertiesSaleFilterFetch(pagenum, 10, rooms, city)
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
        addPropertiesFilter()
        
      }

      // const resetfilters = ()=> {
      //   setFilter(false)
      //   setPagenum(0)
      //   setProperties([])
      //   addProperties()

      // }

  return (<>

    <div className='div-of-filter-properties'>



      <div className='div-of-filter'>

        <div className='div-all-options'>
          <p>חיפוש נכס:</p>
          <form onSubmit={handelsubmit}>
            <input type='number' placeholder='מספר חדרים דוגמא 4' onChange={(e)=>{
              setProperties([]);
              setPagenum(0);
              setRooms(e.target.value);
            }}/>
            {rooms}
            <input type='text' placeholder='עיר' onChange={(e)=>{
              setProperties([])
              setPagenum(0)
              setCity(e.target.value);
            }}/>
            {city}
            <br/>

            <Button variant='danger' type='submit'>החל</Button>
          </form>
          {/* <Button variant='success' onClick={resetfilters}>איפוס הסינון</Button> */}

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
          loadMore={filter ? addPropertiesFilter : addProperties}
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

export default PropertiesSale