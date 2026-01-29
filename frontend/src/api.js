import axios from 'axios';

const api = axios.create({
  // Menggunakan IP terbaru kamu
  baseURL: 'http://10.181.6.108:8000/api' 
});

export default api;