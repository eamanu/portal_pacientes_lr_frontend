import axios from "axios";
const APIU = "http://128.201.239.7:8000/portalpaciente/api/v1/institutions/all";

export default function institutionsServices() {
  const promise = axios.get(APIU);
  const dataPromise = promise.then((response) => response.data).catch((err) => (console.log(err)));
  return dataPromise;
}


