import { API_ENDPOINTS_PATIENT, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function patientBasicDataServices(tokenUser, body) {
  try {
    const searchParams = new URLSearchParams(body);
    let data = searchParams.toString();
    const promise = await get(`${API_ENDPOINTS_PATIENT}/basicData/${data}`, AUTH_HEADER(tokenUser))
    return promise
  }
  catch (err) {
    console.log('Error al cargar el paciente: ', err);
  }
}
export async function patientCompleteDataServices(tokenUser, body) {
    try {
      const searchParams = new URLSearchParams(body);
      let data = searchParams.toString();
      const promise = await get(`${API_ENDPOINTS_PATIENT}/completeData/${data}`, AUTH_HEADER(tokenUser))
      return promise
    }
    catch (err) {
      console.log('Error al cargar el paciente: ', err);
    }
  }