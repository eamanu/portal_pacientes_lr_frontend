import { post } from "./httpServices";
import { API_ENDPOINTS_CREATEPERSON, API_ENDPOINTS_CREATEPERSONANDUSER, API_ENDPOINTS_UPLOADIDENTIFICATIONIMAGES, API_HEADER, UPLOAD_HEADER } from "../constants/api.constants";

export async function registerPersonAndUserService(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await post(API_ENDPOINTS_CREATEPERSONANDUSER, API_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

export async function registerPersonService(body) {
  try {
    const data = JSON.stringify(body);
    console.log('data person', data)
    const promise = await post(API_ENDPOINTS_CREATEPERSON, API_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

export async function uploadIdentificationImagesService(id, body) {
  console.log('body', body)
  try {
    const searchParams = new URLSearchParams({ person_id: id });
    let query = searchParams.toString();
    const data = body; //note - is a formData
    console.log('file', data)
    const promise = await post(API_ENDPOINTS_UPLOADIDENTIFICATIONIMAGES(query), UPLOAD_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}
