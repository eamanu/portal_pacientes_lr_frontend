import { API_ENDPOINTS_GETMESSAGES, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function getMessagesServices(tokenUser) {
  try {
    const promise = await get(API_ENDPOINTS_GETMESSAGES, AUTH_HEADER(tokenUser))
    return promise
  }
  catch (err) {
    console.log('Error al cargar los mensajes: ', err);
  }
}