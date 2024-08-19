import React, { useState } from 'react';
import { getData } from '../ethereumService.js';

const FetchData = () => {
    const [patient, setPatient] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const fetchedData = await getData('DOCTOR_ID', patient); // Replace 'DOCTOR_ID' with actual doctor ID
            setData(fetchedData);
        } catch (err) {
            setError('Error fetching data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Fetch Patient Data</h2>
            <input
                type="text"
                placeholder="Patient ID"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
            />
            <button onClick={handleFetchData} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Data'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>Fetched Data: {data}</div>
        </div>
    );
};

export default FetchData;
