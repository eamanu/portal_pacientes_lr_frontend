import axios from "axios";
// const API = "http://localhost:3001/users";
const API = "https://violetapugliese.github.io/usuarios_prueba_API/db.json";

export default function loginService(em, p) {
  const promise = axios.get(API, { params: { email: em, password: p } });
  const dataPromise = promise
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return dataPromise;
}

export async function loginServiceFetch() {
  const URL = "http://128.201.239.7/portalpaciente/api/v1";
  const searchParams = new URLSearchParams({
    username: "admin",
    password: "admin123",
  });
  const data = searchParams.toString()

  const promise = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    // .then(function (response) {
    //   console.log("response =", response);
    //   return response.json();
    // })
    // .then(function (data) {
    //   console.log("data = ", data);
    //   return data
    // })
    // .catch(function (err) {
    //   console.error(err);
    // });
    return promise
}
