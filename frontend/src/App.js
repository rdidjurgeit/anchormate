import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnchorageList from './pages/AnchorageList';
import AnchorageDetail from './pages/AnchorageDetail';
import NavigationBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import { useAuth } from './api/useAuth';

function App() {
    const { isLoggedIn, login, logout } = useAuth();

    return (
        <Router>
            <NavigationBar loggedIn={isLoggedIn} onLogout={logout} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/anchorage-list" element={<AnchorageList />} />
                    <Route path="/anchorage-details/:id" element={<AnchorageDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
