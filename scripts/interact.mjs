import 'dotenv/config';
import { ethers } from 'ethers';

// Import the ABI for ComprehensivePatientData from the correct location
import contractABI from '../artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json' assert { type: 'json' };

// Load environment variables
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Set up the provider and signer
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Create a new contract instance with the correct ABI and address
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

async function checkBalance() {
    console.log("Checking account balance...");
    const balance = await signer.getBalance();
    console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);
    return balance;
}

async function registerUser(patientAddress, doctorAddress, name, phoneNumber, ssn, age) {
    try {
        console.log(`Registering patient at address ${patientAddress} with doctor ${doctorAddress}`);
        const tx = await contract.registerUser(patientAddress, name, phoneNumber, ssn, age);
        console.log(`Transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`Patient registered successfully and assigned to doctor: ${doctorAddress}`);
        // You may need to separately assign the doctor if that is required.
    } catch (error) {
        console.error('Error registering patient:', error.message);
    }
}

async function fetchUserInfo(patientAddress) {
    try {
        console.log(`Fetching data for patient at address ${patientAddress}`);
        const data = await contract.getUserInfo(patientAddress);
        console.log('Patient data fetched successfully:', data);
    } catch (error) {
        console.error('Error fetching patient data:', error.message);
    }
}

async function storeData(patientAddress, ipfsHash) {
    try {
        console.log(`Storing data for patient at address ${patientAddress} with IPFS hash: ${ipfsHash}`);
        const balance = await checkBalance();
        const estimatedGas = await contract.estimateGas.setIPFSHash(patientAddress, ipfsHash);
        const gasPrice = await provider.getGasPrice();
        const totalGasCost = estimatedGas.mul(gasPrice);

        if (balance.lt(totalGasCost)) {
            throw new Error('Insufficient funds for gas');
        }

        console.log(`Sending transaction to store data...`);
        const tx = await contract.setIPFSHash(patientAddress, ipfsHash, {
            gasLimit: estimatedGas,
            gasPrice: gasPrice,
        });
        console.log(`Transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log('Data stored on blockchain successfully');
    } catch (error) {
        console.error('Error storing data:', error.message);
    }
}

async function main() {
    const patientAddress = 'your patient wallet address';
    const doctorAddress = 'your doctor wallet address'; // Example doctor address
    const ipfsHash = 'QmExampleHash123'; // Example IPFS hash

    console.log('Starting script execution...');

    console.log('Registering patient...');
    await registerUser(patientAddress, doctorAddress, "John Doe", "1234567890", "SSN12345", 45);

    console.log('Fetching patient data...');
    await fetchUserInfo(patientAddress);

    console.log('Storing patient data...');
    await storeData(patientAddress, ipfsHash);

    console.log('Script execution completed.');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('Fatal Error:', error.message);
        process.exit(1);
    });
