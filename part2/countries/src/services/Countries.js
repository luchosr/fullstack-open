import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

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
