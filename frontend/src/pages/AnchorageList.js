import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

const AnchorageList = ({ currentUser, bookmarkIds, onToggleBookmark }) => {
    const [anchorages, setAnchorages] = useState([]);
    const [error, setError] = useState(null);
    const [filteredAnchorages, setFilteredAnchorages] = useState([]);
    console.log("bookmarkIds" , bookmarkIds)
    useEffect(() => {
        apiClient.get('/api/anchorage/')
            .then(response => {
                setAnchorages(response.data);
                setFilteredAnchorages(response.data);
            })
            .catch(error => setError(error.message));
    }, [currentUser]);

    const handleSearch = (query) => {
        const filtered = anchorages.filter(
            anchorage =>
                anchorage.name.toLowerCase().includes(query.toLowerCase()) ||
                anchorage.location.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredAnchorages(filtered);
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container className="my-4">
            <h1>Anchorages</h1>
            {currentUser && (
                <Link to="/anchorage/create" className="btn btn-primary mb-4">
                    Create New Anchorage
                </Link>
            )}
            <SearchBar onSearch={handleSearch} />
            <Row>
                {filteredAnchorages.map(anchorage => (
                    <Col key={anchorage.id} xs={12} md={6} lg={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    {anchorage.name}
                                    {currentUser && (
                                        <i
                                            className="fas fa-anchor"
                                            onClick={() => onToggleBookmark(anchorage.id)}
                                            style={{
                                                cursor: 'pointer',
                                                color: bookmarkIds.includes(anchorage.id) ? 'green' : 'gray'
                                            }}
                                        ></i>
                                    )}
                                </Card.Title>
                                <Card.Text>
                                    <i className="fas fa-map-marker-alt"></i> {anchorage.location}
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-water"></i> Depth: {anchorage.depth} m
                                </Card.Text>
                                <Card.Text>
                                    <i className="fas fa-info-circle"></i> Seabed: {anchorage.seabed_type}
                                </Card.Text>
                                <Card.Text>
                                    {anchorage.description?.length > 100
                                        ? anchorage.description.substring(0, 100) + '...'
                                        : anchorage.description}
                                </Card.Text>
                                <Link to={`/anchorages/${anchorage.id}`} className="btn btn-primary mb-2">
                                    View Details
                                </Link>
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
    );
};

export default AnchorageList;