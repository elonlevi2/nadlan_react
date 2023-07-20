import axios from "axios";
import { localhost } from "../config";


export async function addContact(name, email, message) {
    const data = {
      name:name,
      email:email,
      message:message
    };
    try {
      const res = await axios.post(`${localhost}contact/add`, data);
  
      if (res.status == 200) {
        return res.data;
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  export async function sendMail(name, email, message) {
    const option = {
      headers:{'Content-Type': 'application/json'},
      data: {name: name, email:email, message:message}
    };
    try {
      const res = await axios.post(`${localhost}sendmail/contact`, option);

      if (res.status == 200) {
        console.log(res.data)
        return res.data;
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  export async function sendMailBroker(name, emailBroker, email, message) {
    const option = {
      headers:{'Content-Type': 'application/json'},
      data: {name: name, emailBroker:emailBroker, email:email, message:message}
    };
    try {
      const res = await axios.post(`${localhost}sendmail/broker`, option);

      if (res.status == 200) {
        console.log(res.data)
        return res.data;
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }