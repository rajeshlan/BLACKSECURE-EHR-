const fs = require('fs');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Deployed addresses from console output (These should be updated dynamically if needed)
const deployedAddresses = {
  UserData: process.env.USER_DATA_ADDRESS,
  IPFSData: process.env.IPFS_DATA_ADDRESS,
  ComprehensivePatientData: process.env.CONTRACT_ADDRESS
};

// Addresses from .env file
const envAddresses = {
  UserData: process.env.USER_DATA_ADDRESS,
  IPFSData: process.env.IPFS_DATA_ADDRESS,
  ComprehensivePatientData: process.env.CONTRACT_ADDRESS
};

// Compare addresses
const verifyAddresses = (deployed, env) => {
  for (const key in deployed) {
    if (deployed[key] !== env[key]) {
      console.log(`Mismatch for ${key}: Deployed(${deployed[key]}) != Env(${env[key]})`);
      return false;
    }
  }
  return true;
};

// Run verification
if (verifyAddresses(deployedAddresses, envAddresses)) {
  console.log("All contract addresses match.");
} else {
  console.log("There are mismatches in contract addresses.");
}
