import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
 

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
           <Container className="my-4">
            <h1>Anchorages</h1>
            {currentUser && (
                <Link to="/anchorage/create" className="btn btn-primary mb-4">
                    Create New Anchorage
                </Link>
            )}
            <Row>
                {anchorages.map((anchorage) => (
                    <Col key={anchorage.id} xs={12} md={6} lg={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{anchorage.name}</Card.Title>
                                <Card.Text>
                                    <i className="fas fa-map-marker-alt"></i> {anchorage.location}
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-water"></i> Depth: {anchorage.depth} m
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-info-circle"></i> Seabed: {anchorage.seabedType}
                                </Card.Text>
                                <Card.Text>
                                    {anchorage.description.length > 100
                                        ? anchorage.description.substring(0, 100) + '...'
                                        : anchorage.description}
                                </Card.Text>
                                <Link to={`/anchorages/${anchorage.id}`} className="btn btn-primary mb-2">
                                    View Details
                                </Link>
                                {/* Show "Edit" button only if the current user is the creator */}
                                {anchorage.added_by === currentUser?.username && (
                                    <Link to={`/anchorages/edit/${anchorage.id}`} className="btn btn-secondary">
                                        Edit
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
    );
};

export default AnchorageList;
