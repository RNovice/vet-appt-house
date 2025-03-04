import axios from "axios";
const { VITE_BACKEND_HOST: baseURL } = import.meta.env

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// wake render server
api("/")

export default api;
