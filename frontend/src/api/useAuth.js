import { useState, useEffect } from "react";
import apiClient from "./apiClient";

let refreshHandle = null;
const TOKEN_LOCAL_STORAGE_KEY = "accessToken";
const REFRESH_LOCAL_STORAGE_KEY = "refreshToken";
// Refresh the token every 10 minutes
const TOKEN_REFRESH_INTERVAL_MS = 10 * 60000;

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            setIsAuthenticated(true);
            startRefreshInterval();
            fetchUserProfile();
        }
    }, []);

    const refresh = async () => {
        try {
            const refresh = localStorage.getItem(REFRESH_LOCAL_STORAGE_KEY);
            if (refresh) {
                const response = await apiClient.post("/api/token/refresh/", { refresh });
                localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, response.data.access);
            } else {
                logout();
            }
        } catch(e) {
            logout();
        }
    };

    const startRefreshInterval = () => {
        if (!refreshHandle) {
            refreshHandle = setInterval(refresh, TOKEN_REFRESH_INTERVAL_MS);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await apiClient.post("/api/login/", { username, password });
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, response.data.access);
            localStorage.setItem(REFRESH_LOCAL_STORAGE_KEY, response.data.refresh);
            setIsAuthenticated(true);
            fetchUserProfile();
            startRefreshInterval();
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
        localStorage.removeItem(REFRESH_LOCAL_STORAGE_KEY);
        setIsAuthenticated(false);
        setCurrentUser(null);

        if (refreshHandle) {
            clearInterval(refreshHandle);
            refreshHandle = null;
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get("/api/profiles/");
            setCurrentUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    };

    return {
        isAuthenticated,
        currentUser,
        login,
        logout,
    };
};