import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AnchorageList = ({currentUser}) => {  // Assume currentUser is passed as a prop
    const [anchorages, setAnchorages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get('/api/anchorage/')
            .then(response => setAnchorages(response.data))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Anchorages</h1>
            {currentUser && <Link to="/anchorage/create">Create New Anchorage</Link>} {/* Show only if logged in */}
            <ul>
                {anchorages.map((anchorage) => (
                    <li key={anchorage.id}>
                        <Link to={`/anchorages/${anchorage.id}`}>
                            {anchorage.name} - {anchorage.location}
                            </Link>
                        {/* Show "Edit" button only if the current user is the creator */}
                        {anchorage.added_by === currentUser?.username && (
                            <Link to={`/anchorages/edit/${anchorage.id}`}>Edit</Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnchorageList;
