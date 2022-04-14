import { API_ENDPOINTS_PARAMETRIC, API_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function identificationsTypeServices() {
    try {
    const promise = await get(`${API_ENDPOINTS_PARAMETRIC}/identificationtypes`, API_HEADER())
    return promise
    }
    catch (err) {
      console.log('Error al cargar las instituciones: ', err);
    }
  }