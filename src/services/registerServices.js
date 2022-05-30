import { post } from "./httpServices";
import {
  API_ENDPOINT_CREATEPERSON,
  API_ENDPOINT_CREATEPERSONANDUSER,
  API_ENDPOINT_UPLOADIDENTIFICATIONIMAGES,
  API_ENDPOINT_DOWNLOADIDENTIFICATIONIMAGES,
  API_HEADER,
  UPLOAD_HEADER,
  AUTH_HEADER
} from "../constants/api.constants";

export async function registerPersonAndUserService(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await post(
      API_ENDPOINT_CREATEPERSONANDUSER,
      API_HEADER(),
      data
    );
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

export async function registerPersonService(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await post(API_ENDPOINT_CREATEPERSON, API_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

export async function uploadIdentificationImagesService(id, body) {
  try {
    const searchParams = new URLSearchParams({ person_id: id });
    let query = searchParams.toString();
    const data = body; //note - is a formData
    const promise = await post(
      API_ENDPOINT_UPLOADIDENTIFICATIONIMAGES(query),
      UPLOAD_HEADER(),
      data
    );
    return promise;
  } catch (err) {
    console.log("Error al enviar imágenes: ", err);
  }
}


export async function  downloadIdentificationImagesService(id, is_front) {
  try {
    const searchParams = new URLSearchParams({ 
      person_id: id,
      is_front: is_front
    });
    let query = searchParams.toString();
    const promise = await post(
      API_ENDPOINT_DOWNLOADIDENTIFICATIONIMAGES(query),
      AUTH_HEADER(),
    );
    return promise;
  } catch (err) {
    console.log("Error al cargar imágenes: ", err);
  }
}
