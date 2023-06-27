import axios from 'axios'
import { localhost } from '../config'


export async function propertiesSaleFetchNew(page_num, page_size, rooms, city, balcony, price) {
    const url = `${localhost}properties_sale/sale?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.post(url, {
            headers:{'Content-Type': 'application/json'},
            filter: {rooms: rooms, city:city, balcony:balcony, price:price}
        })
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function propertiesRentFetchNew(page_num, page_size, rooms, city, balcony, price) {
    const url = `${localhost}properties_sale/rent?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.post(url, {
            headers:{'Content-Type': 'application/json'},
            filter: {rooms: rooms, city:city, balcony:balcony, price:price}
        })
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function PhotoFetch(id) {
    const url = `${localhost}photo?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function UserFetch(id) {
    const url = `${localhost}user/user?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function GetPropertyToEdit(id) {
    const url = `${localhost}property/get?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function propertiesToMap() {
    const url = `${localhost}property/get`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

export async function propertiesToHome() {
    const url = `${localhost}property/home`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

export async function axiosDeleteProperty(id) {
    const url = `${localhost}property/delete?id=${id}`
    try {
        const response = await axios.delete(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

