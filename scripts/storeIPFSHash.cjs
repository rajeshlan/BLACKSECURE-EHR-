const { Alchemy, Network } = require('alchemy-sdk');
const dotenv = require('dotenv');
const { ethers } = require('ethers');

// Load environment variables
dotenv.config();

const { ALCHEMY_API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS, PRIVATE_NETWORK_URL } = process.env;

const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);
const provider = new ethers.providers.JsonRpcProvider(PRIVATE_NETWORK_URL);

// Set up a wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ABI of the contract (replace with your contract's ABI and ensure it includes storeIPFSHash)
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
        "name": "getData",
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
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "storeIPFSHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

async function storeHashOnBlockchain(ipfsHash) {
    try {
        const tx = await contract.storeIPFSHash(ipfsHash);
        await tx.wait();
        console.log(`IPFS Hash ${ipfsHash} stored on the blockchain with transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error('Error storing IPFS hash on blockchain:', error);
    }
}

async function main() {
    const ipfsHash = "QmU4DZ218fD1R47LeHpowc9oAvGmmZveDxJXGMcbj5SsTB"; // Replace with the actual IPFS hash you want to store
    await storeHashOnBlockchain(ipfsHash);
}

// Execute the main function
main();
