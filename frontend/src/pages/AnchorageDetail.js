import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import  apiClient from "../api/apiClient";


const AnchorageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorage, setAnchorage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get(`/api/anchorage/${id}/`)
            .then((response) => {
                return response.data;
            })
            .then((data) => setAnchorage(data))
            .catch((error) => setError(error.message));
    }, [id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!anchorage) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{anchorage.name}</h1>
            <p>Location: {anchorage.location}</p>
            <p>Depth: {anchorage.depth}</p>
            <p>Seabed Type: {anchorage.seabed_type}</p>
            <p>Description: {anchorage.description}</p>

            <button onClick={() => navigate('/anchorages')}>Back to Anchorage List</button>
        </div>
    );
};

export default AnchorageDetail;