import { environment } from "../environments/environments.demo";

const baseUrl = environment.baseURL;

export let LOGIN_HEADER = () => {
  let header = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return header;
};

export let AUTH_HEADER = (tokenId) => {
  let header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenId}`,
  };
  return header;
};

export const API_ENDPOINTS_LOGIN = `${baseUrl}/login`;

export const API_ENDPOINTS_INSTITUCIONES = `${baseUrl}/institutions/all`;

export const API_ENDPOINTS_GETMESSAGES = `${baseUrl}/getmessages`;

export const API_ENDPOINTS_SETMESSAGESREAD = `${baseUrl}/setmessagesread`;

export const API_ENDPOINTS_PATIENT = `${baseUrl}/patient`;

// export const API_ENDPOINTS_SETMESSAGESREAD = `${baseUrl}/setmessagesread`;
