import { API_ENDPOINTS_ALLERGIES, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function allergiesServices(institution_id,patient_id) {
  console.log('institution_id,patient_id', institution_id,patient_id)
  try {
    const promise = await get(API_ENDPOINTS_ALLERGIES(institution_id,patient_id), AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.log('Error al cargar alergias: ', err);
  }
}
