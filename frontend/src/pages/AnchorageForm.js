import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AnchorageForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorageData, setAnchorageData] = useState({
        name: '',
        location: '',
        latitude: '',
        longitude: '',
        depth: '',
        seabed_type: '',
        description: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiClient.get(`/api/anchorage/${id}/`)
                .then(response => setAnchorageData(response.data))
                .catch(error => setError('Failed to load anchorage details.'));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnchorageData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

                // Validate latitude and longitude fields
                if (!isValidCoordinate(anchorageData.latitude)) {
                    setError("Latitude must be a valid decimal number.");
                    return;
                }
                if (!isValidCoordinate(anchorageData.longitude)) {
                    setError("Longitude must be a valid decimal number.");
                    return;
                }
        
                const request = id
                    ? apiClient.put(`/api/anchorage/${id}/`, anchorageData)  // Update if editing
                    : apiClient.post('/api/anchorage/', anchorageData);       // Create if new
        
                request
                    .then(() => navigate('/anchorages'))
                    .catch(error => {
                        // Display specific error from response
                        const errorMsg = error.response?.data
                            ? JSON.stringify(error.response.data)
                            : "Failed to save anchorage.";
                        setError(errorMsg);
                    });
            };
        
            // Helper function to validate decimal coordinates
            const isValidCoordinate = (value) => {
                const decimalRegex = /^-?\d+(\.\d+)?$/; // Match optional negative sign, digits, and optional decimal part
                return decimalRegex.test(value);
            };

    return (
        <div>
            <h1>{id ? 'Edit' : 'Create'} Anchorage</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={anchorageData.name} onChange={handleChange} required />
                <input name="location" placeholder="Location" value={anchorageData.location} onChange={handleChange} required />
                <input name="latitude" placeholder="Latitude" value={anchorageData.latitude} onChange={handleChange} required />
                <input name="longitude" placeholder="Longitude" value={anchorageData.longitude} onChange={handleChange} required />
                <input name="depth" placeholder="Depth" value={anchorageData.depth} onChange={handleChange} required />
                <input name="seabed_type" placeholder="Seabed Type" value={anchorageData.seabed_type} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={anchorageData.description} onChange={handleChange} required />
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default AnchorageForm;