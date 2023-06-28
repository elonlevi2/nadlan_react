import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getLoginToken, validateToken } from '../client/connectionClient'

const backgroundimage = process.env.PUBLIC_URL + '/login.jpg'


function Login() {
    const {username, setUsername, setOnlogged, setIduser, setSuperUser} = useContext(AppContext)
    const [password, setPassword] = useState('')
    

    const nav = useNavigate();


    const handelsubmit = async (e)=> {
        e.preventDefault()
        const token = await getLoginToken(username, password)

        if (token) {
            setOnlogged(true);
            const data = await validateToken();
            setIduser(data.id)
            setUsername(data.user);
            nav("/");
          } else {
            window.alert('error at login');
          }
    }
  return (<>
    
    <div className='div-all-page' style={{backgroundImage: `url(${backgroundimage})`}} >
        <div className='div-of-card-form-login'>

            <div className='div-title-card-form-login'>
                <h2>התחברות</h2>
            </div>

            <form onSubmit={handelsubmit}>

                <div className='div-input-login'>
                    <input type='text' placeholder='username' value={username} onChange={(e)=> {setUsername(e.target.value)}}/>
                    <input type='password' placeholder='סיסמא' value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
                </div>

                <Button size='lg' variant="outline-success" type='submit' className='btn-submit-login'>התחבר</Button>
                <br/>
                <br/>
                <Link to='/signup' variant="danger" className='link-login-to-signup'>רשום? לחץ כאן להרשמה</Link>
            </form>

        </div>

    
    </div>
    </>)
}

export default Login