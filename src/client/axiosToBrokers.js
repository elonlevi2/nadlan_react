import axios from 'axios'

export async function brokersFetch(page_num, page_size) {
    const url = `http://127.0.0.1:8000/api/user/brokers?page_size=${page_size}&page_num=${page_num}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}