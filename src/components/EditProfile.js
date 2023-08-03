import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { UserFetch } from '../client/axiosToApiProperies'
import { validateToken } from '../client/connectionClient'
import { editProfileFetch } from '../client/axiosToEditProfile'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '../config';


function EditProfile() {
    const nav = useNavigate()
    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [error, setError] = useState(false)

    useEffect(()=>{
        fetch = async ()=>{
            const chekID = await validateToken()
            setId(chekID.id)
            const res = await UserFetch(chekID.id);
            setFirstname(res.data[0].first_name)
            setLastname(res.data[0].last_name)
            setUsername(res.data[0].username)
            setEmail(res.data[0].email)
        }
      fetch()
      },[])

    const handelsubmit = async (e)=>{
        e.preventDefault()

        if (!firstname | !lastname | !username | !email) {
            setError('חובה למלא את הכל')
            return;
        } else {
            setError(false)
        }

        const res = await editProfileFetch(firstname, lastname, username, email, id);
        if (res.msg === "success") {
          console.log(res)
          toast.success('הפרופיל נערך בהצלחה', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              nav('/');
            }
            });
          } else if (res.msg === "error") {
            console.log(res.data);
            if (res.data['email']){
              setError('האימייל לא חוקי')
            }
            notifyError("בעיה בעריכת הפרופיל");
            return;
          } 
          else {
            notifyError("בעיה בעריכת הפרופיל");
        }
    }

  return (
    <div className='div-main'>
        <form className='form-user' onSubmit={handelsubmit}>
            <input className='form-user-input' type='text' placeholder='שם פרטי' value={firstname} onChange={(e)=> {setFirstname(e.target.value)}}/>
            <input className='form-user-input' type='text' placeholder='שם משפחה' value={lastname} onChange={(e)=> {setLastname(e.target.value)}}/>
            <input disabled className='form-user-input' type='text' placeholder='username' value={username} onChange={(e)=> {setUsername(e.target.value)}}/>
            <input className='form-user-input' type='email' placeholder='Email' value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            {error && <> <p style={{color:'red'}}>{error}</p></>}

            <Button className='user-submit' variant='success' type='submit'>ערוך</Button>
        </form>
        <br/>
        <br/>
        <ToastContainer/>

    </div>
  )
}
export default EditProfile