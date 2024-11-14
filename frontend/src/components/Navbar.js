import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = ({ loggedIn, onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Anchormate</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Left side: Home and Anchorage List */}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/anchorages">Anchorage List</Nav.Link>
                    </Nav>
                    
                    {/* Right side: User Profile, Bookmarks, Login/Logout */}
                    <Nav className="ms-auto">
                        {loggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/profile">User Profile</Nav.Link>
                                <Nav.Link as={Link} to="/bookmarks">Bookmarks</Nav.Link>
                                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/create-account">Create Account</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;