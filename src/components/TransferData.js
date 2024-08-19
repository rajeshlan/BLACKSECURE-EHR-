import React, { useState } from 'react';
import { transferData } from '../ethereumService.js';

const TransferData = () => {
    const [patient, setPatient] = useState('');
    const [newDoctor, setNewDoctor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTransfer = async () => {
        setLoading(true);
        setError('');
        try {
            await transferData(newDoctor, patient);
            alert('Patient transferred successfully!');
        } catch (err) {
            setError('Error transferring patient: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Transfer Patient</h2>
            <input
                type="text"
                placeholder="Patient ID"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
            />
            <input
                type="text"
                placeholder="New Doctor ID"
                value={newDoctor}
                onChange={(e) => setNewDoctor(e.target.value)}
            />
            <button onClick={handleTransfer} disabled={loading}>
                {loading ? 'Transferring...' : 'Transfer Patient'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default TransferData;
