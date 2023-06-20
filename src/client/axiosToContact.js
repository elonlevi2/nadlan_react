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
        window.alert("Error adding");
        console.log(res.data)
        return false;
      }
    } catch (error) {
      window.alert("Error add contact");
      console.log(error)
      return false
    }
  }