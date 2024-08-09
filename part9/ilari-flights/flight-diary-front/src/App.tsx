import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { createNewDiaryEntry, getDairyEntries } from './services/diaryServices';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState('');

  useEffect(() => {
    getDairyEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewDiaryEntry(newDiary).then((data) => {
      setDiaries(diaries.concat(data));
    });

    setNewDiary('');
  };
  return (
    <>
      <div>
        <h2>Diary entries</h2>
        <form onSubmit={noteCreation}>
          <input
            value={newDiary}
            onChange={(event) => setNewDiary(event.target.value)}
          />
          <button type="submit">add</button>
        </form>
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
