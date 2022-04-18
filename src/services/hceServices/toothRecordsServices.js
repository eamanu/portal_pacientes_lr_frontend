import { API_ENDPOINTS_TOOTHRECORDS, API_HEADER, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function toothRecordsServices(institution_id,patient_id, tooth_sct_id) {
  try {
    const promise = await get(API_ENDPOINTS_TOOTHRECORDS(institution_id,patient_id, tooth_sct_id), API_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar toothRecords: ', err);
  }
}