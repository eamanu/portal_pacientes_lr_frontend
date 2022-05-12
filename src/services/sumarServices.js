
import { API_ENDPOINT_SUMAR, API_HEADER, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function sumarServices(idn) {
  try {
    const promise = await get(API_ENDPOINT_SUMAR(idn), API_HEADER())
    return promise
  }
  catch (err) {
    console.log('Error al cargar Sumar: ', err);
  }
}
