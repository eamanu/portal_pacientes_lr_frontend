import { API_ENDPOINT_INMUNIZATION, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function inmunizationsServices(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINT_INMUNIZATION(institution_id,patient_id), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar inmunization: ', err);
  }
}