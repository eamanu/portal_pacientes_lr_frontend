import { useContext } from "react";
import { PatientContext } from "../contexts/PatientProvider";

export default function usePatient() {
  return useContext(PatientContext);
}
