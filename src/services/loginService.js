import axios from "axios";
// const API = "http://localhost:3001/users";
const API = "https://violetapugliese.github.io/usuarios_prueba_API/db.json";

export default function loginService(em, p) {
  const promise = axios.get(API, { params: { email: em, password: p} });
  const dataPromise = promise.then((response) => response.data).catch((err) => (console.log(err)));
  // console.log("2", dataPromise)
  return dataPromise;
}

