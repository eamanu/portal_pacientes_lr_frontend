import { API_ENDPOINT_TOOTHRECORDS, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function toothRecordsServices(institution_id,patient_id, tooth_sct_id) {
  try {
    const promise = await get(API_ENDPOINT_TOOTHRECORDS(institution_id,patient_id, tooth_sct_id), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar toothRecords: ', err);
  }
}