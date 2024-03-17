import { useEffect, useState } from 'react';
import axios from 'axios';

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then((response) => {
        setDiaryEntries(response.data);
      });
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryEntryToAdd = {
      id: diaryEntries.length + 1,
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    };

    axios
      .post<DiaryEntry>('http://localhost:3000/api/diaries', diaryEntryToAdd)
      .then((response) => {
        setDiaryEntries(diaryEntries.concat(response.data));
      });

    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  };

  return (
    <>
      <h2>Add new entry</h2>
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
