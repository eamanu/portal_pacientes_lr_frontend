import {API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER, API_HEADER} from '../constants/api.constants';
import { get } from './httpServices';

export async function getPersonByIdentificationNumber() { //hardcode
    try {
      const searchParams = new URLSearchParams({
        person_identification_number: "1234567"
      });
      let query = searchParams.toString();
      const promise = await get(API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER(query), API_HEADER());
      return promise;
    } catch (err) {
      console.log("Error al iniciar sesión: ", err);
    }
  }

//   getPersonByIdentificationNumber()