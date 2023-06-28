import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import { addContact } from '../client/axiosToContact';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';



function ContactPage() {
    const [name, Setname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [showToast, setShowToast] = useState(false);
    const form = useRef();
    const nav = useNavigate()


    const sendEmail = async (e) => {
      e.preventDefault();

      const res = await addContact(name, email, message)
  
      emailjs.sendForm('service_gaogezg', 'template_ykqfqtl', form.current, 'Dnd0vTpr7StPYM2Fw')
        .then((result) => {
            console.log(result.text);
            setShowToast(true)
            nav('/contact')
            // window.alert("המייל נשלח")
        }, (error) => {
            console.log(error.text);
        })
    };

  return (<>
    <div className='div-main-contact-page' style={{direction:"rtl"}}>
        <h2>יצירת קשר</h2>
    <StyledContactForm className='form-contact-page' style={{direction:"rtl"}}>
        <form className='form-contact-page' ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="username" onChange={(e)=>{Setname(e.target.value)}} />
        <label>Email</label>
        <input type="email" name="useremail" onChange={(e)=>{setEmail(e.target.value)}} />
        <label>Message</label>
        <textarea name="message" onChange={(e)=>{setMessage(e.target.value)}} />
        <input type="submit" value="Send" />
        </form>
    </StyledContactForm>
    <Toast
    onClose={() => setShowToast(false)}
    show={showToast}
    delay={3000}
    autohide
    style={{
        position: 'absolute',
        top: '100%',
        left: '86%',
        transform: 'translate(-50%, -50%)',
    }}
    >
    <Toast.Header>
        <strong className="me-auto" style={{direction:"rtl"}}>success</strong>
    </Toast.Header>
    <Toast.Body style={{direction:"rtl"}} >המייל נשלח בהצלחה</Toast.Body>
    </Toast>
    </div>
  </>)
}

export default ContactPage

const StyledContactForm = styled.div`
  width: 60%;
  padding-right: 30rem;


  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;


    input {
      width: 150%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 150%;
      min-width: 100%;
      width: 150%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
  
  @media screen and (max-width: 450px) {
    width: 70%;
    padding-right: 5rem;
  
  
    form {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      font-size: 16px;
  
  
      input {
        width: 150%;
        height: 35px;
        padding: 7px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
  
        &:focus {
          border: 2px solid rgba(0, 206, 158, 1);
        }
      }
  
      textarea {
        max-width: 150%;
        min-width: 100%;
        width: 150%;
        max-height: 100px;
        min-height: 100px;
        padding: 7px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
  
        &:focus {
          border: 2px solid rgba(0, 206, 158, 1);
        }
      }
  
      label {
        margin-top: 1rem;
      }
  
      input[type="submit"] {
        margin-top: 2rem;
        cursor: pointer;
        background: rgb(249, 105, 14);
        color: white;
        border: none;
      }
    }
  
  }
`;