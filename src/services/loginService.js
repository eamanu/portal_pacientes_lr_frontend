import axios from "axios";
const API = "http://localhost:3001/users";

export default function loginService(u, p) {
  const promise = axios.get(API, { params: { username: u, password: p } });
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}


