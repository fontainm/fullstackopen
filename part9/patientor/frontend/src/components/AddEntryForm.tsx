import {
  Alert,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';

import {
  Patient,
  EntryWithoutId,
  Entry,
  HealthCheckRating,
  Diagnosis,
} from '../types';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Props {
  patient: Patient;
  onAdd: (values: Entry) => void;
}

const now = dayjs();

const AddEntryForm = ({ patient, onAdd }: Props) => {
  const [error, setError] = useState('');

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState(now);
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError('');
    const healthCheckRating: HealthCheckRating =
      HealthCheckRating[rating as keyof typeof HealthCheckRating];

    try {
      const newEntry: EntryWithoutId = {
        type: 'HealthCheck',
        description,
        date: date.toString(),
        specialist,
        healthCheckRating,
        diagnosisCodes: diagnosisCodes.map((d) => d.code),
      };
      const entry: Entry = await patientService.createEntry(patient, newEntry);

      setDescription('');
      setDate(now);
      setSpecialist('');
      setRating('');
      setDiagnosisCodes([]);

      onAdd(entry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="entry new">
      <h3>New HealthCheck entry</h3>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DatePicker
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate ?? dayjs())}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>HealthCheck Rating</InputLabel>
          <Select
            value={rating}
            onChange={({ target }) => setRating(target.value)}
          >
            {Object.values(HealthCheckRating)
              .filter((v) => isNaN(Number(v)))
              .map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Autocomplete
          multiple
          id="diagnosesinput"
          options={diagnoses}
          getOptionLabel={(option: Diagnosis) => option.code}
          renderInput={(params) => (
            <TextField {...params} label="Diagnosis codes" />
          )}
          value={diagnosisCodes}
          onChange={(_event, diagnosis: Diagnosis) => {
            setDiagnosisCodes([...diagnosis]);
          }}
        />
        <Button type="submit" variant="contained">
          Add Entry
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
