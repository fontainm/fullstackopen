import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Entry, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from '../../services/patients';
import EntryDetails from '../EntryDetails';
import AddEntryForm from '../AddEntryForm';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const id = useParams().id;

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (!id) return;
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    void fetchPatientInfo();
  }, []);

  if (!patient) {
    return null;
  }

  const addEntry = (newEntry: Entry) => {
    setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
  };

  let genderIcon;

  switch (patient.gender) {
    case 'male':
      genderIcon = <MaleIcon />;
      break;
    case 'female':
      genderIcon = <FemaleIcon />;
      break;
    default:
      genderIcon = <TransgenderIcon />;
      break;
  }

  return (
    <>
      <h2>
        {patient.name}
        {genderIcon}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <AddEntryForm patient={patient} onAdd={addEntry} />
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} key={entry.date} />
      ))}
    </>
  );
};

export default PatientInfoPage;
