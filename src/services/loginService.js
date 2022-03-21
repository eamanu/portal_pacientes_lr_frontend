import axios from "axios";
import { API_ENDPOINTS_LOGIN, LOGIN_HEADER } from "../constants/api.constants";
import { post } from "./httpServices";

// FAKE LOGIN
const fakeAPI = "https://violetapugliese.github.io/usuarios_prueba_API/db.json";
export default function loginService(em, p) {
  const promise = axios.get(fakeAPI, { params: { email: em, password: p } });
  const dataPromise = promise
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return dataPromise;
}

// aL INTENTAR HACER CON AXIOS, NO RECONOCE HEADER CONTENT-TYPE
export async function loginServiceFetch() {
  try {
    const searchParams = new URLSearchParams({
      username: "admin",
      password: "admin123",
    });
    let data = searchParams.toString();
    const promise = await post(API_ENDPOINTS_LOGIN, LOGIN_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al iniciar sesión: ", err);
  }
}
