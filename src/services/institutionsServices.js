import { API_ENDPOINTS_INSTITUCIONES, API_HEADER, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function institutionsServices() {
  try {
    const promise = await get(API_ENDPOINTS_INSTITUCIONES, API_HEADER())
   return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}

// export async function getInstitutions () {
//     try {
//       const promise = await institutionsServices()
//       return promise
//     }
//     catch ( err ) {    
//       console.log('Error al cargar las instituciones: ', err);
//     }
// }