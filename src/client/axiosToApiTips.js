import axios from 'axios'
import { validateToken } from './connectionClient'


export async function tipsFetch(page_num, page_size) {
    const url = `http://127.0.0.1:8000/api/tips/pagination?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function tipsOfUserAxios(page_num, page_size) {
    const user = await validateToken()
    const url = `http://127.0.0.1:8000/api/my-tips?page_size=${page_size}&page_num=${page_num}&id=${user.id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function GetTipToEdit(id) {
    const url = `http://localhost:8000/api/tips/get?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}