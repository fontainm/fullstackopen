import { NewPatient, Gender, EntryWithoutId, Diagnosis } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'date' in object &&
    'type' in object &&
    'specialist' in object &&
    'description' in object &&
    'diagnosisCodes' in object
  ) {
    const newEntry: EntryWithoutId = {
      date: parseDateOfBirth(object.date),
      // @ts-expect-error
      type: parseType(object),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseType = (object: object): string => {
  if (
    !('type' in object) ||
    object.type !== 'HealthCheck' ||
    !('healthCheckRating' in object)
  ) {
    throw new Error('Incorrect type');
  }
  return object.type;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect text');
  }
  return text;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export default toNewPatient;
