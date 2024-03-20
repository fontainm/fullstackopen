import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../types';
import diagnosisService from '../services/diagnoses';

import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const getDiagnosisByCode = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis?.name;
  };

  const getHealthRating = (rating: number) => {
    const result = [];
    const maxRating = 4;
    rating = maxRating - rating;
    for (let i = 0; i < maxRating; i++) {
      result.push(
        i >= rating ? (
          <FavoriteBorderIcon key={i} className="heart" />
        ) : (
          <FavoriteIcon key={i} className="heart" />
        )
      );
    }
    return result;
  };

  let entryIcon;
  let healthRating;

  switch (entry.type) {
    case 'Hospital':
      entryIcon = <MedicalInformationIcon />;
      break;
    case 'OccupationalHealthcare':
      entryIcon = <WorkIcon />;
      break;
    case 'HealthCheck':
      entryIcon = <LocalHospitalIcon />;
      healthRating = getHealthRating(entry.healthCheckRating);
      break;
    default:
      break;
  }

  return (
    <>
      <div className="entry">
        <p>
          <strong>{entry.date}</strong>
          {entryIcon}
        </p>
        <p>
          <i>{entry.description}</i>
        </p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code}: {getDiagnosisByCode(code)}
            </li>
          ))}
        </ul>
        {healthRating ?? null}
        <p>Diagnose by {entry.specialist}</p>
      </div>
    </>
  );
};

export default EntryDetails;
