import axios from "axios";
import { validateToken } from "./connectionClient"

export async function addTipFetch(title, content) {
    const user = await validateToken()

    const data = {
      title: title,
      content: content,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.post("http://localhost:8000/api/tips/add", data);
  
      if (res.status == 200) {
        return res.data;
      } else {
        window.alert("Error adding");
        console.log(res.data)
        return false;
      }
    } catch (error) {
      window.alert("Error add tip");
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
      const res = await axios.put(`http://localhost:8000/api/tips/edit?id=${id}`, data);
  
      if (res.status == 200) {
        return res.data;
      } else {
        window.alert("Error edited");
        console.log(res.data)
        return false;
      }
    } catch (error) {
      window.alert("Error edited tip");
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
      size:price,
      rooms:rooms,
      balcony:balcony,
      description:description,
      type:type,
      phone:phone,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.post("http://localhost:8000/api/property/add", data);
  
      if (res.status == 200) {
        return res.data;
      } else {
        window.alert("Error adding");
        console.log(res.data)
        return false;
      }
    } catch (error) {
      window.alert("Error add property");
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
      size:price,
      rooms:rooms,
      balcony:balcony,
      description:description,
      type:type,
      phone:phone,
      real_estate: user.id[0]
    };
    try {
      const res = await axios.put(`http://localhost:8000/api/property/edit?id=${id}`, data);
  
      if (res.status == 200) {
        return res.data;
      } else {
        window.alert("Error edited");
        console.log(res.data)
        return false;
      }
    } catch (error) {
      window.alert("Error edited property");
      console.log(error)
      return false
    }
  }



