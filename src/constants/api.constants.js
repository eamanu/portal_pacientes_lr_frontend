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
  let header = {
    "accept": "application/json",
  };
  return header;
};

export let REGISTER_HEADER = () => {
  let header = {
    "Content-Type": "application/json",
  };
  return header;
};

export let NONE_HEADER = () => {
  let header = {
    // "Content-Type": "multipart/form-data",
  };
  return header;
};

export let AUTH_HEADER = () => {
  const jwt = localStorage.getItem("tokenUser")
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : null;
  let header = {
    "accept": "application/json",
    "Authorization": `Bearer ${jwt}`,
  };
  return header;
};

export let UPDATE_HEADER = () => {
  const jwt = localStorage.getItem("tokenUser")
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : null;
  let header = {
    "Content-type": "application/json",
    "Authorization": `Bearer ${jwt}`,
  };
  return header;
};

// login ---------------------------------------

export const API_ENDPOINT_LOGINADMIN = `${baseUrl}/login-admin`;

export const API_ENDPOINT_LOGINPERSON = `${baseUrl}/login`;

// validate ---------------------------------------

export const API_ENDPOINT_VALIDATEEMAIL = (token) => {
  let url = `${baseUrl}/validate-email/${token}`;
  return url;
};

export const API_ENDPOINT_RECOVERPASSWORD = (query) => {
  let url = `${baseUrl}/recover-password?${query}`;
  return url;
};

export const API_ENDPOINT_CHANGEPASSWORD = (query) => {
  let url = `${baseUrl}/change-password?${query}`;
  return url;
};

// PERSON ---------------------------------------

export const API_ENDPOINT_CREATEPERSONANDUSER = `${baseUrl}/createpersonanduser`;

export const API_ENDPOINT_CREATEPERSON = `${baseUrl}/createperson`;

export const API_ENDPOINT_UPDATEPEROSN = `${baseUrl}/updateperson`;

export const API_ENDPOINT_UPLOADIDENTIFICATIONIMAGES = (query) => {
  let url = `${baseUrl}/uploadidentificationimages?${query}`;
  return url;
};

export const API_ENDPOINT_DOWNLOADIDENTIFICATIONIMAGES = (query) => {
  let url = `${baseUrl}/downloadidentificationimage?${query}`;
  return url;
};
//admin ---------------------------------------

export const API_ENDPOINT_SETADMINSTATUSTOPERSON = (query) => {
  let url = `${baseUrl}/setadminstatustoperson?${query}`;
  return url;
};

export const API_ENDPOINT_GETADMINSTATUS = `${baseUrl}/getadminstatus`;

export const API_ENDPOINT_GETPERSONS = `${baseUrl}/persons`;

export const API_ENDPOINT_GETPERSONSACCEPTED = `${baseUrl}/persons_accepted`;

export const API_ENDPOINT_PERSONACCEPTED = `${baseUrl}/accepted`;

export const API_ENDPOINT_PERSONNOTACCEPT = `${baseUrl}/notaccept`;

// get patients/users data ---------------------------------------

export const API_ENDPOINT_GETPERSONBYIDENTIFICATIONNUMBER = (query) => {
  let url = `${baseUrl}/getpersonbyidentificationnumber?${query}`;
  return url;
};

export const API_ENDPOINT_GETPERSONBYID = (query) => {
  let url = `${baseUrl}/getpersonbyid?${query}`;
  return url;
};

export const API_ENDPOINT_PATIENTBASICDATA = (query) => {
  let url = `${baseUrl}/patient/basicData?${query}`;
  return url;
};

export const API_ENDPOINT_PATIENTCOMPLETEDATA = (query) => {
  let url = `${baseUrl}/patient/completeData?${query}`;
  return url;
};

export const API_ENDPOINT_CATEGORIES = `${baseUrl}/categories`;

export const API_ENDPOINT_SEND_TURNO_MAIL = (query) => {
  let url = `${baseUrl}/send-turno-mail?${query}`;
  return url;
};

// formData---------------------------------------
export const API_ENDPOINT_INSTITUCIONES = `${baseUrl}/institutions/all`;

export const API_ENDPOINT_PARAMETRIC = `${baseUrl}/parametric`;

// messages---------------------------------------

export const API_ENDPOINT_GETALLMESSAGES = `${baseUrl}/get-all-messages`;

export const API_ENDPOINT_GETMESSAGESBYPERSON = (query) => {
  let url = `${baseUrl}/get-messages-by-person?${query}`;
  return url;
};

export const API_ENDPOINT_CREATEMESSAGE = (query) => {
  let url = `${baseUrl}/createmessage?${query}`;
  return url;
};

export const API_ENDPOINT_SETMESSAGEREAD = (query) => {
  let url = `${baseUrl}/setmessageread?${query}`;
  return url;
};

export const API_ENDPOINT_GETMESSAGE = (query) => {
  let url = `${baseUrl}/getmessage?${query}`;
  return url;
};

export const API_ENDPOINT_SENDMESSAGE = (query) => {
  let url = `${baseUrl}/sendmessage?${query}`;
  return url;
};

export const API_ENDPOINT_UPDATEMESSAGE = `${baseUrl}/updatemessage`;

export const API_ENDPOINT_DELETEMESSAGE = (query) => {
  let url = `${baseUrl}/deletemessage?${query}`;
  return url;
};

// sumar ---------------------------------------
export const API_ENDPOINT_SUMAR = (idn) => {
  let url = `${baseUrl}/data/${idn}`;
  return url;
};

// hce---------------------------------------
export const API_ENDPOINT_ALLERGIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/allergies/${patient_id}`;
  return url;
};

export const API_ENDPOINT_ANTHROPOMETRICDATA = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/anthropometricData/${patient_id}`;
  return url;
};

export const API_ENDPOINT_FAMILYHISTORIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/familyHistories/${patient_id}`;
  return url;
};

export const API_ENDPOINT_CHRONIC = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/chronic/${patient_id}`;
  return url;
};

export const API_ENDPOINT_TOOTHRECORDS = (
  institution_id,
  patient_id,
  tooth_sct_id
) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/toothRecords/${patient_id}/tooth/${tooth_sct_id}`;
  return url;
};

export const API_ENDPOINT_ACTIVEPROBLEMS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/activeProblems/${patient_id}`;
  return url;
};

export const API_ENDPOINT_HOSPITALIZATION = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/hospitalization/${patient_id}`;
  return url;
};

export const API_ENDPOINT_SOLVEDPROBLEMS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/solvedProblems/${patient_id}`;
  return url;
};

export const API_ENDPOINT_VITALSIGNS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/vitalSigns/${patient_id}`;
  return url;
};

export const API_ENDPOINT_INMUNIZATION = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/immunizations/${patient_id}`;
  return url;
};

export const API_ENDPOINT_MEDICATIONS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/medications/${patient_id}`;
  return url;
};

export const API_ENDPOINT_PERSONALHYSTORIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/personalHistories/${patient_id}`;
  return url;
};
