import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from "../api/apiClient";

const AnchorageList = () => {
    const [anchorages, setAnchorages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get('/api/anchorages/')
            .then((response) => {
                return response.data;
            })
            .then((data) => setAnchorages(data))
            .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Anchorages</h1>
            <ul>
                {anchorages.map((anchorage) => (
                    <li key={anchorage.id}>
                        <Link to={`/anchorages/${anchorage.id}`}>
                            {anchorage.name} - {anchorage.location}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnchorageList;