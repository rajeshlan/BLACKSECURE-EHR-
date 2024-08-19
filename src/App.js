import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Register from './components/Register.js';
import ViewRecords from './components/ViewRecords.js';
import TransferData from './components/TransferData.js';
import FetchData from './components/FetchData.js';
import DoctorDashboard from './components/DoctorDashboard.js';
import PatientDashboard from './components/PatientDashboard.js';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <nav>
                <NavLink to="/">Doctor Dashboard</NavLink>
                <NavLink to="/patient-dashboard">Patient Dashboard</NavLink>
                <NavLink to="/transfer-patient">Transfer Patient</NavLink>
                <NavLink to="/insurance">Insurance</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<DoctorDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/transfer-patient" element={<TransferData />} />
                <Route path="/register" element={<Register />} />
                <Route path="/view-records" element={<ViewRecords />} />
                <Route path="/fetch" element={<FetchData />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
