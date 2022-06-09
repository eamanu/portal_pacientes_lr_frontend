import {
  API_ENDPOINT_LOGINPERSON,
  LOGIN_HEADER,
} from "../constants/api.constants";
import { post } from "./httpServices";

export async function loginPersonService(username, password) {
  try {
    const searchParams = new URLSearchParams({
      username: username,
      password: password,
    });
    let data = searchParams.toString();
    const promise = await post(API_ENDPOINT_LOGINPERSON, LOGIN_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al iniciar sesión: ", err);
  }
}
