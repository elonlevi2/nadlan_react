import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from '../components/HomePage'
import MyCard from '../components/MyCard'
import Tips from '../components/Tips'
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
import EditProfile from '../components/EditProfile'
import Map from '../components/Map'
import About from '../components/About'
import Dashbord from '../components/Dashbord'
import ContactPage from '../components/ContactPage'
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers'

function SiteRoutes() {
    const {onlogged} = useContext(AppContext)
    const nav = useNavigate()

    const token = localStorage.key('token')
    
  return (<>

    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
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
        <Route path={'/edit-profile'} element={<EditProfile/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/dashbord' element={<Dashbord/>}/>
    </Routes>
    </>)
}

export default SiteRoutes