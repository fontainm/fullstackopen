import { Alert, Button, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import patientService from '../services/patients';
import { Patient, EntryWithoutId, Entry } from '../types';
import axios from 'axios';

interface Props {
  patient: Patient;
  onAdd: (values: Entry) => void;
}

const AddEntryForm = ({ patient, onAdd }: Props) => {
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError('');
    const healthCheckRating = +rating;
    const diagnosisCodes = diagnosis.split(',');

    try {
      const newEntry: EntryWithoutId = {
        type: 'HealthCheck',
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes,
      };
      const entry: Entry = await patientService.createEntry(patient, newEntry);

      setDescription('');
      setDate('');
      setSpecialist('');
      setRating('');
      setDiagnosis('');

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
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="HealthCheck Rating"
          fullWidth
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosis}
          onChange={({ target }) => setDiagnosis(target.value)}
        />
        <Button type="submit" variant="contained">
          Add Entry
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
