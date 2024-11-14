import { useState, useEffect, useMemo } from 'react';
import apiClient from './apiClient';

export const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const bookmarkIds = useMemo(() => bookmarks.map(b => b.anchorage.id))
    
    const toggleBookmark = async (anchorageId) => {
        const isBookmarked = bookmarkIds.includes(anchorageId);
        try {
            if (isBookmarked) {
                const bookmark = bookmarks.find(b => b.anchorage.id === anchorageId);
                await apiClient.delete(`/api/bookmarks/${bookmark.id}/`);
                setBookmarks(bookmarks.filter(b => b.id !== bookmark.id));
            } else {
                const response = await apiClient.post('/api/bookmarks/', { anchorage_id: anchorageId});
                setBookmarks([...bookmarks, response.data]);
            }
        } catch (error) {
            console.error('Error updating bookmarks:', error);
        }
    };

    useEffect(() => {
        async function getBookmarks() {
            const response = await apiClient.get('/api/bookmarks/');
            setBookmarks(response.data);
        }
        getBookmarks();
    }, []);
    
    return {
        bookmarks,
        bookmarkIds,
        toggleBookmark,
    };
};
