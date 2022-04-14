import { post } from "./httpServices";
import { API_ENDPOINTS_CREATEPERSON, API_ENDPOINTS_CREATEPERSONANDUSER, API_HEADER } from "../constants/api.constants";

export async function registerPersonAndUserService(body) {
  try {
    const data = JSON.stringify(body);
    console.log('data register', data)
    const promise = await post(API_ENDPOINTS_CREATEPERSONANDUSER, API_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

export async function registerPersonService(body) {
  try {
    const data = JSON.stringify(body);
    console.log('data person', data)
    const promise = await post(API_ENDPOINTS_CREATEPERSON, API_HEADER(), data);
    return promise;
  } catch (err) {
    console.log("Error al crear persona: ", err);
  }
}

//hardcode
// const body1 = {
//   address_number: "63",
//   address_street: "Jose Bonifacio",
//   birthdate: "5/4/2008",
//   department: "Comuna 6",
//   email: "personprueba3@mail.com",
//   id_department: 1,
//   id_gender: 1,
//   id_identification_type: 1,
//   id_locality: 1,
//   id_usual_institution: 1,
//   identification_number: "1234567",
//   identification_number_master: "1234567",
//   is_chronic_kidney_disease: false,
//   is_chronic_respiratory_disease: false,
//   is_diabetic: false,
//   is_hypertensive: false,
//   locality: "Buenos Aires",
//   name: "person prueba3",
//   password: "123",
//   phone_number: "1122334455",
//   surname: "person prueba3",
//   username: "personprueba3@mail.com",
//   id_person: null,
//   id_patient: null,
//   id_admin_status: null,
//   id_user_status: null,
//   is_deleted: false,
// };

//hardcode 
// export async function registerPersonService(body) {
//   try {
//     const promise = await fetch(API_ENDPOINTS_CREATEPERSONANDUSER, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
//     return promise
//   } catch (err) {
//     console.log("Error al crear persona: ", err);
//   }
// }

// registerPersonService(body1);
