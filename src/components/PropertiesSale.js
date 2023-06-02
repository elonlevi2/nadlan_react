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
    const [rooms, setRooms] = useState(null)
    const [city, setCity] = useState(null)
    const [filter, setFilter] = useState(false)

    
    const addProperties = async ()=> {
        const res = await propertiesSaleFetch(pagenum, 10, rooms, city)
        if (!res.has_more) {
            setHasmore(false)
        }
        setPagenum((prev) => {
          return prev + 1;
        });

        const newProperties = [...properties, ...res.data]

        setProperties(newProperties)
      }


      // const addPropertiesFilter = async ()=> {
      //   const res = await propertiesSaleFilterFetch(pagenum, 10, rooms, city)
      //   if (!res.has_more) {
      //       setHasmore(false)
      //   }
      //   setPagenum((prev) => {
      //     return prev + 1;
      //   });

      //   const newProperties = [...properties, ...res.data]

      //   setProperties(newProperties)
      // }


      const handelsubmit = async (e)=> {
        e.preventDefault()
        setProperties([])
        setPagenum(0)
        if (filter) {
          setFilter(false)
        } else {
          setFilter(true)
        }

      }

      useEffect(()=>{
        addProperties()
      }, [filter])

      useEffect(()=>{
        console.log(rooms)
      }, [rooms])

      const resetfilter = ()=> {
        setProperties([])
        setPagenum(0)
        setRooms(null)
        setCity(null)
        if (filter) {
          setFilter(false)
        } else {
          setFilter(true)
        }
      }

  return (<>

    <div className='div-of-filter-properties'>



      <div className='div-of-filter'>

        <div className='div-all-options'>
          <p>חיפוש נכס:</p>
          <form onSubmit={handelsubmit}>
            <input type='number' placeholder='מספר חדרים דוגמא 4' onChange={(e)=>{
              setRooms(e.target.value === '' ? null : e.target.value);              
            }}/>
            {rooms}
            <input type='text' placeholder='עיר' onChange={(e)=>{
              setCity(e.target.value === '' ? null : e.target.value);
            }}/>
            {city}
            <br/>

            <Button variant='danger' type='submit'>החל</Button>
          </form>
          <Button variant='success' onClick={resetfilter}>איפוס הסינון</Button>

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

export default PropertiesSale