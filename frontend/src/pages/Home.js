import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/style.css'; 

const Home = () => {
    return (
    <div>
    <Container className="text-center my-5">
        <Row>
            <Col>
                <h1>Welcome to Anchormate!</h1>
                <p>This platform is is a community-driven platform designed to be the ultimate resource for 
            sailors seeking the best anchorages worldwide. Whether you're navigating familiar 
            waters or exploring new territories, Anchormate provides detailed insights on anchorages shared by sailors 
            themselves. Users can browse and contribute essential information, including location details, depth, seabed type, 
            and personal experiences, creating a rich database of trusted, real-world knowledge. Anchormate is not just a guide 
            but a collaborative tool where the global sailing community connects to make every voyage safer and more enjoyable,
             no matter where the journey takes you. </p>
                <p>Log in to create anchorage information and become a part of our community.</p>
            </Col>
        </Row>
    </Container>
    </div>
    );
};
export default Home;