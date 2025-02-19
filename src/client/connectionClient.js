import axios from "axios";
import { localhost } from "../config";

export async function signup(username, password, email, firstname, lastname) {

    const data = {
      username: username,
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname,
    };
    try {
      const res = await axios.post(`${localhost}signup`, data);
  
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        return res.data;
      } else {
        window.alert("Error signup");
        return false;
      }
    } catch (error) {
      window.alert("Error signup");
      console.log(error)
      return false
    }
  }


  export async function getLoginToken(username, password) {
    try {
      const res = await axios.post(`${localhost}login`, {
        username: username,
        password: password,
      });
      const token = res.data.token;
  
      if (res.status == 200) {
        localStorage.setItem("token", token);
        return token;
      } else {
        return false;
      }
    } catch (error) {
      return false
    }
  }

  export async function validateToken() {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${localhost}check-token`, {
        headers: { Authorization: `token ${token}` },
      });
      if (res.data.superuser) {
        localStorage.setItem("issuperuser", res.data.superuser);
      } else {
        localStorage.setItem("issuperuser", false);
      }
      if (res.status == 200) {
        return res.data;
      } else {
        return false;
      }
    } catch (error) {
      return false
    }
  }
  