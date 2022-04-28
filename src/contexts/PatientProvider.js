import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import patientBasicDataServices from "../services/patientService";
import { error, errorActivePatient, toastPatient } from "../components/SwalAlertData";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const [ allPatients, setAllPatients ] = useState([auth.user]) 
  const [patient, setPatient] = useState( JSON.parse(localStorage.getItem("patient")) || allPatients[0] );
  const [patientInstitution, setPatientInstitution] = useState(patient.id_usual_institution);
  const [idPatient, setIdPatient] = useState( JSON.parse(localStorage.getItem("idPatient")) || null );

  useEffect(() => {
    try {
      localStorage.setItem("patient", JSON.stringify(patient));
      localStorage.setItem("idPatient", JSON.stringify(idPatient));
    } catch (error) {
      localStorage.removeItem("idPatient");
      localStorage.removeItem("patient");
    } 
  }, [patient, idPatient]);

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

  useEffect(() => {
    if(auth.user.family_group.length > 0 ){
      auth.user.family_group.map(p => allPatients.push(p))
    }
  }, [allPatients])
  

  const getPatient = (identification_number) => {
    const p = allPatients.find(
      (patient) => patient.identification_number === identification_number
    ); 
    if(p){
      let body = {
        gender_id: p.id_gender ,
        identification_number: p.identification_number,
        type_id: p.id_identification_type
        // gender_id: 2, //hardcode
        // identification_number: 36436060, //hardcode
        // type_id: 1, //hardcode
      };
      getPatientBasicData(p, body);
      Toast.fire(toastPatient(`${p.name} ${p.surname}`));
      return patient;
    } else {
      Swal.fire(errorActivePatient).then((result) => {
        if (result.isConfirmed) {
          auth.logout()
        }
    })
    }
  };

  const changeInstitution = (e) => {
    let id_institution = parseInt(e.target.value);
    setPatientInstitution(id_institution);
  };

  const getPatientBasicData = useCallback(
    (p, data) => {
    patientBasicDataServices(data)
      .then((res) => {
        if(p){
          console.log('basic', res)
          setPatientInstitution(p.id_usual_institution);
          setPatient(p);
          if(res.detail){
            throw new Error('Error al obtener datos de paciente en HSI')
          } else {
            setIdPatient(res.id);
            // setIdPatient(150) //hardcode
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const contextValue = {
    patient,
    allPatients,
    getPatient,
    patientInstitution,
    changeInstitution,
    idPatient,
    // register
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
