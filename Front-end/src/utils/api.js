import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
});

export const login = (email, password) => {
  return api.post('auth/login', { email, password });
};

export default api;
