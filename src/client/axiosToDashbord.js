import axios from "axios";


export async function axoisDeleteUser(id) {
    try {
      const res = await axios.delete(`http://localhost:8000/api/user/delete?id=${id}`);
  
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

  export async function axoisGeneralUsers() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/dashboard/users");
      return res.data
    } catch (error) {
      window.alert("Error add contact");
      console.log(error)
      return false
    }
  }

  export async function axoisGeneralPropertySale() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/dashboard/property_sale");
      return res.data
    } catch (error) {
      window.alert("Error add contact");
      console.log(error)
      return false
    }
  }

  export async function axoisGeneralPropertyRent() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/dashboard/property_rent");
      return res.data
    } catch (error) {
      window.alert("Error add contact");
      console.log(error)
      return false
    }
  }

  export async function axoisGeneralMessages() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/dashboard/messages");
      return res.data
    } catch (error) {
      window.alert("Error add contact");
      console.log(error)
      return false
    }
  }