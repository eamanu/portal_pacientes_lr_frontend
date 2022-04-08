import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import patientBasicDataServices, { patientCompleteDataServices } from "../services/patientService";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const allPatients = auth.user.grupo_familiar.pacientes; //hardcode
  const [patient, setPatient] = useState(allPatients[0]); //hardcode

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
    (n) => {
      const promise = allPatients.find((patient) => patient.id === n);
      setPatient(promise);
      Toast.fire({
        position: "bottom-end",
        icon: "success",
        title: `Paciente activo: ${promise.nombre} ${promise.apellido}`,
      });
      return patient;
    },
    [patient, allPatients, Toast]
  );

  const getPatientBasicData = useCallback((tokenId, data) => {
    patientBasicDataServices(tokenId, data)
      .then((res) => {
        return res;
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getPatientCompleteData = useCallback((tokenId, data) => {
    patientCompleteDataServices(tokenId, data)
      .then((res) => {
        return res;
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getPatientBasicData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0OTMwODA3NH0.IuBJ4-K9fF9fuCEtOCX90BDlAO2i0wXt71qgTZoRKSc', {gender_id: 1 , id_number: 1234567, id_type: 1}) //hardcode
    getPatientCompleteData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0OTMwODA3NH0.IuBJ4-K9fF9fuCEtOCX90BDlAO2i0wXt71qgTZoRKSc', {gender_id: 1 , id_number: 1234567, id_type: 1}) //hardcode
  }, [])
  

  const contextValue = {
    patient,
    allPatients,
    getPatient,
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
