import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from '../../services/patients';

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
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PatientInfoPage;
