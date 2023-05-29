import axios from "axios";


export async function addContact(name, email, message) {
    const data = {
      name:name,
      email:email,
      message:message
    };
    try {
      const res = await axios.post("http://localhost:8000/api/contact/add", data);
  
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