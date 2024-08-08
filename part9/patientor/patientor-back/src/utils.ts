import { Gender, NewPatientEntry } from './types';

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment');
  }

  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isEmptyString = (text: string): boolean => {
  return text.trim().length === 0;
};

const parseData = (data: unknown, name: string): string => {
  if (!isString(data)) {
    throw new Error(`Incorrect data in field: '${name}'`);
  }

  if (isEmptyString(data)) {
    throw new Error(`Missing value in field: '${name}'`);
  }

  return data;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseData(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseData(object.occupation, 'occupation'),
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: a field missing');
};
