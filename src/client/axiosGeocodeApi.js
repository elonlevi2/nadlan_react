import axios from "axios";


const key = "7yAAjqLZ3yopz2q5w2XSoU2wff77g3CR"

const location = "ירושלים"


export async function addressToGeocode(loc) {
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`

    const res = await axios.get(url)

    const locations = res.data.results[0].locations

    return locations[0].latLng

}

