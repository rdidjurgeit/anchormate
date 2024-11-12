import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const apiClient = axios.create();