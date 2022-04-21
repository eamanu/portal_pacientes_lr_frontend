import axios from "axios";
import {
  API_ENDPOINTS_LOGIN,
  API_ENDPOINTS_LOGINPERSON,
  LOGIN_HEADER,
} from "../constants/api.constants";
import { post } from "./httpServices";

// aL INTENTAR HACER CON AXIOS, NO RECONOCE HEADER CONTENT-TYPE
export async function loginPersonService(username, password) {
  //hardcode
  try {
    // const searchParams = new URLSearchParams({
    //   username: "personprueba3@mail.com",
    //   password: "123",
    // });
    const searchParams = new URLSearchParams({
      username: username,
      password: password,
    });
    let data = searchParams.toString();
    const promise = await post(API_ENDPOINTS_LOGINPERSON, LOGIN_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al iniciar sesión: ", err);
  }
}
