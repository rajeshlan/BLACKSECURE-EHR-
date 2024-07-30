const { ethers } = require('ethers');

const provider = new ethers.providers.InfuraProvider('sepolia', 'YourInfuraProjectID');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [{
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
  }];
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function getPatientData() {
    const data = await contract.getPatientData();
    console.log(`Name: ${data[0]}, Age: ${data[1]}`);
}

getPatientData();
