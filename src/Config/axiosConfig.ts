import axios from "axios";

const serverApiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: serverApiUrl,
  timeout: 10000,
});

export default api;
