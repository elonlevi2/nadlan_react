import axios from 'axios'


export async function propertiesSaleFetch(page_num, page_size) {
    const url = `http://127.0.0.1:8000/api/properties_sale/sale?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

export async function propertiesSaleFilterFetch(page_num, page_size, rooms, city) {
    const url = `http://127.0.0.1:8000/api/properties_sale/filters?page_size=${page_size}&page_num=${page_num}&rooms=${rooms}&city=${city}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

export async function propertiesRentFetch(action, page_num, page_size, rooms) {
    const url = `http://127.0.0.1:8000/api/properties_sale/${action}?page_size=${page_size}&page_num=${page_num}&rooms=${rooms}`
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