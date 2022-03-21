import { environment } from "../environments/environments.demo";

const baseUrl = environment.baseURL;

export let LOGIN_HEADER = () => {
    let header = {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      }
      return header;
}

export let AUTH_HEADER = (tokenId) => {
    let header = {
      'Authorization': `Bearer ${tokenId}`
    }
    return header;
  }

export const API_ENDPOINTS_LOGIN = `${baseUrl}/login`;

export const API_ENDPOINTS_INSTITUCIONES = `${baseUrl}/institutions/all`;
