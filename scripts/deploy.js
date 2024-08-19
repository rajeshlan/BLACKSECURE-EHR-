import hardhat from 'hardhat';
import fs from 'fs';
import dotenv from 'dotenv';

const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy UserData contract
  const UserData = await ethers.getContractFactory("UserData");
  const userData = await UserData.deploy(deployer.address); // Passing deployer's address as the initial owner
  await userData.deployed();
  console.log("UserData deployed to:", userData.address);

  // Deploy IPFSData contract
  const IPFSData = await ethers.getContractFactory("IPFSData");
  const ipfsData = await IPFSData.deploy();
  await ipfsData.deployed();
  console.log("IPFSData deployed to:", ipfsData.address);

  // Deploy ComprehensivePatientData contract
  let comprehensivePatientData;
  try {
    const ComprehensivePatientData = await ethers.getContractFactory("ComprehensivePatientData");
    comprehensivePatientData = await ComprehensivePatientData.deploy(deployer.address); // Passing deployer's address as the initial owner
    await comprehensivePatientData.deployed();
    console.log("ComprehensivePatientData deployed to:", comprehensivePatientData.address);
  } catch (error) {
    console.error("Error deploying ComprehensivePatientData contract:", error.message);
    process.exit(1);
  }

  // Load existing .env file
  dotenv.config();

  // Read the existing .env file
  const envFilePath = '.env';
  let envContent = fs.readFileSync(envFilePath, 'utf8');

  // Update the contract addresses in the envConfig object, ensuring all values are enclosed in quotes
  const envConfig = dotenv.parse(envContent);

  // Assign the latest addresses
  const updatedConfig = {
    ...envConfig,
    CONTRACT_ADDRESS: comprehensivePatientData.address,
    USER_DATA_ADDRESS: userData.address,
    IPFS_DATA_ADDRESS: ipfsData.address,
    REACT_APP_CONTRACT_ADDRESS: comprehensivePatientData.address,  // Ensure React uses the correct address
  };

  // Rebuild the .env file content with all values enclosed in quotes, preserving comments and formatting
  const updatedEnvContent = envContent
    .split('\n')
    .map(line => {
      // Ignore comments or empty lines
      if (line.trim().startsWith('#') || line.trim() === '') {
        return line;
      }
      const [key, value] = line.split('=');
      const trimmedKey = key.trim();
      const trimmedValue = (value ? value.replace(/"/g, '').trim() : '');

      // If the key exists in updatedConfig, update it with the new value enclosed in quotes
      if (updatedConfig[trimmedKey]) {
        return `${trimmedKey}="${updatedConfig[trimmedKey]}"`;
      }
      // Otherwise, return the line with the value enclosed in quotes if it's not already
      return `${trimmedKey}="${trimmedValue}"`;
    })
    .join('\n');

  // Write the updated content back to the .env file
  fs.writeFileSync(envFilePath, updatedEnvContent, { flag: 'w' });

  console.log(".env file updated with new contract addresses.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
