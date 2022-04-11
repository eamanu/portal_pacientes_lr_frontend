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
    "Accept": "application/json",
    "Content-type": "application/json"
  };
  return header;
};

export let API_HEADER_V2 = () => { //note - test 
  let header = {
    "Content-type": "application/json",
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

export const API_ENDPOINTS_LOGIN = `${baseUrl}/login`;

export const API_ENDPOINTS_CREATEPERSONANDUSER = `${baseUrl}/createpersonanduser`;

export const API_ENDPOINTS_CREATEPERSON = `${baseUrl}/createperson`;

export const API_ENDPOINTS_INSTITUCIONES = `${baseUrl}/institutions/all`;

export const API_ENDPOINTS_GETMESSAGES = `${baseUrl}/getmessages`;

export const API_ENDPOINTS_SETMESSAGESREAD = `${baseUrl}/setmessagesread`;

export const API_ENDPOINTS_PATIENT = `${baseUrl}/patient`;

// export const API_ENDPOINTS_SETMESSAGESREAD = `${baseUrl}/setmessagesread`;

// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "accept: application/json" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   -H "Content-type: application/json" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed

// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "Accept: application/json" ^
//   -H "Accept-Language: en-GB,en;q=0.9,es-US;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,it;q=0.4" ^
//   -H "Cache-Control: no-cache" ^
//   -H "Connection: keep-alive" ^
//   -H "Content-Type: text/plain;charset=UTF-8" ^
//   -H "Origin: http://localhost:3000" ^
//   -H "Pragma: no-cache" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed ^
//   --insecure

// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "Accept: application/json" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   -H "Content-type: application/json" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed

// con axios
// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "Accept: application/json, text/plain, */*" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   -H "Content-Type: application/json" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed

// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "Accept: application/json, text/plain, */*" ^
//   -H "Accept-Language: en-GB,en;q=0.9,es-US;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,it;q=0.4" ^
//   -H "Cache-Control: no-cache" ^
//   -H "Connection: keep-alive" ^
//   -H "Content-Type: application/x-www-form-urlencoded" ^
//   -H "Origin: http://localhost:3000" ^
//   -H "Pragma: no-cache" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed ^
//   --insecure

// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "Accept: application/json, text/plain, */*" ^
//   -H "Accept-Language: en-GB,en;q=0.9,es-US;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,it;q=0.4" ^
//   -H "Cache-Control: no-cache" ^
//   -H "Connection: keep-alive" ^
//   -H "Content-Type: application/x-www-form-urlencoded" ^
//   -H "Origin: http://localhost:3000" ^
//   -H "Pragma: no-cache" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed ^
//   --insecure

// curl "http://128.201.239.7:8000/portalpaciente/api/v1/createpersonanduser" ^
//   -H "Accept: */*" ^
//   -H "Accept-Language: en-GB,en;q=0.9,es-US;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,it;q=0.4" ^
//   -H "Cache-Control: no-cache" ^
//   -H "Connection: keep-alive" ^
//   -H "Content-Type: text/plain;charset=UTF-8" ^
//   -H "Origin: http://localhost:3000" ^
//   -H "Pragma: no-cache" ^
//   -H "Referer: http://localhost:3000/" ^
//   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ^
//   --data-raw "^{^\^"address_number^\^":^\^"63^\^",^\^"address_street^\^":^\^"Jos^é Bonifacio^\^",^\^"birthdate^\^":^\^"5/4/2008^\^",^\^"department^\^":^\^"Comuna 6^\^",^\^"email^\^":^\^"personprueba3^@mail.com^\^",^\^"id_department^\^":1,^\^"id_gender^\^":1,^\^"id_identification_type^\^":1,^\^"id_locality^\^":1,^\^"id_usual_institution^\^":1,^\^"identification_number^\^":^\^"1234567^\^",^\^"identification_number_master^\^":^\^"1234567^\^",^\^"is_chronic_kidney_disease^\^":false,^\^"is_chronic_respiratory_disease^\^":false,^\^"is_diabetic^\^":false,^\^"is_hypertensive^\^":false,^\^"locality^\^":^\^"Buenos Aires^\^",^\^"name^\^":^\^"person prueba3^\^",^\^"password^\^":^\^"123^\^",^\^"phone_number^\^":^\^"1122334455^\^",^\^"surname^\^":^\^"person prueba3^\^",^\^"username^\^":^\^"personprueba3^@mail.com^\^",^\^"id_person^\^":null,^\^"id_patient^\^":null,^\^"id_admin_status^\^":null,^\^"id_user_status^\^":null,^\^"is_deleted^\^":false^}" ^
//   --compressed ^
//   --insecure