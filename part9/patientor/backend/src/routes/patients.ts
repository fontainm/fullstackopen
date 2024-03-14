import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, gender, ssn, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  });
  res.json(addedPatient);
});

export default router;
