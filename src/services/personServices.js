import {
  API_ENDPOINT_GETPERSONBYID,
  API_ENDPOINT_GETPERSONBYIDENTIFICATIONNUMBER,
  API_ENDPOINT_UPDATEPEROSN,
  API_ENDPOINT_SETADMINSTATUSTOPERSON,
  AUTH_HEADER,
  API_ENDPOINT_GETADMINSTATUS,
  UPDATE_HEADER,
} from "../constants/api.constants";
import { get, put } from "./httpServices";

export async function getPersonByIdentificationNumber(idn) {
  try {
    const searchParams = new URLSearchParams({
      person_identification_number: idn,
    });
    let query = searchParams.toString();
    const promise = await get(
      API_ENDPOINT_GETPERSONBYIDENTIFICATIONNUMBER(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error ", err);
  }
}

export async function getPersonById(id) {
  try {
    const searchParams = new URLSearchParams({
      person_id: id,
    });
    let query = searchParams.toString();
    const promise = await get(
      API_ENDPOINT_GETPERSONBYID(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error ", err);
  }
}

export async function updatePerson(body) {
  try {
    const data = JSON.stringify(body);
    // console.log('data person', data)
    const promise = await put(API_ENDPOINT_UPDATEPEROSN, UPDATE_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

export async function setAdminStatusToPerson(id, status) {
  try {
    const searchParams = new URLSearchParams({
      person_id: id,
      admin_status_id: status,
    });
    let query = searchParams.toString();
    const promise = await put(
      API_ENDPOINT_SETADMINSTATUSTOPERSON(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.log("Error", err);
  }
}

export async function getAdminStatus() {
  try {
    const promise = await get(API_ENDPOINT_GETADMINSTATUS, AUTH_HEADER());
    return promise;
  } catch (err) {
    console.log("Error ", err);
  }
}
