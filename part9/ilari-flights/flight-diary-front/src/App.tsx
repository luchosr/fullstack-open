import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getDairyEntries } from './services/diaryServices';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDairyEntries().then((data) => {
      setDiaries(data);
    });
  }, []);
  return (
    <>
      <div>
        <h2>Diary entries</h2>
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id} style={{ listStyleType: 'none' }}>
              <h4>{diary.date}</h4>
              <div className="">Visibility: {diary.visibility}</div>
              <div>Weather: {diary.weather}</div>
              <div>Comment: {diary.comment}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
