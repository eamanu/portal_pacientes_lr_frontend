import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
// import patientBasicDataServices, { patientCompleteDataServices } from "../services/patientService";
// import { getPersonByIdentificationNumber } from "../services/personServices";
import { useHistory } from "react-router-dom";


export const PatientContext = createContext();

const PatientProvider = ({ children }) => {

  const auth = useAuth();
  console.log(auth.user)
  const history = useHistory();

  const allPatients = auth.user.family_group; //hardcode
  const [patient, setPatient] = useState(allPatients[0]); //hardcode
  const [patientInstitution, setPatientInstitution] = useState(1); //hardcode

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

 
  const getPatient = useCallback(
    (identification_number) => {
      const promise = allPatients.find((patient) => patient.identification_number === identification_number);
      setPatient(promise);
      Toast.fire({
        position: "bottom-end",
        icon: "success",
        title: `Paciente activo: ${promise.name} ${promise.surname}`,
      });
      return patient;
    },
    [patient, allPatients, Toast]
  );

  const changeInstitution = (e) => {
    let id_institution = parseInt(e.target.value)
    setPatientInstitution(id_institution);
  }

  // const getPatientBasicData = useCallback((tokenId, data) => {
  //   patientBasicDataServices(tokenId, data)
  //     .then((res) => {
  //       return res;
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const getPatientCompleteData = useCallback((tokenId, data) => {
  //   patientCompleteDataServices(tokenId, data)
  //     .then((res) => {
  //       return res;
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   getPatientBasicData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0OTMwODA3NH0.IuBJ4-K9fF9fuCEtOCX90BDlAO2i0wXt71qgTZoRKSc', {gender_id: 1 , id_number: 1234567, id_type: 1}) //hardcode
  //   getPatientCompleteData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0OTMwODA3NH0.IuBJ4-K9fF9fuCEtOCX90BDlAO2i0wXt71qgTZoRKSc', {gender_id: 1 , id_number: 1234567, id_type: 1}) //hardcode
  // }, [])

  // useEffect(() => {
  //   getPersonByIdentificationNumber(); 
  // }, [])

  const idPatient = 35 //hardcode

  const contextValue = {
    patient,
    allPatients,
    getPatient,
    patientInstitution, 
    changeInstitution,
    idPatient
    // register
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
