import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyapi.io/data/v1/',
  headers: {
    'app-id': process.env.VUE_APP_ID,
  }
});

export default api;
