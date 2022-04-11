import { API_ENDPOINTS_CREATEPERSONANDUSER, API_ENDPOINTS_LOGIN, API_HEADER } from "../constants/api.constants";
import { post, simplePost } from "./httpServices";

export async function registerPersonService(body) {
    try {
    //   const searchParams = new URLSearchParams(body);
    //   let data = searchParams.toString();
      const data = JSON.stringify(body);
      console.log('data', data)
      const promise = await simplePost(API_ENDPOINTS_CREATEPERSONANDUSER, data);
      return promise;
    } catch (err) {
      console.log("Error al crear persona: ", err);
    }
  }