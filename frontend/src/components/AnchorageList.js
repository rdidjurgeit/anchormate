import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AnchorageList = () => {
    const [anchorages, setAnchorages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/anchorages/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
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