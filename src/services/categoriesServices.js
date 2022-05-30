import { API_ENDPOINT_CATEGORIES, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function categoriesServices() {
  try {
    const promise = await get(API_ENDPOINT_CATEGORIES, AUTH_HEADER())
   return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}
