import axios from "axios";

const api = axios.create({
    // IP ini harus sama dengan IP Laptop kamu saat ini
    baseURL: "http://10.181.7.29:8000/api",
});

export default api;
