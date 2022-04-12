import { environment } from "../environments/environments.demo";

const baseUrl = environment.baseURL;

export let LOGIN_HEADER = () => {
  let header = {
    accept: "application/json",
  };
  return header;
};

export let API_HEADER = () => {
  let header = {
    "Accept": "application/json",
  };
  return header;
};

export let API_HEADER_V2 = () => { //note - test 
  let header = {
    "Content-type": "application/json",
  };
  return header;
};

export let AUTH_HEADER = (tokenId) => {
  let header = {
    'accept': 'application/json'
    // Authorization: `Bearer ${tokenId}`,
  };
  return header;
};

export const API_ENDPOINTS_LOGIN = `${baseUrl}/login`;

export const API_ENDPOINTS_CREATEPERSONANDUSER = `${baseUrl}/createpersonanduser`;

export const API_ENDPOINTS_CREATEPERSON = `${baseUrl}/createperson`;

export const API_ENDPOINTS_INSTITUCIONES = `${baseUrl}/institutions/all`;

export const API_ENDPOINTS_PARAMETRIC = `${baseUrl}/parametric`;

export const API_ENDPOINTS_GETMESSAGES = `${baseUrl}/getmessages`;

export const API_ENDPOINTS_SETMESSAGESREAD = `${baseUrl}/setmessagesread`;

export const API_ENDPOINTS_PATIENT = `${baseUrl}/patient`;
