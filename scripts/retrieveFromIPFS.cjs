const { ethers } = require('ethers');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Initialize Filebase S3 client
const s3 = new AWS.S3({
    endpoint: 'https://s3.filebase.com',
    accessKeyId: process.env.FILEBASE_ACCESS_KEY,
    secretAccessKey: process.env.FILEBASE_SECRET_KEY,
    region: 'us-east-1',
    s3ForcePathStyle: true // Use path style for S3 objects
});

// Ethereum provider and wallet setup using Alchemy
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

// Load Contract ABI
const contractABIPath = path.resolve(__dirname, '../artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath)).abi;

// Initialize contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Fetches data from Filebase using the provided IPFS hash.
 * @param {string} hash - The IPFS hash.
 * @returns {Object} - The retrieved data.
 */
async function getPatientDataFromFilebase(hash) {
    try {
        const params = {
            Bucket: process.env.FILEBASE_BUCKET_NAME,
            Key: hash
        };
        const data = await s3.getObject(params).promise();
        return JSON.parse(data.Body.toString());
    } catch (error) {
        console.error('Error retrieving data from Filebase:', error);
        throw error;
    }
}

/**
 * Retrieves and fetches patient data from Filebase using the hash stored on the Ethereum contract.
 */
async function retrieveAndFetchData() {
    try {
        const ipfsHash = await contract.getIPFSHash(wallet.address);
        const patientData = await getPatientDataFromFilebase(ipfsHash);
        console.log('Patient Data:', patientData);
    } catch (error) {
        console.error('Error in retrieving and fetching data:', error);
    }
}

// Execute the data retrieval
retrieveAndFetchData();
