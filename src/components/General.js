import React, { useEffect, useState } from 'react'
import { axoisGeneralMessages, axoisGeneralPropertyRent, axoisGeneralPropertySale, axoisGeneralUsers } from '../client/axiosToDashbord'

function General() {
    const [users, setUsers] = useState('')
    const [sale, setSale] = useState('')
    const [rent, setRent] = useState('')
    const [messages, setMessages] = useState('')


    useEffect(()=>{
        async function axios() {
            const users = await axoisGeneralUsers()
            setUsers(users)
            const sale = await axoisGeneralPropertySale()
            setSale(sale)
            const rent = await axoisGeneralPropertyRent()
            setRent(rent)
            const message = await axoisGeneralMessages()
            setMessages(message)
        }
        axios()
    },[])
  return (<>
        <div className='div-general'>
            <div className='div-box'>
                <h5> משתמשים רשומים </h5>

                <p>{users}</p>
            </div>

            <div className='div-box'>
                <h5> דירות למכירה</h5>
                <p>{sale}</p>
            </div>

            <div className='div-box'>
                <h5> דירות להשכרה</h5>
                <p>{rent}</p>
            </div>
            <div className='div-box'>
                <h5> פניות למנהל האתר</h5>
                <p>{messages}</p>
            </div>

        </div>
  </>)
}

export default General