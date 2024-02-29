import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${
//   import.meta.env.VITE_OPENWEATHER_KEY
// }`;

export const getAll = () => {
  return axios.get(baseUrl);
};

export const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

export const deleteOne = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export const getCapitalWeather = (city) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
      import.meta.env.VITE_OPENWEATHER_KEY
    }`
  );
};
