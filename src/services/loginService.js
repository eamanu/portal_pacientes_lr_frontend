import axios from "axios";
const API = "http://localhost:3001/users";

export default function loginService(em, p) {
  const promise = axios.get(API, { params: { email: em, password: p} });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}


