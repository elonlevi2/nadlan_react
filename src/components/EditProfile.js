import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { UserFetch } from '../client/axiosToApiProperies'
import { validateToken } from '../client/connectionClient'
import { editProfileFetch } from '../client/axiosToEditProfile'
import { useNavigate } from 'react-router-dom'

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
        if (res == "objects updated"){
            nav('/')
            window.alert('הפרופיל נערך בהצלחה') 
        } else if (res.includes('Enter a valid username')) {
            setError('הזן שם חוקי ללא רווחים')
            return;
        }
    }

  return (
    <div className='div-main'>
        <form className='form-user' onSubmit={handelsubmit}>
            <input className='form-user-input' type='text' placeholder='שם פרטי' value={firstname} onChange={(e)=> {setFirstname(e.target.value)}}/>
            <input className='form-user-input' type='text' placeholder='שם משפחה' value={lastname} onChange={(e)=> {setLastname(e.target.value)}}/>
            <input className='form-user-input' type='text' placeholder='username' value={username} onChange={(e)=> {setUsername(e.target.value)}} pattern='/[\p{Hebrew}][a-zA-Z][0-9]+$/u'/>
            <input className='form-user-input' type='email' placeholder='Email' value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            {error && <> <p style={{color:'red'}}>{error}</p></>}

            <Button className='user-submit' variant='success' type='submit'>ערוך</Button>
        </form>
        <br/>
        <br/>

    </div>
  )
}
export default EditProfile