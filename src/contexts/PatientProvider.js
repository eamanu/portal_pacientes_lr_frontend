import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import patientBasicDataServices from "../services/patientService";
import { toastPatient } from "../components/SwalAlertData";

export const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const auth = useAuth();
  const allPatients = auth.user.family_group;
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

  const getPatient = (identification_number) => {
    const p = allPatients.find(
      (patient) => patient.identification_number === identification_number
    );
    let body = {
      // gender_id: p.id_gender ,
      // identification_number: p.identification_number,
      // type_id: p.id_identification_type
      gender_id: 2, //hardcode
      identification_number: 36436060, //hardcode
      type_id: 1, //hardcode
    };
    getPatientBasicData(p, body);
    Toast.fire(toastPatient(`${p.name} ${p.surname}`));
    return patient;
  };

  const changeInstitution = (e) => {
    let id_institution = parseInt(e.target.value);
    setPatientInstitution(id_institution);
  };

  const getPatientBasicData = useCallback(
    (p, data) => {
    patientBasicDataServices(data)
      .then((res) => {
        // console.log('basic', res)
        setPatientInstitution(p.id_usual_institution);
        setIdPatient(res.id);
        setPatient(p);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const getPatientCompleteData = useCallback((tokenId, data) => {
  //   patientCompleteDataServices(tokenId, data)
  //     .then((res) => {
  //       console.log("complete", res);
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   getPersonByIdentificationNumber();
  // }, [])

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
