import { createContext, useEffect, useState } from "react";
import NavbarHome from "./NavbarHome";
import HomePage from "./components/HomePage";
import MyCard from "./components/MyCard";
import SiteRoutes from "./siteroutes/SiteRoutes";
import { validateToken } from "./client/connectionClient";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null)


function App() {
  const [onlogged, setOnlogged] = useState(localStorage.token && localStorage.token !== 'undefined' ? true : false )
  const [username, setUsername] = useState('')
  const [idUser, setIduser] = useState()
  const[superuser, setSuperUser] = useState(false)


  const nav = useNavigate()

  useEffect(()=>{
    validateToken().then((response)=>{
      if (response) {
        setIduser(response.id)
        setOnlogged(true)
        setUsername(response.user)
      } 
      // else {
      //   localStorage.removeItem("token");
      //   setOnlogged(false)
      //   nav('/');

      // }
    })
  },[])

  return (<>
  <AppContext.Provider value={{onlogged, setOnlogged, setUsername, username, idUser, setIduser, superuser, setSuperUser}}>
      <NavbarHome/>
      <SiteRoutes/>
  </AppContext.Provider>
    </>);
}

export default App;
