import { environment } from "../environments/environments.demo";

const baseUrl = environment.baseURL;

export let LOGIN_HEADER = () => {
  let header = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return header;
};

export let API_HEADER = () => { //note - could be Content-type: application/json
  let header = {
    "Content-Type": "application/json",
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

// login
export const API_ENDPOINTS_LOGIN = `${baseUrl}/login`;

// register
export const API_ENDPOINTS_CREATEPERSONANDUSER = `${baseUrl}/createpersonanduser`;

export const API_ENDPOINTS_CREATEPERSON = `${baseUrl}/createperson`;

// get patients/users data
export const API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER = (query) => {
  let url = `${baseUrl}/getpersonbyidentificationnumber?${query}`;
  return url
}

// formData
export const API_ENDPOINTS_INSTITUCIONES = `${baseUrl}/institutions/all`;

export const API_ENDPOINTS_PARAMETRIC = `${baseUrl}/parametric`;

// messages
export const API_ENDPOINTS_GETMESSAGES = `${baseUrl}/getmessages`;

export const API_ENDPOINTS_SETMESSAGESREAD = `${baseUrl}/setmessagesread`;

export const API_ENDPOINTS_PATIENT = `${baseUrl}/patient`;
