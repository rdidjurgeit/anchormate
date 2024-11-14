import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AnchorageList from './pages/AnchorageList';
import AnchorageDetail from './pages/AnchorageDetail';
import NavigationBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import { useAuth } from './api/useAuth';
import AnchorageForm from './pages/AnchorageForm';
import Bookmarks from './pages/Bookmarks';
import apiClient from './api/apiClient';
import { useBookmarks } from './api/useBookmarks';
import ForgotPassword from './pages/ForgotPassword';
import UserProfilePage from './components/UserProfilePage';

function App() {
    const { login, logout, currentUser, isAuthenticated } = useAuth();
    const { bookmarks, bookmarkIds, toggleBookmark } = useBookmarks();
    const [anchorages, setAnchorages] = useState([]);

    useEffect(() => {
        // Fetch all anchorages
        apiClient.get('/api/anchorages/')
            .then(response => setAnchorages(response.data))
            .catch(error => console.error('Error fetching anchorages:', error));
    }, [currentUser]);

    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <NavigationBar loggedIn={isAuthenticated} onLogout={logout} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/anchorages" element={
                        <AnchorageList 
                            currentUser={currentUser} 
                            bookmarkIds={bookmarkIds}
                            onToggleBookmark={toggleBookmark}
                        />
                    }/>
                    <Route path="/anchorages/:id" element={<AnchorageDetail />} />
                    <Route path="/anchorages/create" element={<AnchorageForm />} />
                    <Route path="/anchorages/edit/:id" element={<AnchorageForm />} />
                    
                    {/* Protected Bookmarks Route */}
                    <Route path="/bookmarks" element={
                        <ProtectedRoute>
                            <Bookmarks 
                                currentUser={currentUser} 
                                bookmarks={bookmarks} 
                                onToggle={toggleBookmark}
                            />
                        </ProtectedRoute>
                    }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;