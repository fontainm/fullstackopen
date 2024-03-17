import { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import {
  getAllDiaryEntries,
  createDiaryEntry,
} from './services/diaryEntryService';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    Visibility.Great
  );
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  console.log(newWeather);

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
      setNewVisibility(Visibility.Great);
      setNewWeather(Weather.Sunny);
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
          <h4>Date</h4>
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          <h4>Visibility</h4>
          {Object.values(Visibility).map((visibility, index) => (
            <div key={index}>
              <input
                type="radio"
                id={visibility}
                checked={visibility === newVisibility}
                name="visibility"
                value={visibility}
                onChange={() => setNewVisibility(visibility)}
              />
              <label htmlFor={visibility}>{visibility}</label>
            </div>
          ))}
        </div>
        <div>
          <h4>Weather</h4>
          {Object.values(Weather).map((weather, index) => (
            <div key={index}>
              <input
                type="radio"
                id={weather}
                name="weather"
                checked={weather === newWeather}
                value={weather}
                onChange={() => setNewWeather(weather)}
              />
              <label htmlFor={weather}>{weather}</label>
            </div>
          ))}
        </div>
        <div>
          <h4>Comment</h4>
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
