import axios from "axios";
let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = axios.create({ baseURL });

// attach JWT on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("st_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper to get user ID from token
API.getUserId = () => {
  const token = localStorage.getItem("st_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (e) {
    return null;
  }
};

export default API;
