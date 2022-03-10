import axios from "axios";
import { API_ENDPOINTS_INSTITUCIONES, AUTH_HEADER } from "../constants/api.constants";

export default async function institutionsServices(tokenUser) {
  const authAxios = axios.create({
    headers: AUTH_HEADER(tokenUser)
  })
  try {
    const result = await authAxios.get(API_ENDPOINTS_INSTITUCIONES);
    return result.data;
  } 
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}