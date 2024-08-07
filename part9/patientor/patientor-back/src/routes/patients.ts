import express from "express";
import patientServices from "../services/patientsServices";

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
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedpatient = patientServices.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.send(addedpatient);
});

export default router;
