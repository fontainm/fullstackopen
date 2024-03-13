import patientData from '../data/patients';

import { Patient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
};
