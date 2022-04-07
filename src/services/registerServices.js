import { API_ENDPOINTS_CREATEPERSON, API_HEADER } from "../constants/api.constants";
import { post } from "./httpServices";

export async function registerPersonService(body) {
    try {
    //   const searchParams = new URLSearchParams(body);
    //   let data = searchParams.toString();
      const data = JSON.stringify(body);
      const promise = await post(API_ENDPOINTS_CREATEPERSON, API_HEADER(), data);
      return promise;
    } catch (err) {
      console.log("Error al crear persona: ", err);
    }
  }