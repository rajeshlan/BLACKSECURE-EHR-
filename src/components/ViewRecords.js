import React, { useState } from 'react';
import { getData } from '../ethereumService.js';

const ViewRecords = () => {
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const retrievedData = await getData(doctor, patient);
            setData(retrievedData);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    return (
        <div className="view-records-container">
            <h2>View Patient Records</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="doctor">Doctor ID</label>
                <input
                    id="doctor"
                    type="text"
                    placeholder="Enter doctor ID"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                />
                <label htmlFor="patient">Patient ID</label>
                <input
                    id="patient"
                    type="text"
                    placeholder="Enter patient ID"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    required
                />
                <button type="submit">View Records</button>
            </form>
            {data && <div>Data: {data}</div>}
        </div>
    );
};

export default ViewRecords;
