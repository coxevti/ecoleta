import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3901',
});

export default api;
