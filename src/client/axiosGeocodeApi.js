import axios from "axios";


// const key = "7yAAjqLZ3yopz2q5w2XSoU2wff77g3CR"


export async function addressToGeocode(loc) {
    // const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`
    const url = `https://geocode.maps.co/search?q=${loc}`

    const res = await axios.get(url)

    const locations = {lat: res.data[0].lat, lng: res.data[0].lon}

    return locations

}


export async function city(loc) {
    // const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${loc}`
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=100000`

    const res = await axios.get(url)

    return res.data

}

