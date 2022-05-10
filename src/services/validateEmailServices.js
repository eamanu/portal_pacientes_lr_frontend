import { API_ENDPOINT_VALIDATEEMAIL, API_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function validateEmailServices(token) {
  try {
    const promise = await get(API_ENDPOINT_VALIDATEEMAIL(token), API_HEADER())
   return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}
