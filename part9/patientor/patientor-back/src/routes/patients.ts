import express from "express";
import patientServices from "../services/patientsServices";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/:id", (req, res) => {
  const patient = patientServices.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get("/", (_req, res) => {
  res.send(patientServices.getPatients());
});

router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedEntry = toNewPatientEntry(req.body);
    const addedpatient = patientServices.addPatient(
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    );
    res.send(addedpatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
