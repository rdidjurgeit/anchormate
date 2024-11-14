import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Bookmarks = ({bookmarkIds}) => {
    const [error, setError] = useState(null);
    
    return (
        <Container className="my-4">
            <h1>Your Bookmarked Anchorages</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Row>
                {bookmarkIds.length > 0 ? (
                    bookmarkIds.map(anchorage => (
                        <Col key={anchorage.id} xs={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>
                                        {anchorage.name || "Unnamed Anchorage"}
                                    </Card.Title>
                                    <Card.Text>
                                        Location: {anchorage.location || "Unknown"}
                                    </Card.Text>
                                    <a href={`/anchorages/${anchorage.id}`} className="btn btn-primary">
                                        View Details
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No bookmarks yet.</p>
                )}
            </Row>
        </Container>
    );
};

export default Bookmarks;