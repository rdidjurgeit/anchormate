import { useState, useEffect, useMemo } from 'react';
import apiClient from './apiClient';

const TOKEN_LOCAL_STORAGE_KEY = 'accessToken';

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    // Determine if the user is logged in based on whether `currentUser` exists
    const isLoggedIn = useMemo(() => currentUser != null, [currentUser]);

    // Load the current user on component mount if there's a token in localStorage
    useEffect(() => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            apiClient.get('/api/current-user/')
                .then(response => setCurrentUser(response.data))
                .catch(error => {
                    console.error("Failed to fetch current user:", error);
                    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY); // Clear token if invalid
                });
        }
    }, []);

    // Handle login, saving the token and fetching the current user
    const login = async (username, password) => {
        const tokenResponse = await apiClient.post('/api/login/', { username, password });
        localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, tokenResponse.data.access);
        const userResponse = await apiClient.get('/api/current-user/');
        setCurrentUser(userResponse.data);
    };

    // Handle logout, clearing the token and current user
    const logout = () => {
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
        setCurrentUser(null);
    };

    return { currentUser, isLoggedIn, login, logout };
};