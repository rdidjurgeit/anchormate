import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import apiClient from '../api/apiClient';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../styles/style.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const AnchorageForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorageData, setAnchorageData] = useState({
        name: '',
        location: '',
        latitude: 0,
        longitude: 0,
        depth: '',
        seabed_type: '',
        description: '',
    });
    const [error, setError] = useState(null);

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
    });

    useEffect(() => {
        if (id) {
            apiClient.get(`/api/anchorages/${id}/`)
                .then(response => setAnchorageData(response.data))
                .catch(() => setError('Failed to load anchorage details.'));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnchorageData(prevData => ({ ...prevData, [name]: value }));
        setError(null); // Clear error on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const request = id
            ? apiClient.put(`/api/anchorages/${id}/`, anchorageData) // Update if editing
            : apiClient.post('/api/anchorages/', anchorageData);    // Create if new

        request
            .then(() => navigate('/anchorages'))
            .catch((error) => {
                const errorMsg = error.response?.data
                    ? JSON.stringify(error.response.data)
                    : "Failed to save anchorage.";
                setError(errorMsg);
            });
    };

    return (
        <Container className="my-4">
            <Card className="p-4">
                <Card.Body>
                    <Card.Title>{id ? 'Edit' : 'Create'} Anchorage</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                placeholder="Name"
                                value={anchorageData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                name="location"
                                placeholder="Location"
                                value={anchorageData.location}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="latitude"
                                placeholder="Latitude"
                                value={anchorageData.latitude}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="longitude"
                                placeholder="Longitude"
                                value={anchorageData.longitude}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Depth</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="depth"
                                placeholder="Depth"
                                value={anchorageData.depth}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Seabed Type</Form.Label>
                            <Form.Control
                                name="seabed_type"
                                placeholder="Seabed Type"
                                value={anchorageData.seabed_type}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                placeholder="Description"
                                value={anchorageData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="me-2">
                            {id ? 'Update' : 'Create'}
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/anchorages')}>
                            Cancel
                        </Button>
                    </Form>

                    {/* Map Section */}
                    {isLoaded && (
                        <div className="mt-4">
                            <h5>Preview Location on Map</h5>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                    lat: parseFloat(anchorageData.latitude) || 0,
                                    lng: parseFloat(anchorageData.longitude) || 0,
                                }}
                                zoom={4}
                            >
                                <Marker
                                    position={{
                                        lat: parseFloat(anchorageData.latitude) || 0,
                                        lng: parseFloat(anchorageData.longitude) || 0,
                                    }}
                                />
                            </GoogleMap>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AnchorageForm;
