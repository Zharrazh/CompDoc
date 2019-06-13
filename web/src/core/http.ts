import axios from 'axios';
import { history } from './history';

export const http = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    history.push('/app/login');
  }
  if (error.response && error.response.status === 403) {
    history.push('/app/accessdenied');
  }
  if (error.response && error.response.status === 404) {
    history.push('/app/notfound');
  }
  return Promise.reject(error);
});