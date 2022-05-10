import { API_ENDPOINT_CHRONIC, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function chronicServices(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINT_CHRONIC(institution_id,patient_id), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar anthropometricData: ', err);
  }
}

