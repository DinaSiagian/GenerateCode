import axios from 'axios';
<<<<<<< Updated upstream
const api = axios.create({ baseURL: 'http://localhost:8000/api' });
=======

const api = axios.create({
  // WAJIB pakai IP Laptop kamu agar HP bisa akses
  baseURL: 'http://10.181.8.82:8000/api' 
});

>>>>>>> Stashed changes
export default api;