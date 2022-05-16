import { API_ENDPOINT_ALLERGIES, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function allergiesServices(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINT_ALLERGIES(institution_id,patient_id), AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.log('Error al cargar alergias: ', err);
  }
}
