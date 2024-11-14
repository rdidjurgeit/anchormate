import { useState, useEffect, useMemo } from 'react';
import apiClient from './apiClient';

export const useProfile = (currentUser) => {
    const [profile, setProfile] = useState({});
    const bookmarkIds = useMemo(() => profile 
        ? profile.bookmarked_anchorages.map(x => x.id)
        : []
    , [profile]);

    const toggleBookmark = async (id) => {
        const isBookmarked = bookmarkIds.includes(id);
        
        try {
            if (isBookmarked) {
                // Remove bookmark
                await apiClient.delete(`/api/bookmarks/${id}/`);
                // setBookmarkIds(bookmarkIds.filter(bid => bid !== id));
            } else {
                // Add bookmark
                await apiClient.post('/api/bookmarks/', { anchorage: id });
                // setBookmarkIds([...bookmarkIds, id]);
            }
        } catch (error) {
            console.error('Error updating bookmarks:', error);
        }
    };
    
    useEffect(() => {
        // Fetch user-profile if the user is logged in
        async function effect() {
            if (currentUser) {
                try {
                    const response = await apiClient.get('/api/profile/');
                    setProfile(response.data[0]);
                    console.log(response.data)
                } catch(e) {
                    console.error('Error fetching profile:', e);
                }
            }
        }
        effect();
    }, [currentUser]);

    return {
        bookmarkIds,
        toggleBookmark,
        profile,
    };
};