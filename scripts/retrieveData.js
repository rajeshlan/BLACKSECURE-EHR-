import 'dotenv/config';
import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Use Alchemy as the Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

// Load the ABI from the JSON file
const contractABIPath = resolve(__dirname, '../artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json');
const contractABI = JSON.parse(readFileSync(contractABIPath, 'utf8')).abi;

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function getPatientData(userAddress) {
    try {
        const data = await contract.getUserInfo(userAddress);
        console.log(`Name: ${data[0]}, Phone Number: ${data[1]}, SSN: ${data[2]}, Age: ${data[3]}`);
    } catch (error) {
        console.error('Error retrieving patient data:', error);
    }
}

// Example usage with a dummy user address
const userAddress = '0x17B7d7618bA568E63F6875495c4e3360dE6DEEF8'; // Replace with actual user address
getPatientData(userAddress);
