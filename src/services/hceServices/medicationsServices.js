import { API_ENDPOINTS_MEDICATIONS, API_HEADER, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function medicationsServices(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINTS_MEDICATIONS(institution_id,patient_id), API_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar medications: ', err);
  }
}