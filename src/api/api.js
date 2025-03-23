import axios from "axios";

const api = axios.create({
  baseURL: "http://157.230.95.77:5000/api",
  withCredentials: true, // Required for cookies-based authentication
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
