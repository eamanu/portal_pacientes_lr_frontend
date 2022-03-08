import axios from "axios";
import { API_ENDPOINTS_LOGIN, LOGIN_HEADER } from "../constants/api.constants";

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
  const searchParams = new URLSearchParams({
    username: "admin",
    password: "admin123",
  });
  const data = searchParams.toString()
  const promise = await fetch(API_ENDPOINTS_LOGIN, {
    method: "POST",
    headers: LOGIN_HEADER(),
    body: data,
  })
    return promise
}


