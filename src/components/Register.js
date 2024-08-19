import React, { useState } from 'react';
import { transferData } from '../ethereumService.js';

const Register = () => {
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            console.log(`Assigning patient ${patient} to doctor ${doctor}`);
            await transferData(doctor, patient);
            alert('Patient assigned successfully!');
            setPatient('');
            setDoctor('');
        } catch (error) {
            console.error('Error assigning patient:', error);
            setError('Failed to assign patient. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Assign Patient to Doctor</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="patient">Patient</label>
                <input
                    id="patient"
                    type="text"
                    placeholder="Enter patient ID"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    required
                />
                <label htmlFor="doctor">Doctor</label>
                <input
                    id="doctor"
                    type="text"
                    placeholder="Enter doctor ID"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Assigning...' : 'Assign Patient'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Register;
