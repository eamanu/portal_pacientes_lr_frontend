import { post } from "./httpServices";
import {
  API_ENDPOINT_CREATEPERSON,
  API_ENDPOINT_CREATEPERSONANDUSER,
  API_ENDPOINT_UPLOADIDENTIFICATIONIMAGES,
  API_ENDPOINT_DOWNLOADIDENTIFICATIONIMAGES,
  AUTH_HEADER,
  NONE_HEADER,
  REGISTER_HEADER,
} from "../constants/api.constants";
import { environment } from '../environments/environments.demo'

const baseUrl = environment.baseURL

export async function registerPersonAndUserService(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await post(
      API_ENDPOINT_CREATEPERSONANDUSER,
      REGISTER_HEADER(),
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
    const promise = await post(
      API_ENDPOINT_CREATEPERSON,
      REGISTER_HEADER(),
      data
    );
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
      NONE_HEADER(),
      data
    );
    return promise;
  } catch (err) {
    console.log("Error al enviar imágenes: ", err);
  }
}

export async function downloadIdentificationImagesService(id, is_front) {
  try {
    const searchParams = new URLSearchParams({
      person_id: id,
      is_front: is_front,
    });
    let query = searchParams.toString();
    const promise = await post(
      API_ENDPOINT_DOWNLOADIDENTIFICATIONIMAGES(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error al cargar imágenes: ", err);
  }
}

function getImageRequest (imgName, token) {
  return new Promise(function (resolve, reject) {
    let src
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob"; //so you can access the response like a normal URL
        xhr.open(
          "GET",
          `${baseUrl + imgName}`,
          true
        );
        xhr.setRequestHeader(
          'Authorization',
          `Bearer ${token}`
        );
        xhr.onload = function () {
          if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            src = URL.createObjectURL(xhr.response); 
            resolve(src)
          } else {
            reject(xhr.status);
          }
        };
        xhr.send();
});
}

export async function getImageService(imgName, token){
  try {
      const promise = await getImageRequest(imgName, token);
      return promise
  } catch(error) {
      console.log("Error fetching remote HTML: ", error);
  }              
}