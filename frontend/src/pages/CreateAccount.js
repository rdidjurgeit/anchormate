import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../styles/style.css';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reset errors
        setSuccess(null); // Reset success message

        // Check if passwords match before submitting
        if (password !== confirmPassword) {
            setError(['Passwords do not match.']);
            return;
        }

        try {
            // Attempt to create a new account
            await apiClient.post('/api/profiles/register/', { username, password, confirm_password: confirmPassword, email });
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            if (error.response && error.response.data) {
                const { data } = error.response;

                // Log detailed error response for debugging
                console.log("Registration error details:", data);

                // Combine all field errors into a single array
                const combinedErrors = [
                    ...(data.username || []),
                    ...(data.email || []),
                    ...(data.password || []),
                ];

                // Set the combined errors as the error state
                setError(combinedErrors.length ? combinedErrors : ["Registration failed. Please check the form for errors."]);
            } else {
                setError(["An unexpected error occurred. Please try again."]);
            }
            console.error("Registration error:", error);
        }
    };

    return (
        <div>
            <Container className="my-4">
                <Card className="p-4">
                    <Card.Body>
                        <Card.Title>Create Account</Card.Title>
                        {/* Display consolidated error message */}
                        {error && (
                            <Alert variant="danger">
                                <ul>
                                    {error.map((err, idx) => (
                                        <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                            </Alert>
                        )}
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
                                <Form.Text className="text-muted">
                                    <ul>
                                        <li>Your password can’t be too similar to your other personal information.</li>
                                        <li>Your password must contain at least 8 characters.</li>
                                        <li>Your password can’t be a commonly used password.</li>
                                        <li>Your password can’t be entirely numeric.</li>
                                    </ul>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
