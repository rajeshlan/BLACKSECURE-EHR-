import { ethers } from 'ethers';
import dotenv from 'dotenv';
import contractABI from './abis/ComprehensivePatientData.json'; // Adjust the path


// Load environment variables
dotenv.config();

const {
    REACT_APP_API_KEY: API_KEY,
    REACT_APP_PRIVATE_KEY: PRIVATE_KEY,
    REACT_APP_CONTRACT_ADDRESS: CONTRACT_ADDRESS
} = process.env;

// Validate required environment variables
if (!API_KEY || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Missing required environment variables.');
}

// Connect to the Ethereum network using Alchemy as a provider
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Function to create the contract instance using the imported ABI
function getContractInstance() {
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
}

/**
 * Transfers data to a specified receiver.
 * @param {string} receiver - The address of the receiver.
 * @param {string} payload - The data payload to transfer.
 */
async function transferData(receiver, payload) {
    try {
        const contract = getContractInstance();
        const tx = await contract.transferData(receiver, payload);
        await tx.wait();
        console.log('Data transferred successfully.');
    } catch (error) {
        console.error('Error transferring data:', error);
        throw error;
    }
}

/**
 * Retrieves data sent from the sender to the receiver.
 * @param {string} sender - The address of the sender.
 * @param {string} receiver - The address of the receiver.
 */
async function getData(sender, receiver) {
    try {
        const contract = getContractInstance();
        const data = await contract.getData(sender, receiver);
        console.log('Data:', ethers.utils.parseBytes32String(data));
        return ethers.utils.parseBytes32String(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}

// Export the functions for use in other parts of your application
export { transferData, getData };
