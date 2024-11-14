import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const UserProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/api/profiles/');
                setProfile(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile");
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return profile ? (
        <div>
            <h1>{profile.username}'s Profile</h1>
            <p>Email: {profile.email}</p>
            {/* Other profile fields */}
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default UserProfilePage;
