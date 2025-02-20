import axios from "axios";
import { validateToken } from "./connectionClient"
import { localhost } from '../config'

export async function addTipFetch(title, content) {
    const user = await validateToken()

    const data = {
      title: title,
      content: content,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.post(`${localhost}tips/add`, data);
  
      if (res.status === 200) {
        return true;
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  export async function editTipFetch(title, content, id) {
    const user = await validateToken()

    const data = {
      title: title,
      content: content,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.put(`${localhost}tips/edit?id=${id}`, data);
  
      if (res.status === 200) {
        return true;
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  export async function addPropertyFetch(location, address, price, size, rooms, balcony, description, type, phone) {
    const user = await validateToken()

    const data = {
      location:location,
      address:address,
      price:price,
      size:size,
      rooms:rooms,
      balcony:balcony,
      description:description,
      type:type,
      phone:phone,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.post(`${localhost}property/add`, data);
  
      if (res.status === 200) {
        return true
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }


  export async function EditPropertyFetch(location, address, price, size, rooms, balcony, description, type, phone, id) {
    const user = await validateToken()

    const data = {
      location:location,
      address:address,
      price:price,
      size:size,
      rooms:rooms,
      balcony:balcony,
      description:description,
      type:type,
      phone:phone,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.put(`${localhost}property/edit?id=${id}`, data);
  
      if (res.status === 200) {
        return true;
      } else {
        console.log(res.data)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }



