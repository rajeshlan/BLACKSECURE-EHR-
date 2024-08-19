const { ethers } = require('ethers');
const dotenv = require('dotenv');
const AWS = require('aws-sdk');
const path = require('path');

// Load environment variables
dotenv.config();
console.log('Environment variables:', process.env);

// Fallback to .env file in the parent directory if not found in the current directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Destructure environment variables from process.env
const {
    ALCHEMY_API_KEY,
    PRIVATE_KEY,
    CONTRACT_ADDRESS,
    FILEBASE_ACCESS_KEY,
    FILEBASE_SECRET_KEY,
    FILEBASE_BUCKET_NAME
} = process.env;

// Debugging: Print environment variables again after fallback
console.log({
    ALCHEMY_API_KEY,
    PRIVATE_KEY,
    CONTRACT_ADDRESS,
    FILEBASE_ACCESS_KEY,
    FILEBASE_SECRET_KEY,
    FILEBASE_BUCKET_NAME
});

// Validate environment variables
if (!ALCHEMY_API_KEY || !FILEBASE_ACCESS_KEY || !FILEBASE_SECRET_KEY || !PRIVATE_KEY || !CONTRACT_ADDRESS || !FILEBASE_BUCKET_NAME) {
    throw new Error('Please set all required environment variables in your .env file');
}

// Ethereum provider and wallet setup using Alchemy
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Configure AWS SDK for Filebase
const s3 = new AWS.S3({
    endpoint: 'https://s3.filebase.com',
    accessKeyId: FILEBASE_ACCESS_KEY,
    secretAccessKey: FILEBASE_SECRET_KEY,
    region: 'us-east-1',
    s3ForcePathStyle: true // Use path style for S3 objects
});

/**
 * Stores data on IPFS via Filebase and returns the IPFS hash.
 * @param {Object} data - The data to be stored on IPFS.
 * @returns {Promise<string>} - The IPFS hash of the stored data.
 */
async function storeDataIPFS(data) {
    try {
        const fileKey = `patient_data_${Date.now()}.json`;
        const params = {
            Bucket: FILEBASE_BUCKET_NAME,
            Key: fileKey,
            Body: JSON.stringify(data),
            ContentType: 'application/json',
            Metadata: {
                'x-amz-meta-iptfs-path': '/'
            }
        };

        const result = await s3.upload(params).promise();
        return result.Location.split('/').pop(); // Return the IPFS hash part of the location
    } catch (error) {
        console.error('Error storing data on IPFS with Filebase:', error);
        throw error;
    }
}

/**
 * Stores the IPFS hash on the blockchain.
 * @param {string} ipfsHash - The IPFS hash to store on the blockchain.
 */
async function storeIPFSHashOnBlockchain(ipfsHash) {
    try {
        const contractABI = require('../artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json').abi;
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

        const tx = await contract.setIPFSHash(wallet.address, ipfsHash, {
            gasLimit: ethers.utils.hexlify(300000) // Adjust gas limit as necessary
        });
        await tx.wait();
        console.log('IPFS hash stored on blockchain:', ipfsHash);
    } catch (error) {
        console.error('Error storing IPFS hash on the blockchain:', error);
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
        await storeIPFSHashOnBlockchain(ipfsHash);
    } catch (error) {
        console.error('Error in storing IPFS hash:', error);
    }
}

// Execute the main function
main();
