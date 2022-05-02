import { environment } from "../environments/environments.demo";

const baseUrl = environment.baseURL;

export let LOGIN_HEADER = () => {
  let header = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return header;
};

export let API_HEADER = () => {
  //note - could be Content-type: application/json
  let header = {
    "Content-Type": "application/json",
  };
  return header;
};

export let UPLOAD_HEADER = () => {
  let header = {
    // "Content-Type": "multipart/form-data",
  };
  return header;
};

export let AUTH_HEADER = (tokenId) => {
  let header = {
    accept: "application/json",
    // Authorization: `Bearer ${tokenId}`,
  };
  return header;
};

// login
export const API_ENDPOINTS_LOGINADMIN = `${baseUrl}/login-admin`;

export const API_ENDPOINTS_LOGINPERSON = `${baseUrl}/login`;
// validate
export const API_ENDPOINTS_VALIDATEEMAIL = (token) => {
  let url = `${baseUrl}/validate-email/${token}`;
  return url;
};

export const API_ENDPOINTS_RECOVERPASSWORD = (query) => {
  let url = `${baseUrl}/recover-password?${query}`;
  return url;
};

export const API_ENDPOINTS_CHANGEPASSWORD = (query) => {
  let url = `${baseUrl}/change-password?${query}`;
  return url;
};

// PERSON
export const API_ENDPOINTS_CREATEPERSONANDUSER = `${baseUrl}/createpersonanduser`;

export const API_ENDPOINTS_CREATEPERSON = `${baseUrl}/createperson`;

export const API_ENDPOINTS_UPDATEPEROSN = `${baseUrl}/updateperson`;

export const API_ENDPOINTS_UPLOADIDENTIFICATIONIMAGES = (query) => {
  let url = `${baseUrl}/uploadidentificationimages?${query}`;
  return url;
};

//admin
export const API_ENDPOINT_SETADMINSTATUSTOPERSON = (query) => {
  let url = `${baseUrl}/setadminstatustoperson?${query}`;
  return url;
};

export const API_ENDPOINT_GETPERSONS = `${baseUrl}/admin/persons`;
export const API_ENDPOINT_GETPERSONSACCEPTED = `${baseUrl}/admin/persons-accepted`;
export const API_ENDPOINT_PERSONACCEPTED = `${baseUrl}/admin/accepted`;
export const API_ENDPOINT_PERSONNOTACCEPT = `${baseUrl}/admin/notaccept`;

// get patients/users data ---------------------------------------

export const API_ENDPOINTS_GETPERSONBYIDENTIFICATIONNUMBER = (query) => {
  let url = `${baseUrl}/getpersonbyidentificationnumber?${query}`;
  return url;
};

export const API_ENDPOINTS_PATIENTBASICDATA = (query) => {
  let url = `${baseUrl}/patient/basicData?${query}`;
  return url;
};

export const API_ENDPOINTS_PATIENTCOMPLETEDATA = (query) => {
  let url = `${baseUrl}/patient/completeData?${query}`;
  return url;
};

export const API_ENDPOINTS_CATEGORIES = `${baseUrl}/categories`;

// formData---------------------------------------
export const API_ENDPOINTS_INSTITUCIONES = `${baseUrl}/institutions/all`;

export const API_ENDPOINTS_PARAMETRIC = `${baseUrl}/parametric`;

// messages---------------------------------------

export const API_ENDPOINTS_GETALLMESSAGES = `${baseUrl}/get-all-messages`;

export const API_ENDPOINTS_GETMESSAGESBYPERSON = (query) => {
  let url = `${baseUrl}/get-messages-by-person?${query}`;
  return url;
};

export const API_ENDPOINTS_CREATEMESSAGE = (query) => {
  let url = `${baseUrl}/createmessage?${query}`;
  return url;
};

export const API_ENDPOINTS_SETMESSAGEREAD = (query) => {
  let url = `${baseUrl}/setmessageread?${query}`;
  return url;
};

export const API_ENDPOINTS_GETMESSAGE = (query) => {
  let url = `${baseUrl}/getmessage?${query}`;
  return url;
};

export const API_ENDPOINTS_SENDMESSAGE = (query) => {
  let url = `${baseUrl}/sendmessage?${query}`;
  return url;
};

export const API_ENDPOINTS_UPDATEMESSAGE = `${baseUrl}/updatemessage`;

export const API_ENDPOINTS_DELETEMESSAGE = (query) => {
  let url = `${baseUrl}/deletemessage?${query}`;
  return url;
};

// sumar ---------------------------------------
export const API_ENDPOINTS_SUMAR = (idn) => {
  let url = `${baseUrl}/sumar/data/${idn}`;
  return url;
};

// hce---------------------------------------
export const API_ENDPOINTS_ALLERGIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/allergies/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_ANTHROPOMETRICDATA = (
  institution_id,
  patient_id
) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/anthropometricData/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_FAMILYHISTORIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/familyHistories/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_CHRONIC = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/chronic/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_TOOTHRECORDS = (
  institution_id,
  patient_id,
  tooth_sct_id
) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/toothRecords/${patient_id}/tooth/${tooth_sct_id}`;
  return url;
};

export const API_ENDPOINTS_ACTIVEPROBLEMS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/activeProblems/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_HOSPITALIZATION = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/hospitalization/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_SOLVEDPROBLEMS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/solvedProblems/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_VITALSIGNS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/vitalSigns/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_INMUNIZATION = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/immunizations/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_MEDICATIONS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/medications/${patient_id}`;
  return url;
};

export const API_ENDPOINTS_PERSONALHYSTORIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/personalHistories/${patient_id}`;
  return url;
};

// export const API_ENDPOINTS_BASICDATA = (gender_id, identification_number, type_id) =>{
//   let url = `${baseUrl}/patient/basicData?gender_id=${gender_id}&identification_number=${identification_number}&type_id=${type_id}`;
//   return url;
// }

// export const API_ENDPOINTS_COMPLETEDATA = (gender_id, identification_number, type_id) =>{
//   let url = `${baseUrl}/patient/completeData?gender_id=${gender_id}&identification_number=${identification_number}&type_id=${type_id}`;
//   return url;
// }
