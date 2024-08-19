const { Alchemy, Network } = require('alchemy-sdk');
const dotenv = require('dotenv');
const { ethers } = require('ethers');
const { readFileSync } = require('fs');
const { resolve } = require('path');

// Load environment variables
dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

// Validate environment variables
if (!ALCHEMY_API_KEY || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Please set ALCHEMY_API_KEY, PRIVATE_KEY, and CONTRACT_ADDRESS in your .env file');
}

// Alchemy settings
const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA, // Specify the network as Sepolia
};

// Initialize Alchemy and Ethereum provider
const alchemy = new Alchemy(settings);
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

// Set up a wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Resolve the path to the compiled contract ABI
const contractABIPath = resolve(__dirname, '../artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json');

// Load the ABI from the JSON file
const contractABI = JSON.parse(readFileSync(contractABIPath, 'utf8')).abi;

// Initialize contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

/**
 * Stores an IPFS hash on the blockchain.
 * @param {string} ipfsHash - The IPFS hash to store on the blockchain.
 */
async function storeHashOnBlockchain(ipfsHash) {
    try {
        // Assuming the current wallet address is authorized to set the IPFS hash
        const tx = await contract.setIPFSHash(wallet.address, ipfsHash);
        await tx.wait();
        console.log(`IPFS Hash ${ipfsHash} stored on the blockchain with transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error('Error storing IPFS hash on blockchain:', error);
    }
}

async function main() {
    // Replace with the actual IPFS hash you want to store
    const ipfsHash = "QmU4DZ218fD1R47LeHpowc9oAvGmmZveDxJXGMcbj5SsTB";
    
    await storeHashOnBlockchain(ipfsHash);
}

// Execute the main function
main();
