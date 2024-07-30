import React, { useState } from 'react';
import { transferData, getData } from './ethereumService';
import './App.css';

function App() {
    const [receiver, setReceiver] = useState('');
    const [payload, setPayload] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTransfer = async () => {
        setLoading(true);
        setError('');
        try {
            await transferData(receiver, payload);
            alert('Data transferred successfully!');
        } catch (err) {
            setError('Error transferring data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const fetchedData = await getData('SENDER_ADDRESS', receiver); // Replace 'SENDER_ADDRESS' with actual sender address
            setData(fetchedData);
        } catch (err) {
            setError('Error fetching data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Ethereum DApp</h1>
            <input
                type="text"
                placeholder="Receiver Address"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <input
                type="text"
                placeholder="Payload"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
            />
            <button onClick={handleTransfer} disabled={loading}>
                {loading ? 'Transferring...' : 'Transfer Data'}
            </button>
            <button onClick={handleFetchData} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Data'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>Fetched Data: {data}</div>
        </div>
    );
}

export default App;
