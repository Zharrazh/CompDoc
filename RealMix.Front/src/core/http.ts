import axios from 'axios';
import { history } from './history';
import { store } from './store';

export const http = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(config => {
  const authInfo = store.getState().common.auth.authInfo;
  if (authInfo.isAuth) config.headers.common['Authorization'] = 'Bearer ' + authInfo.token;
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) history.push('/login');
    if (error.response && error.response.status === 403) history.push('/accessdenied');
    if (error.response && error.response.status === 404) history.push('/notfound');
    return Promise.reject(error);
  }
);
