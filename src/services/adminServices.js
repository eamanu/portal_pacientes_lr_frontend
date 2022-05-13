import { API_ENDPOINT_GETPERSONS, API_ENDPOINT_GETPERSONSACCEPTED, API_ENDPOINT_PERSONACCEPTED, API_ENDPOINT_PERSONNOTACCEPT, AUTH_HEADER } from "../constants/api.constants";
import { get, put } from "./httpServices";

export async function getPersons() {
  try {
    const promise = await get(API_ENDPOINT_GETPERSONS, AUTH_HEADER())
   return promise
  }
  catch (err) {
    console.log('Error al cargar datos: ', err);
  }
}

export async function getPersonsAccepted() {
    try {
      const promise = await get(API_ENDPOINT_GETPERSONSACCEPTED, AUTH_HEADER())
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }

  export async function personAccepted(body){
    try {
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_PERSONACCEPTED, AUTH_HEADER(), data);
      return promise;
    } catch (err) {
      console.log("Error al editar persona: ", err);
    }
  }

  export async function personNotAccept(body){
    try {
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_PERSONNOTACCEPT, AUTH_HEADER(), data);
      return promise;
    } catch (err) {
      console.log("Error al editar persona: ", err);
    }
  }
