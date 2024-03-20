import { v1 as uuid } from 'uuid';

import patientData from '../data/patients';

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  EntryWithoutId,
} from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitivePatient = (
  id: string
): NonSensitivePatient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    };
  } else {
    return undefined;
  }
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  getNonSensitivePatients,
  getNonSensitivePatient,
  addEntry,
};
