import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import {
  getAllDiaryEntries,
  createDiaryEntry,
} from './services/diaryEntryService';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd = {
      id: diaryEntries.length + 1,
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    };

    try {
      const response = await createDiaryEntry(diaryEntryToAdd);
      setDiaryEntries(diaryEntries.concat(response));
      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');
      setError('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error: Something went wrong');
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error ? <p style={{ color: 'red' }}>Error: {error}</p> : null}
      <form onSubmit={diaryEntryCreation}>
        <div>
          date
          <input
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </div>
      ))}
    </>
  );
}

export default App;
