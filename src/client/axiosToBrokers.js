import axios from 'axios'
import { localhost } from '../config'

export async function brokersFetch(page_num, page_size) {
    const url = `${localhost}user/brokers?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}