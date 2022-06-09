import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import patientBasicDataServices from "../services/patientService";
import { errorActivePatient, toastPatient } from "../components/SwalAlertData";
import { getPersonByIdentificationNumber } from "../services/personServices";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const [allPatients, setAllPatients] = useState([auth.user]);
  const [patient, setPatient] = useState(
    JSON.parse(localStorage.getItem("patient")) || allPatients[0]
  );
  const [patientInstitution, setPatientInstitution] = useState(
    patient.id_usual_institution
  );
  const [idPatient, setIdPatient] = useState(
    JSON.parse(localStorage.getItem("idPatient")) || patient.id_patient || null
  );

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
    if (auth.user.family_group.length > 0) {
      auth.user.family_group.map((p) => allPatients.push(p));
    }
  }, [allPatients]);

  const getPatient = useCallback((identification_number) => {
    getPersonByIdentificationNumber(identification_number)
      .then((res) => {
        if (res.id) {
          let p = res;
          if (p) {
            let body = {
              gender_id: p.id_gender,
              identification_number: p.identification_number,
              type_id: p.id_identification_type,
            };
            getPatientBasicData(p, body);
            Toast.fire(toastPatient(`${p.name} ${p.surname}`));
            return patient;
          }
        } else {
          throw new Error("No se encontró información del paciente");
        }
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire(errorActivePatient).then((result) => {
          if (result.isConfirmed) {
            auth.logout();
          }
        });
      });
  }, []);

  const getPatientBasicData = useCallback((p, data) => {
    patientBasicDataServices(data)
      .then((res) => {
        if (p) {
          setPatientInstitution(p.id_usual_institution);
          setPatient(p);
          if (res.detail) {
            if (p.id_patient) {
              setIdPatient(p.id_patient);
            } else {
              setIdPatient(null);
            }
            throw new Error("Error al obtener datos de paciente en HSI");
          } else {
            if(res.id){
              setIdPatient(res.id);
            }
          }
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const changeInstitution = (e) => {
    let id_institution = parseInt(e.target.value);
    setPatientInstitution(id_institution);
  };

  const contextValue = {
    patient,
    allPatients,
    getPatient,
    patientInstitution,
    changeInstitution,
    idPatient,
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
