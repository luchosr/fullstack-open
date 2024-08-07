import { Gender, Patient } from "./types";

export const toNewPatientEntry = (object: Patient | unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const newPatientEntry: Patient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.date),
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop",
  };
  return newPatientEntry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing comment");
  }

  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
