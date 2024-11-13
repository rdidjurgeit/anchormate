import { useState, useEffect, useMemo } from 'react';
import apiClient from './apiClient';

const TOKEN_LOCAL_STORAGE_KEY = 'accessToken';

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    // Determine if the user is logged in based on whether `currentUser` exists
    const isLoggedIn = useMemo(() => currentUser != null, [currentUser]);

    // Load the current user on component mount if there's a token in localStorage
    useEffect(() => {
        getCurrentUser();
    }, []);
    
    const login = async (username, password) => {
        const tokenResponse = await apiClient.post('/api/login/', { username, password });
        localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, tokenResponse.data.access);
        await getCurrentUser();
    };

    // Handle logout, clearing the token and current user
    const logout = () => {
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
        setCurrentUser(null);
    };

    const getCurrentUser = async () => {
        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            try {
                const response = await apiClient.get('/api/current-user/');
                setCurrentUser(response.data);
            } catch(e) {
                // Ignore 401 error if the token is expired
            }
        }
    };

    return { currentUser, isLoggedIn, login, logout };
};