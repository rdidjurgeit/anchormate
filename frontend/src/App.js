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
import apiClient from './api/apiClient'

function App() {
    const { currentUser, isLoggedIn, login, logout } = useAuth();
    const [anchorages, setAnchorages] = useState([]);
    const [bookmarkIds, setBookmarkIds] = useState([]);

    useEffect(() => {
        // Fetch all anchorages
        apiClient.get('/api/anchorage/')
            .then(response => setAnchorages(response.data))
            .catch(error => console.error('Error fetching anchorages:', error));

        // Fetch user-specific bookmarks if the user is logged in
        if (currentUser) {
            apiClient.get(`/api/users/${currentUser.username}/bookmarks`)
                .then(response => setBookmarkIds(response.data))  // Assuming response.data is an array of IDs
                .catch(error => console.error('Error fetching bookmarks:', error));
        }
    }, [currentUser]);

    return (
        <Router>
            <NavigationBar loggedIn={isLoggedIn} onLogout={logout} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/anchorages" element={<AnchorageList currentUser={currentUser}/>} />
                    <Route path="/anchorages/:id" element={<AnchorageDetail />} />
                    <Route path="/anchorage/create" element={<AnchorageForm />} /> {/* Create anchorage */}
                    <Route path="/anchorages/edit/:id" element={<AnchorageForm />} /> {/* Edit anchorage */}
                    <Route path="/bookmarks"element={isLoggedIn ? (<Bookmarks 
                                    currentUser={currentUser} bookmarkIds={bookmarkIds} anchorages={anchorages}/>
                                ) : (<Navigate to="/login" replace />)}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
