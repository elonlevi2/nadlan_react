import axios from 'axios'
import { validateToken } from './connectionClient'
import { localhost } from '../config'


export async function tipsFetch(page_num, page_size) {
    const url = `${localhost}tips/pagination?page_size=${page_size}&page_num=${page_num}`
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
    const url = `${localhost}my-tips?page_size=${page_size}&page_num=${page_num}&id=${user.id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}


export async function GetTipToEdit(id) {
    const url = `${localhost}tips/get?id=${id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}

export async function axiosDeleteTip(id) {
    const url = `${localhost}tips/delete?id=${id}`
    try {
        const response = await axios.delete(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        return false;
    }
    
}