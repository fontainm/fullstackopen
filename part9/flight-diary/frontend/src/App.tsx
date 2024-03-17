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

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then((response) => {
        setDiaryEntries(response.data);
      });
  });

  return (
    <>
      <h2>Diary entries</h2>
      {diaryEntries.map((entry) => (
        <div>
          <h3>{entry.date}</h3>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </div>
      ))}
    </>
  );
}

export default App;
