import axios from "axios";

const api = axios.create({
    // SEBELUMNYA: baseURL: 'http://localhost:8000/api'
    baseURL: "http://10.181.7.29:8000/api", // GANTI DENGAN IP KAMU
});

export default api;
