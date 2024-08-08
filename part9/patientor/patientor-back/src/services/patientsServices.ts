import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatientEntry } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  findById,
};
