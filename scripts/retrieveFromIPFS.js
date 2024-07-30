const { ethers } = require('ethers');
const { create } = require('ipfs-http-client');

// Initialize IPFS client
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// Ethereum provider and wallet setup
const provider = new ethers.providers.InfuraProvider('sepolia', 'YourInfuraProjectID');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

// Contract ABI
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "getIPFSHash",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      }
    ],
    "name": "transferData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Initialize contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Fetches data from IPFS using the provided hash.
 * @param {string} hash - The IPFS hash.
 * @returns {Object} - The retrieved data.
 */
async function getPatientDataFromIPFS(hash) {
  try {
    const data = await ipfs.cat(hash);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error('Error retrieving data from IPFS:', error);
    throw error;
  }
}

/**
 * Retrieves and fetches patient data from IPFS using the hash stored on the Ethereum contract.
 */
async function retrieveAndFetchData() {
  try {
    const ipfsHash = await contract.getIPFSHash();
    const patientData = await getPatientDataFromIPFS(ipfsHash);
    console.log('Patient Data:', patientData);
  } catch (error) {
    console.error('Error in retrieving and fetching data:', error);
  }
}

// Execute the data retrieval
retrieveAndFetchData();
