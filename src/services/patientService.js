import {
  API_ENDPOINT_PATIENTBASICDATA,
  API_ENDPOINT_PATIENTCOMPLETEDATA,
  AUTH_HEADER,
} from "../constants/api.constants";
import { get } from "./httpServices";

export default async function patientBasicDataServices(body) {
  try {
    const searchParams = new URLSearchParams(body);
    let query = searchParams.toString();
    const promise = await get(
      API_ENDPOINT_PATIENTBASICDATA(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al cargar el paciente: ", err);
  }
}
export async function patientCompleteDataServices(body) {
  try {
    const searchParams = new URLSearchParams(body);
    let query = searchParams.toString();
    const promise = await get(
      API_ENDPOINT_PATIENTCOMPLETEDATA(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al cargar el paciente: ", err);
  }
}
