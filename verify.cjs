const fs = require('fs');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Deployed addresses from console output
const deployedAddresses = {
  UserData: "0x4Ac091B77aFEdFaCFbC7fc9414731050878002fA",
  IPFSData: "0x7aE4Be62de2c49Cad05EdA20eb7716f83290fFE8",
  ComprehensivePatientData: "0x5C8338CB569C5E79A9C91924Ce16A5039bc78f30"
};

// Addresses from .env file
const envAddresses = {
  UserData: process.env.USERDATA_CONTRACT_ADDRESS,
  IPFSData: process.env.IPFSDATA_CONTRACT_ADDRESS,
  ComprehensivePatientData: process.env.COMPREHENSIVE_PATIENT_DATA_CONTRACT_ADDRESS
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
