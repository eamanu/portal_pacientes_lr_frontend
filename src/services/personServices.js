import {API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER, API_ENDPOINTS_UPDATEPEROSN, API_ENDPOINT_SETADMINSTATUSTOPERSON, API_HEADER} from '../constants/api.constants';
import { get, put } from './httpServices';

export async function getPersonByIdentificationNumber(idn) { 
    try {
      const searchParams = new URLSearchParams({
        person_identification_number: "dnipersontest1" //hardcode
      });
      let query = searchParams.toString();
      const promise = await get(API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER(query), API_HEADER());
      return promise;
    } catch (err) {
      console.log("Error ", err);
    }
  }

  export async function updatePerson(body){
    try {
      const data = JSON.stringify(body);
      // console.log('data person', data)
      const promise = await put(API_ENDPOINTS_UPDATEPEROSN, API_HEADER(), data);
      return promise;
    } catch (err) {
      console.log("Error al crear persona: ", err);
    }
  }

  export async function setAdminStatusToPerson(id, status){
    try {
      const searchParams = new URLSearchParams({
        person_id: id,
        admin_status_id: status 
      });
      let query = searchParams.toString();
      const promise = await put(API_ENDPOINT_SETADMINSTATUSTOPERSON(query), API_HEADER());
      return promise;
    } catch (err) {
      console.log("Error", err);
    }
  }