import axios from "axios";


// const key = "7yAAjqLZ3yopz2q5w2XSoU2wff77g3CR"


export async function addressToGeocode(loc) {
    // const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`
    const url = `https://geocode.maps.co/search?q=${loc}`

    const res = await axios.get(url)

    const locations = {lat: res.data[0].lat, lng: res.data[0].lon}

    return locations

}

