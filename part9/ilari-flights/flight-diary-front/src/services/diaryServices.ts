import axios from 'axios';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getNonSensitiveDiaryEntries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export const getDairyEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};
