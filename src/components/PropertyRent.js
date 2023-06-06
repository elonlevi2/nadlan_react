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
    const [rooms, setRooms] = useState(null)
    const [city, setCity] = useState(null)
    const [balcony, setBalcony] = useState(null)
    const [filter, setFilter] = useState(false)

    const addProperties = async ()=> {
        const res = await propertiesRentFetch(pagenum, 10, rooms, city, balcony)
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

      const resetfilter = ()=> {
        setProperties([])
        setPagenum(0)
        setRooms(null)
        setCity(null)
        setBalcony(null)
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
          <form style={{display:"flex", flexDirection:"column" ,gap:"0.5rem"}} onSubmit={handelsubmit}>
            <input className='input-filter' type='number' placeholder='מספר חדרים דוגמא 4' onChange={(e)=>{
              setRooms(e.target.value === '' ? null : e.target.value);              
            }}/>
            {rooms}
            <input className='input-filter' type='text' placeholder='עיר' onChange={(e)=>{
              setCity(e.target.value === '' ? null : e.target.value);
            }}/>
            {city}
            <select style={{width:"60%"}} className='input-filter' onChange={(e)=> {setBalcony(e.target.value === '' ? null : e.target.value)}} name="balcony" id="balcony">
              <option value="null">מרפסת?</option>
              <option value="yes">כן</option>
              <option value="no">לא</option>
            </select>

            <Button style={{width:"20%"}} variant='danger' type='submit'>החל</Button>
          </form>
          <br/>
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

export default PropertiesRent