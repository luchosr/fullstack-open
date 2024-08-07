import patientsData from "../../data/patients";

import { Patient } from "../types";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
};
