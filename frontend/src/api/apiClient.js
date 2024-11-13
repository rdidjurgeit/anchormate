import axios from "axios";

const TOKEN_LOCAL_STORAGE_KEY = "accessToken";

export const apiClient = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
