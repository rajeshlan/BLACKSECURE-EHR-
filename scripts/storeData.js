// Load environment variables
import 'dotenv/config';
import { ethers } from 'ethers';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const contractABI = require('../artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json');

// Validate environment variables
const {
    API_KEY,
    PRIVATE_KEY,
    CONTRACT_ADDRESS
} = process.env;

// Log the environment variables for debugging
console.log("API_KEY:", API_KEY);
console.log("PRIVATE_KEY:", PRIVATE_KEY);
console.log("CONTRACT_ADDRESS:", CONTRACT_ADDRESS);

if (!API_KEY || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Please set API_KEY, PRIVATE_KEY, and CONTRACT_ADDRESS in your .env file');
}

// Use a generic Ethereum provider (e.g., Alchemy)
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Test network connection
async function testNetworkConnection() {
    try {
        const network = await provider.getNetwork();
        console.log("Network connected:", network);
    } catch (error) {
        console.error("Network connection failed:", error);
        throw error;
    }
}

// Initialize contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, wallet);

async function storeIPFSHash(receiver, payload) {
    try {
        await testNetworkConnection();  // Test network connection

        // Check balance before proceeding
        const balance = await wallet.getBalance();
        const estimatedGas = await contract.estimateGas.setIPFSHash(receiver, payload);  // Use setIPFSHash method
        
        const increasedGasPrice = await provider.getGasPrice().then(price => price.mul(2));
        const totalGasCost = estimatedGas.mul(increasedGasPrice);

        console.log(`Estimated Gas: ${estimatedGas.toString()}`);
        console.log(`Increased Gas Price: ${increasedGasPrice.toString()}`);
        console.log(`Total Gas Cost: ${ethers.utils.formatEther(totalGasCost)} ETH`);

        if (balance.lt(totalGasCost)) {
            throw new Error('Insufficient funds for gas');
        }

        const adjustedGasLimit = estimatedGas.mul(150).div(100);

        // Send transaction with the correct function name
        const tx = await contract.setIPFSHash(receiver, payload, {  // Call setIPFSHash with the receiver and data
            gasLimit: adjustedGasLimit,
            gasPrice: increasedGasPrice
        });
        await tx.wait();
        console.log('Data stored on blockchain');
    } catch (error) {
        console.error('Error storing data:', error);
    }
}

// Example usage with dummy data
const receiverAddress = '0x17B7d7618bA568E63F6875495c4e3360dE6DEEF8';  // Replace with actual receiver address
const payloadData = 'Example payload data';  // Use a string directly

storeIPFSHash(receiverAddress, payloadData);  // Store the data on blockchain
