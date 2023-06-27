import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Tips from '../components/Tips'
import Signup from '../connection/Signup'
import Login from '../connection/Login'
import PropertyOfUser from '../components/PropertyOfUser'
import { AppContext } from '../App'
import AddAds from '../components/AddAds'
import EditAds from '../components/EditAds'
import TipsOfUser from '../components/TipsOfUser'
import EditTips from '../components/EditTips'
import Brokers from '../components/Brokers'
import EditProfile from '../components/EditProfile'
import Map from '../components/Map'
import About from '../components/About'
import Dashbord from '../components/Dashbord'
import ContactPage from '../components/ContactPage'
import Properties from '../components/Properties'


function PrivatePath({path, element}) {
  const token = localStorage.getItem('token');
  const onlogged = token && token.length > 0;
  const issuperuser = localStorage.getItem('issuperuser') === "true";

  const location = useLocation();

  if (!onlogged || ((path === "/dashbord") && !issuperuser)){
    return <Navigate to='/login' state={{from: location.pathname}} replace />;
  }

  return element;
  
}

function SiteRoutes() {
    
  return (<>

    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/tips' element={<Tips/>}/>
        <Route path='/properties_sale' element={<Properties/>}/>
        <Route path='/properties_rent' element={<Properties/>}/>
        <Route path={'/my-properties'} element={<PrivatePath path='/my-properties' element={<PropertyOfUser/>}/>}/>
        <Route path={'/my-tips'} element={<PrivatePath path='/my-tips' element={<TipsOfUser/>}/>}/>
        <Route path={'/add-ads'} element={<PrivatePath path='/add-ads' element={<AddAds/>}/>}/>
        <Route path={'/edit-ads'} element={<PrivatePath path='/edit-ads' element={<EditAds/>}/>}/>
        <Route path={'/edit-tips'} element={<PrivatePath path='/edit-tips' element={<EditTips/>}/>}/>
        <Route path={'/brokers'} element={<Brokers/>}/>
        <Route path={'/edit-profile'} element={<PrivatePath path='/edit-profile' element={<EditProfile/>}/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/dashbord' element={<PrivatePath path='/dashbord' element={<Dashbord/>}/>}/>
    </Routes>
    </>)
}

export default SiteRoutes