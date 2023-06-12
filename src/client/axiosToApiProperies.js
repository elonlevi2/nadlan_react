import axios from 'axios'


export async function propertiesSaleFetch(page_num, page_size, rooms, city, balcony) {
    const url = `http://127.0.0.1:8000/api/properties_sale/sale/${rooms}/${city}/${balcony}?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function propertiesRentFetch(page_num, page_size, rooms, city, balcony) {
    const url = `http://127.0.0.1:8000/api/properties_sale/rent/${rooms}/${city}/${balcony}?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function PhotoFetch(id) {
    const url = `http://127.0.0.1:8000/api/photo?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function UserFetch(id) {
    const url = `http://127.0.0.1:8000/api/user/user?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function GetPropertyToEdit(id) {
    const url = `http://localhost:8000/api/property/get?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function propertiesToMap() {
    const url = `http://127.0.0.1:8000/api/property/get`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

export async function propertiesToHome() {
    const url = `http://127.0.0.1:8000/api/property/home`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function axiosDeleteProperty(id) {
    const url = `http://localhost:8000/api/property/delete?id=${id}`
    try {
        const response = await axios.delete(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

