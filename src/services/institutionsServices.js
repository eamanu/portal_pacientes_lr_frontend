import { API_ENDPOINTS_INSTITUCIONES, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function institutionsServices(tokenUser) {
  try {
    const promise = await get(API_ENDPOINTS_INSTITUCIONES, AUTH_HEADER(tokenUser))
    return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}