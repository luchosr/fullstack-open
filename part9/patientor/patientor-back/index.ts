import express from "express";
const cors = require("cors");

import patientsRouter from "./src/routes/patients";
import diagnosesRouter from "./src/routes/diagnoses";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
