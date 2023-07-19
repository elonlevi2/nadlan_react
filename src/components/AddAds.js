import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import { addPropertyFetch, addTipFetch } from '../client/axiosToAddAds';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { localhost } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '../config';


function AddAds() {
    const nav = useNavigate()

    const [photo, setPhoto] = useState()


    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(false)


    const [location, setLocation] = useState()
    const [address, setAddress] = useState()
    const [price, setPrice] = useState()
    const [size, setSize] = useState()
    const [rooms, setRooms] = useState()
    const [balcony, setBalcony] = useState()
    const [description, setDescription] = useState()
    const [type, setType] = useState()
    const [phone, setPhone] = useState()

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
        
        const res = await addPropertyFetch(location, address, price, size, rooms, balcony, description, type, phone);
        if (res) {
            toast.success('הדירה נשמרה בהצלחה', {
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
            notifyError("בעיה בשמירת הדירה");
          }
        
        const fd = new FormData()

        for (let i = 0; i < photo.length; i++) {
            fd.append(photo[i].name, photo[i])
          }
        
        const upload = await axios.post(`${localhost}photo?id=${res.id}`, fd, {headers: {'Accept': 'application/json'}})
        if (upload.status === 200) {
            console.log(upload.data)
            return upload.data;
          } else {
            // window.alert("Error Editing");
            notifyError("בעיה בהעלאת הדירה");
            console.log(upload.data)
            return false;
          }

    }

    const handelsubmittip = async (e)=> {
        e.preventDefault()
        if (!title | !content ) {
            setError('חובה למלא את הכל')
            return;
        } else {
            setError(false)
        }
        const res = await addTipFetch(title, content);
        if (res) {
            toast.success('הטיפ נשמרה בהצלחה', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => {
                nav('/my-tips');
              }
              });
            
          } else {
            notifyError("בעיה בשמירת הטיפ");
          }
    }

  return (<>

    <div className='div-main'>
        <Tabs
        defaultActiveKey="add_property"
        id="justify-tab-example"
        className="mb-3"
        justify
        variant='tabs'
        >
        <Tab eventKey="add_property" title="הוספת דירה" tabClassName='tab'>
            <Tab.Content className='tab-content-ads'>
                <div className='div-main-add-property'>
                    <div className='div-form-property'>

                        <form className='form-property' onSubmit={handelsubmitproperty}>

                            <div className='div-main-in-form-property'>

                                <div className='div-in-form-property'>
                                    <input className='form-property-text-number' type='text' placeholder='עיר' onChange={(e)=>{setLocation(e.target.value)}}></input>
                                    <input className='form-property-text-number' type='text' placeholder='כתובת' onChange={(e)=>{setAddress(e.target.value)}}></input>
                                    <input className='form-property-text-number' type='number' placeholder='מחיר' onChange={(e)=>{setPrice(e.target.value)}}></input>
                                    <input className='form-property-text-number' type='number' placeholder='מ״ר' onChange={(e)=>{setSize(e.target.value)}}></input>
                                    <input className='form-property-text-number' type='text' placeholder='חדרים' onChange={(e)=>{setRooms(e.target.value)}}></input>
                                    <input className='form-property-text-number' type='tel' placeholder='פלאפון ליצירת קשר דוגמא:0501234567' onChange={(e)=>{setPhone(e.target.value)}}
                                    pattern="[0-9]{10}"></input>
                                </div>

                                <div className='div-in-form-property'>
                                    <textarea placeholder='עוד מידע על נכס' onChange={(e)=>{setDescription(e.target.value)}}></textarea>

                                    <select onChange={(e)=>{setBalcony(e.target.value)}}>
                                        <option value='none'>מרפסת?</option>
                                        <option>yes</option>
                                        <option>no</option>
                                    </select>

                                    <select onChange={(e)=>{setType(e.target.value)}}>
                                        <option value='none'>סוג נכס</option>
                                        <option value='sale'>מכירה</option>
                                        <option value='rent'>שכירות</option>
                                    </select>
                                    <input type="file" accept='images/*' className='files-input' multiple
                                        onChange={(e) => { setPhoto(e.target.files); }} />
                                </div> 
                            </div>
                            {error && <p style={{color:'red'}}>{error}</p>}

                            <div>
                            <   Button className='submit' variant='success' type='submit'>הוסף</Button>
                            </div>
                        </form>
                        
                    </div>
                    <ToastContainer/>

                </div>
            </Tab.Content>
            
        </Tab>
        <Tab eventKey="add_tip" title="הוספת טיפ" tabClassName='tab'>
            <Tab.Content className='tab-content-ads'>
                <div className='div-main-add-tip'>

                    <div className='div-form'>
                        <form className='form' onSubmit={handelsubmittip}>
                            <input className='form-property-text-number' type='text' placeholder='כותרת הטיפ' value={title} onChange={(e)=> {setTitle(e.target.value)}}/>
                            <textarea className='form-property-text-number' placeholder='תוכן הטיפ' value={content} onChange={(e)=> {setContent(e.target.value)}}/>
                            {error && <p style={{color:'red'}}>{error}</p>}
                            {/* <input type='number'/> */}

                            <Button variant='success' type='submit'>הוסף</Button>
                        </form>
                    </div>
                </div>
                <ToastContainer/>

            </Tab.Content>            
        </Tab>
        </Tabs>

    </div>
    </>)
}

export default AddAds