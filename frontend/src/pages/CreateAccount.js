import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await apiClient.post('/api/profiles/register/', { username, password, email });
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return (
        <div>
            <Container className="my-4">
            <Card className="p-4">
                <Card.Body>
                    <Card.Title>Create Account</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};

export default CreateAccount;
