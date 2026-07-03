import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://pulsepredict-backend.onrender.com";


const instance = axios.create({
  baseURL: API_BASE,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => instance.post("/auth/signup", data);
export const login = (form) => instance.post("/auth/token", new URLSearchParams(form));
export const predict = (payload) => instance.post("/predict", payload);
export const history = () => instance.get("/history");
export const uploadCSV = (formData) => instance.post("/upload_csv", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export default instance;
