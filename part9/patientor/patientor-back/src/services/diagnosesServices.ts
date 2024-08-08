import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin,
  }));
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses,
};
