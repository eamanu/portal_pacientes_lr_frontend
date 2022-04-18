import { API_ENDPOINTS_SOLVEDPROBLEMS, API_HEADER, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function solvedProblems(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINTS_SOLVEDPROBLEMS(institution_id,patient_id), API_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar solvedProblems: ', err);
  }
}