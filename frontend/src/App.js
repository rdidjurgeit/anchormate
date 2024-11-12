import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnchorageList from './pages/AnchorageList';
import AnchorageDetail from './pages/AnchorageDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AnchorageList />} />
                <Route path="/anchorages/:id" element={<AnchorageDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
