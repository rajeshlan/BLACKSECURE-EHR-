const { Alchemy } = require('alchemy-sdk');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { ALCHEMY_API_KEY, PINATA_API_KEY, PINATA_API_SECRET } = process.env;

const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: 'sepolia'
};

const alchemy = new Alchemy(settings);

const pinataUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

/**
 * Stores data on IPFS via Pinata and returns the IPFS hash.
 * @param {Object} data - The data to be stored on IPFS.
 * @returns {Promise<string>} - The IPFS hash of the stored data.
 */
async function storeDataIPFS(data) {
    const fetch = await import('node-fetch');
    try {
        const response = await fetch.default(pinataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_API_SECRET
            },
            body: JSON.stringify({
                pinataContent: data
            })
        });

        if (!response.ok) {
            throw new Error('Failed to store data on IPFS');
        }

        const result = await response.json();
        return result.IpfsHash;
    } catch (error) {
        console.error('Error storing data in IPFS:', error);
        throw error;
    }
}

const patientData = { name: 'Devansh', age: 25 };

/**
 * Main function to store data on IPFS and handle the result.
 */
async function main() {
    try {
        const ipfsHash = await storeDataIPFS(patientData);
        console.log('IPFS Hash:', ipfsHash);
        // Save the IPFS hash to use in the blockchain storage step
        // Here you would call the function to store the IPFS hash on the blockchain
        // Example: await storeIPFSHashOnBlockchain(ipfsHash);
    } catch (error) {
        console.error('Error in storing IPFS hash:', error);
    }
}

// Execute the main function
main();
