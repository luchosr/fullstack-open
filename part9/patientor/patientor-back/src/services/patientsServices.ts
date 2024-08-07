import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { Patient, Gender } from "../types";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient;
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
): Patient => {
  const newPatientEntry = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  findById,
};
