const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
export default async function searchAddressService (address) {

    const params = {
        // place_id: "53723809",
        q: address,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        headers: {
            "Accept-Language": "es"
        },
        redirect: "follow" 
    };
    const promise = await fetch(`${NOMINATIM_BASE_URL}/search?${queryString}`, requestOptions)
    .then((response) => {
       return response.text()
    })
    .then((result) => {
        // console.log('searchAddress',JSON.parse(result));
        return JSON.parse(result);
    })
    .catch((err) => {console.log("error: ", err)})
    return promise
}
export async function searchAddressByLatLonService (lat, lon) {

    const params = {
        format: "json",
        lat: lat,
        lon: lon,
        addressdetails: 1,
        polygon_geojson: 0
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        headers: {
            "Accept-Language": "es"
        },
        redirect: "follow" 
    };
    const promise = await fetch(`${NOMINATIM_BASE_URL}/reverse?${queryString}`, requestOptions)
    .then((response) => {
       return response.text()
    })
    .then((result) => {
        // console.log('completeaddress',JSON.parse(result));
        return JSON.parse(result);
    })
    .catch((err) => {console.log("error: ",err)})
    return promise
}