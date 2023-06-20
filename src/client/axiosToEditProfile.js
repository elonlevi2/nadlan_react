import axios from "axios";
import { localhost } from "../config";

export async function editProfileFetch(firstname, lastname, username, email, id) {
    const data = {
        first_name: firstname,
        last_name: lastname,
        username: username,
        email: email,

    };
    try {
      const res = await axios.put(`${localhost}user/edit?id=${id}`, data);
  
      if (res.status == 200) {
        return res.data;
      } else {
        window.alert("Error edited");
        console.log(res.data)
        return false;
      }
    } catch (error) {
      window.alert("Error edited profile");
      console.log(error)
      return false
    }
  }