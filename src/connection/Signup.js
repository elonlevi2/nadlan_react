import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "../client/connectionClient"
import { signup } from '../client/connectionClient';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const backgroundimage = process.env.PUBLIC_URL + '/signup.jpg'


function Signup() {
    const nav = useNavigate();

    const {username, setUsername, onlogged, setOnlogged} = useContext(AppContext)

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rpassword, setRpassword] = useState('')
    const [errorpassword, setErrorpassword] = useState(false)
    const [error, setError] = useState(false)

    const handelsubmit = async (e)=> {
        e.preventDefault()

        if (rpassword != password) {
            setErrorpassword("הססמא לא זהה לססמא שהזנת")
            return;
        } 

        if (!firstname | !lastname | !username | !email | !password | !rpassword ) {
            setError('חובה למלא את הכל')
            return;
        } else {
            setError(false)
        }

        const res = await signup(username, password, email, firstname, lastname);

        if (res === 'UNIQUE constraint failed: auth_user.username') {
            window.alert(res)
            setError("username בשימוש")
        } else {
            setError(false)
        }

        if (res.status === 'success') {
            setOnlogged(true)
            nav('/')
        }

    }


  return (<>
    <div className='div-all-page' style={{backgroundImage: `url(${backgroundimage})`}}>

        <div className='div-of-card-form'>

            <div className='div-title-card-form'>
                <h2>הרשמה</h2>
            </div>

            <form onSubmit={handelsubmit}>

                <div className='div-input'>
                    <input type='text' placeholder='שם פרטי' value={firstname} onChange={(e)=> {setFirstname(e.target.value)}}/>
                    <input type='text' placeholder='שם משפחה' value={lastname} onChange={(e)=> {setLastname(e.target.value)}}/>
                    <input type='text' placeholder='username' value={username} onChange={(e)=> {setUsername(e.target.value)}}/>
                    <input type='email' placeholder='email' value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                    <input type='password' placeholder='סיסמא' value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
                    <input type='password' placeholder='הזן סיסמא שוב' value={rpassword} onChange={(e)=> {setRpassword(e.target.value)}}/>
                    {errorpassword && <p style={{color:'red'}}>{errorpassword}</p>}
                    {error && <p style={{color:'red'}}>{error}</p>}
                </div>

                <Button size='lg' variant="outline-success" type='submit' className='btn-submit'>הרשמה</Button>
                
            </form>
            
        </div>

    </div>

    </>
  )
}

export default Signup