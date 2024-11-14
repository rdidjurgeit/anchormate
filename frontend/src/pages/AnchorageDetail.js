import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import  apiClient from "../api/apiClient";
import { Container, Card, Button } from 'react-bootstrap';
import '../styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const AnchorageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorage, setAnchorage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get(`/api/anchorages/${id}/`)
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
            <Container className="my-4">
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
        </div>
    );
};

export default AnchorageDetail;