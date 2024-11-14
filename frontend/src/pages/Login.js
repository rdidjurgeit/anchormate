import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation to Forgot Password
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await onLogin(username, password); // Call the login function from useAuth
            navigate('/'); // Redirect after successful login
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <Container className="my-4">
                <Card className="p-4">
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        {error && <Alert variant="danger">{error}</Alert>}
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
                                Login
                            </Button>
                        </Form>
                        {/* Forgot Password Link */}
                        <div className="mt-3">
                            <Link to="/forgot-password" className="text-muted">
                                Forgot Password?
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;