import { validateToken } from "./connectionClient"
import axios from "axios"

export async function propertiesOfUseraxios(page_num, page_size) {
    const user = await validateToken()
    const url = `http://127.0.0.1:8000/api/my-properties?page_size=${page_size}&page_num=${page_num}&id=${user.id}`
    try {
        const response = await axios.get(url)
        console.assert(response.status == 200)
        return response.data
    } catch (error){
        console.error("error:", error)
    }
    
}