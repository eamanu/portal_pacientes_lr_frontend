import { useCallback, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const allPatients = auth.user.grupo_familiar.pacientes;
  const [patient, setPatient] = useState(allPatients[0]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

 const getPatient = useCallback(
   (n) => {
    const promise = allPatients.find(patient => patient.id === n);
    setPatient(promise);
    Toast.fire({
      position: 'bottom-end',
      icon: 'success',
      title: `Paciente activo: ${promise.nombre} ${promise.apellido}`
    })
    return patient
   },
   [patient, allPatients, Toast],
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
