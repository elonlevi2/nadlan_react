import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';


function ModalMailToBroker({show, setShow, emailBroker}) {
    const handleClose = () => setShow(false);
    const form = useRef();
    const nav = useNavigate()


    const sendEmail = async (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_gaogezg', 'template_43gzuyf', form.current, 'Dnd0vTpr7StPYM2Fw')
        .then((result) => {
            console.log(result.text);
            if (result.text) {
              window.alert("המייל נשלח")
            }
        }, (error) => {
            console.log(error.text);
        });
    };

  return (<>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>שליחת אמייל למתווך</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <StyledContactForm>
                <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="username"/>
                <label>Email broker</label>
                <input type="email" name="emailbroker" defaultValue={emailBroker} />
                <label>Email</label>
                <input type="email" name="useremail"/>
                <label>Message</label>
                <textarea name="message"/>
                <input type="submit" value="Send" />
                </form>
            </StyledContactForm>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>)
}

export default ModalMailToBroker

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
    width: 350px;

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