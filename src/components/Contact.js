import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { addContact, sendMail } from '../client/axiosToContact';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify, notifyError } from '../config';


function Contact() {
    const [name, Setname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const form = useRef();
    const nav = useNavigate()


    const sendEmail = async (e) => {
      e.preventDefault();

      const res = await addContact(name, email, message)
      const send = await sendMail(name, email, message)
      
      if (send.status == "success"){
        notify("המייל נשלח בהצלחה")
      }
      else if (send.status == "error"){
        notifyError('בעיה בשליחת המייל')
      }

    };

  return (<>
  <div style={{direction:"rtl"}}>
  <StyledContactForm style={{direction:"rtl"}}>
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="username" onChange={(e)=>{Setname(e.target.value)}} />
      <label>Email</label>
      <input type="email" name="useremail" onChange={(e)=>{setEmail(e.target.value)}} />
      <label>Message</label>
      <textarea name="message" onChange={(e)=>{setMessage(e.target.value)}} />
      <input type="submit" value="Send" />
    </form>
    </StyledContactForm>
    <ToastContainer/>
    </div>
  </>)
}

export default Contact

const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
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
      max-width: 100%;
      min-width: 100%;
      width: 100%;
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
    width: 200px;

    form {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      font-size: 16px;
  
      input {
        width: 100%;
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
        max-width: 100%;
        min-width: 100%;
        width: 100%;
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