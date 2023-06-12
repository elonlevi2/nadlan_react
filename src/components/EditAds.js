import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetPropertyToEdit, axiosDeleteProperty } from '../client/axiosToApiProperies'
import { Button } from 'react-bootstrap'
import { EditPropertyFetch } from '../client/axiosToAddAds'

function EditAds() {

    const locationPath = useLocation()
    const search = new URLSearchParams(locationPath.search)
    const id = search.get("id")
    const nav = useNavigate()

    useEffect(()=>{
      fetch = async ()=>{
        const res = await GetPropertyToEdit(id);
        setLocation(res.location)
        setAddress(res.address)
        setPrice(res.price)
        setSize(res.size)
        setRooms(res.rooms)
        setBalcony(res.balcony)
        setDescription(res.description)
        setType(res.type)
        setPhone(res.phone)
      }
    fetch()
    },[])

    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('')
    const [rooms, setRooms] = useState('')
    const [balcony, setBalcony] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(false)



    const handelsubmitproperty = async (e)=> {
      e.preventDefault()
      if (!location | !address | !price | !size | !rooms | balcony === "none" | !balcony | !description | type === "none" | !type | !phone) {
          setError('חובה למלא את הכל')
          console.log('eror')
          return;
      } else {
          setError(false)
      }

      if (!isNaN(price) && parseInt(price) < 0 | !isNaN(size) && parseInt(size) < 0 ){  //check if number or text
              setError('המחיר או המ״ר חייב להיות מספר חיובי')
              return;
          } else {
            setError(false)
        }
        
      const res = await EditPropertyFetch(location, address, price, size, rooms, balcony, description, type, phone, id);
      nav('/my-properties')            
      window.alert('הדירה נערכה בהצלחה')
    }

    const deleteAds = async ()=>{
      const res = await axiosDeleteProperty(id)
      nav('/my-properties')
      window.alert(res)
    }

  return (<>
  <div>
  <div className='div-main-add-property'>
      <div className='div-form-property'>

        <form className='form-property' onSubmit={handelsubmitproperty}>

          <input type='text' placeholder='עיר' value={location} onChange={(e)=>{setLocation(e.target.value)}}></input>
          <input type='text' placeholder='כתובת' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
          <input type='number' placeholder='מחיר' value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
          <input type='number' placeholder='מ״ר' value={size} onChange={(e)=>{setSize(e.target.value)}}></input>
          <input type='text' placeholder='חדרים' value={rooms} onChange={(e)=>{setRooms(e.target.value)}}></input>
          <input type='tel' placeholder='פלאפון ליצירת קשר דוגמא:0501234567' value={phone} onChange={(e)=>{setPhone(e.target.value)}}
          pattern="[0-9]{10}"></input>
          <select value={balcony} onChange={(e)=>{setBalcony(e.target.value)}}>
              <option value='none'>מרפסת?</option>
              <option>yes</option>
              <option>no</option>
          </select>

          <textarea placeholder='עוד מידע על נכס' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
          <select value={type} onChange={(e)=>{setType(e.target.value)}}>
              <option value='none'>סוג נכס</option>
              <option value='sale'>מכירה</option>
              <option value='rent'>שכירות</option>
          </select> 

          {error && <p style={{color:'red'}}>{error}</p>}

          <Button variant='success' type='submit'>הוסף</Button>
        </form>
        <Button variant='warning' onClick={deleteAds}>delete property</Button>
    </div>
  </div>
  </div>
  </>)
}

export default EditAds