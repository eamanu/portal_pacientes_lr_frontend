import {API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER, API_ENDPOINT_SETADMINSTATUS, API_HEADER} from '../constants/api.constants';
import { get } from './httpServices';

export async function getPersonByIdentificationNumber(idn) { 
    try {
      const searchParams = new URLSearchParams({
        person_identification_number: "dnipersontest1" //hardcode
      });
      let query = searchParams.toString();
      const promise = await get(API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER(query), API_HEADER());
      return promise;
    } catch (err) {
      console.log("Error al iniciar sesión: ", err);
    }
  }

  export async function setAdminStatusToPerson(id, status){
    try {
      const searchParams = new URLSearchParams({
        person_id: id,
        admin_status_id: status 
      });
      let query = searchParams.toString();
      const promise = await get(API_ENDPOINT_SETADMINSTATUS(query), API_HEADER());
      return promise;
    } catch (err) {
      console.log("Error al iniciar sesión: ", err);
    }
  }