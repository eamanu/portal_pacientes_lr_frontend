import { useCallback, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const allPatients = auth.user.grupo_familiar.pacientes;
  const [patient, setPatient] = useState(allPatients[0]);

 const getPatient = useCallback(
   (n) => {
    const promise = allPatients.find(patient => patient.id === n);
    setPatient(promise);
    return patient
   },
   [patient, allPatients],
 )

  const contextValue = {
    patient,
    allPatients,
    getPatient
  };


  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
