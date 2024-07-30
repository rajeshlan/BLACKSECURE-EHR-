import { JsonRpcProvider, Wallet, Contract, utils } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

// Check for missing environment variables
if (!API_KEY || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Missing required environment variables.');
}

// Connect to the Ethereum network
const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);
const signer = new Wallet(PRIVATE_KEY, provider);

// Create contract instance
const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

/**
 * Transfers data to a specified receiver.
 * @param {string} receiver - The address of the receiver.
 * @param {string} payload - The data payload to transfer.
 */
async function transferData(receiver, payload) {
    try {
        const tx = await contract.transferData(receiver, payload);
        await tx.wait();
        console.log('Data transferred successfully.');
    } catch (error) {
        console.error('Error transferring data:', error);
    }
}

/**
 * Retrieves data sent from the sender to the receiver.
 * @param {string} sender - The address of the sender.
 * @param {string} receiver - The address of the receiver.
 */
async function getData(sender, receiver) {
    try {
        const data = await contract.getData(sender, receiver);
        console.log('Data:', utils.parseBytes32String(data));
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

export { transferData, getData };
