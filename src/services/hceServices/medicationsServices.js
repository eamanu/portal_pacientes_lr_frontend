import { API_ENDPOINT_MEDICATIONS, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function medicationsServices(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINT_MEDICATIONS(institution_id,patient_id), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar medications: ', err);
  }
}