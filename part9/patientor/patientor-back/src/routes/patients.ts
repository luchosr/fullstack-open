import express from "express";
import patientSetvices from "../services/patientsServices";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientSetvices.getPatients());
});

router.post("/", (_req, res) => {
  res.send(patientSetvices.addPatient());
});

export default router;
