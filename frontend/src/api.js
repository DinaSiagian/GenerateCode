import axios from "axios";

const api = axios.create({
    // IP Laptop kamu saat ini (10.181.7.29)
    baseURL: "http://10.181.7.29:8000/api",
});

export default api;
