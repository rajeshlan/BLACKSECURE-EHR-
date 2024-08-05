import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { transferData, getData } from './ethereumService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Component for transferring data
const TransferData = () => {
    const [receiver, setReceiver] = useState('');
    const [payload, setPayload] = useState('');
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

    return (
        <div>
            <h2>Transfer Data</h2>
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
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

// Component for fetching data
const FetchData = () => {
    const [receiver, setReceiver] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        <div>
            <h2>Fetch Data</h2>
            <input
                type="text"
                placeholder="Receiver Address"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <button onClick={handleFetchData} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Data'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>Fetched Data: {data}</div>
        </div>
    );
};

// Main App component with routing
const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<TransferData />} />
                <Route path="/fetch" element={<FetchData />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
