import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from '../components/HomePage'
import MyCard from '../components/MyCard'
import Tips from '../components/Tips'
import PhotoLoader from '../components/PhotoLoader'
import PropertiesSale from '../components/PropertiesSale'
import Signup from '../connection/Signup'
import Login from '../connection/Login'
import PropertyOfUser from '../components/PropertyOfUser'
import { AppContext } from '../App'
import AddAds from '../components/AddAds'
import PropertiesRent from '../components/PropertyRent'
import EditAds from '../components/EditAds'
import TipsOfUser from '../components/TipsOfUser'
import EditTips from '../components/EditTips'
import Brokers from '../components/Brokers'
import Contact from '../components/Contact'

function SiteRoutes() {
    const {onlogged} = useContext(AppContext)
    const nav = useNavigate()
  return (<>

    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/card' element={<MyCard/>}/>
        <Route path='/tips' element={<Tips/>}/>
        <Route path='/properties_sale' element={<PropertiesSale/>}/>
        <Route path='/properties_rent' element={<PropertiesRent/>}/>
        <Route path={'/my-properties'} element={<PropertyOfUser/>}/>
        <Route path={'/my-tips'} element={<TipsOfUser/>}/>
        <Route path={'/add-ads'} element={<AddAds/>}/>
        <Route path={'/edit-ads'} element={<EditAds/>}/>
        <Route path={'/edit-tips'} element={<EditTips/>}/>
        <Route path={'/brokers'} element={<Brokers/>}/>
        <Route path='/photo' element={<PhotoLoader/>}/>
        <Route path='/contact' element={<Contact/>}/>
    </Routes>
    </>)
}

export default SiteRoutes