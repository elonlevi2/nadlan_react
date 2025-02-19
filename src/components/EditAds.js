import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetPropertyToEdit, axiosDeleteProperty } from '../client/axiosToApiProperies'
import { Button } from 'react-bootstrap'
import { EditPropertyFetch } from '../client/axiosToAddAds'
import axios from 'axios'
import { localhost } from '../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '../config';
import { city } from '../client/axiosGeocodeApi'

function EditAds() {

    const locationPath = useLocation()
    const search = new URLSearchParams(locationPath.search)
    const id = search.get("id")
    const nav = useNavigate()
    const [photo, setPhoto] = useState()
    const [allCity, setAllCity] = useState([]) 


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
        const res2 = await city()
        setAllCity([...res2.result.records])
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


    useEffect(()=>{console.log(photo)},[photo])
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
      if (res) {
        toast.success('הדירה נערכה בהצלחה', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            nav('/my-properties');
          }
          });
        
      } else {
        notifyError("בעיה בעריכת הדירה");
      }

      const fd = new FormData()
 
        for (let i = 0; i < photo.length; i++) {
          fd.append(photo[i].name, photo[i])
          }

        const upload = await axios.post(`${localhost}photo?id=${res.id}`, fd, {headers: {'Accept': 'application/json'}})
        if (upload.status === 200) {
          return upload.data;
        } else {
          notifyError("בעיה בהעלאת התמונה")
          return false;
        }
  

  
    }

    const deleteAds = async ()=>{
      const res = await axiosDeleteProperty(id)

      if (res) {
        toast.success('הדירה נמחקה בהצלחה', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            nav('/my-properties');
          }
          });
      }

    }

  return (<>
  <div>
  <div className='div-main-edit-property'>
      <div className='div-form-property-edit'>

        <form className='form-property-edit' onSubmit={handelsubmitproperty}>

          <div className='div-in-form-edit'>
          <input className='form-property-text-number-edit' type='text' placeholder='עיר' value={location} onChange={(e)=>{setLocation(e.target.value)}}></input>
              <div className='dropdown-city'>
                  {allCity.filter(line => {
                      const searchTerm = location
                      const city = line.שם_ישוב

                      return searchTerm && city.startsWith(searchTerm) && city !== searchTerm
                  })
                  .slice(0, 10)
                  .map((line)=> {return <div key={line._id} onClick={()=>{setLocation(line.שם_ישוב)}} className='dropdown-city-row'>{line.שם_ישוב}</div>
                  })}
              </div>
            <input className='form-property-text-number-edit' type='text' placeholder='כתובת' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
            <input className='form-property-text-number-edit' type='number' placeholder='מחיר' value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input className='form-property-text-number-edit' type='number' placeholder='מ״ר' value={size} onChange={(e)=>{setSize(e.target.value)}}></input>
            <input className='form-property-text-number-edit' type='text' placeholder='חדרים' value={rooms} onChange={(e)=>{setRooms(e.target.value)}}></input>
            <input className='form-property-text-number-edit' type='tel' placeholder='פלאפון ליצירת קשר דוגמא:0501234567' value={phone} onChange={(e)=>{setPhone(e.target.value)}}
            pattern="[0-9]{10}"></input>
          </div>

          <div className='div-in-form-edit'>
          <textarea className='form-property-textarea-edit' placeholder='עוד מידע על נכס' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>

            <select value={balcony} onChange={(e)=>{setBalcony(e.target.value)}}>
                <option value='none'>מרפסת?</option>
                <option>yes</option>
                <option>no</option>
            </select>

            <select value={type} onChange={(e)=>{setType(e.target.value)}}>
                <option value='none'>סוג נכס</option>
                <option value='sale'>מכירה</option>
                <option value='rent'>שכירות</option>
            </select>
            <input type="file" accept='images/*' className='files-input' multiple onChange={(e) => { setPhoto(e.target.files); }} /> 
          </div>

          {error && <p className='error-edit' style={{color:'red'}}>{error}</p>}

        <Button className='submit-edit' variant='success' type='submit'>שמור עריכה</Button>
        <Button className='delete-edit'  variant='danger' onClick={deleteAds}>מחיקת המודעה</Button>
        {/* <ToastContainer/> */}
        </form>

    </div>
    <ToastContainer/>

  </div>
  </div>

  </>)
}

export default EditAds