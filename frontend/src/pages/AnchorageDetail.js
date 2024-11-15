import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import Map from '../components/Map';
import '../styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const AnchorageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorage, setAnchorage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get(`/api/anchorages/${id}/`)
            .then((response) => response.data)
            .then((data) => setAnchorage(data))
            .catch((error) => setError(error.message));
    }, [id]);

    if (error) {
        return <Alert variant="danger">Error: {error}</Alert>;
    }

    if (!anchorage) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className="my-4">
            {/* Map Section */}
            <div>
                <Map anchorages={[anchorage]}/> 
            </div>

            {/* Anchorage Details Section */}
            <Card className="p-4">
                <Card.Body>
                    <Card.Title className="mb-4">{anchorage.name}</Card.Title>
                    <Card.Text>
                        <i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {anchorage.location}
                    </Card.Text>
                    <Card.Text>
                        <i className="fas fa-globe"></i> <strong>Latitude:</strong> {anchorage.latitude}
                    </Card.Text>
                    <Card.Text>
                        <i className="fas fa-globe"></i> <strong>Longitude:</strong> {anchorage.longitude}
                    </Card.Text>
                    <Card.Text>
                        <i className="fas fa-water"></i> <strong>Depth:</strong> {anchorage.depth} m
                    </Card.Text>
                    <Card.Text>
                        <i className="fas fa-info-circle"></i> <strong>Seabed Type:</strong> {anchorage.seabed_type}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {anchorage.description}
                    </Card.Text>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/anchorages')}
                        className="mt-3"
                    >
                        Back to Anchorage List
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AnchorageDetail;
