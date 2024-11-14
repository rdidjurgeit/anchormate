import { useState, useEffect } from "react";
import apiClient from "./apiClient";

const TOKEN_LOCAL_STORAGE_KEY = "accessToken";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            setIsAuthenticated(true);
            fetchUserProfile();
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await apiClient.post("/api/login/", { username, password });
            const token = response.data.access;
            localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
            setIsAuthenticated(true);
            fetchUserProfile();
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
        setIsAuthenticated(false);
        setCurrentUser(null);
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