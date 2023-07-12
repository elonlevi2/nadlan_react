import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import '../client/axiosToApiProperies'
import { propertiesRentFetchNew, propertiesSaleFetchNew } from '../client/axiosToApiProperies'
import CardOfProperty from './CardOfProperty'
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'


function Properties() {

    const location = useLocation()
    const path = location.pathname

    const [properties, setProperties] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)
    const [rooms, setRooms] = useState(null)
    const [city, setCity] = useState(null)
    const [balcony, setBalcony] = useState(null)
    const [price, setPrice] = useState(null)
    const [filter, setFilter] = useState(false)

      
    const addProperties = async ()=> {
      if (path === "/properties_sale") {
        const res = await propertiesSaleFetchNew(pagenum, 10, rooms, city, balcony, price) 

        if (!res.has_more) {
          setHasmore(false)
        }

        setPagenum((prev) => {
          return prev + 1;
        });

        const newProperties = [...properties, ...res.data]

        setProperties(newProperties)

      } else if (path === "/properties_rent") {
        const res = await propertiesRentFetchNew(pagenum, 10, rooms, city, balcony, price) 

        if (!res.has_more) {
          setHasmore(false)
        }
        setPagenum((prev) => {
          return prev + 1;
        });

        const newProperties = [...properties, ...res.data]

        setProperties(newProperties)
      }

      } 

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
        resetfilter()
      }, [path])

      const resetfilter = ()=> {
        setProperties([])
        setPagenum(0)
        setRooms(null)
        setCity(null)
        setBalcony(null)
        setPrice(null)
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
            <input className='input-filter' type='number' placeholder='מספר חדרים' onChange={(e)=>{
              setRooms(e.target.value === '' ? null : e.target.value);              
            }}/>

            <input className='input-filter' type='text' placeholder='עיר' onChange={(e)=>{
              setCity(e.target.value === '' ? null : e.target.value);
            }}/>
            <input className='input-filter' type='number' placeholder='מחיר עד:' onChange={(e)=>{
              setPrice(e.target.value === '' ? null : e.target.value);   
            }}/>
            <select style={{width:"60%"}} className='input-filter' onChange={(e)=> {setBalcony(e.target.value === '' ? null : e.target.value)}} name="balcony" id="balcony">
              <option value="null">מרפסת?</option>
              <option value="yes">כן</option>
              <option value="no">לא</option>
            </select>

            <Button className='buttom-applied-filter' variant='danger' type='submit'>החל</Button>
          </form>
          <br/>
          <Button variant='success' onClick={resetfilter}>איפוס הסינון</Button>

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

export default Properties