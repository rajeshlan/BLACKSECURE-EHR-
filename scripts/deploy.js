import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy UserData contract
  const UserData = await ethers.getContractFactory("UserData");
  const userData = await UserData.deploy(deployer.address); // Pass the deployer's address as initial owner
  await userData.deployed();
  console.log("UserData deployed to:", userData.address);

  // Deploy IPFSData contract
  const IPFSData = await ethers.getContractFactory("IPFSData");
  const ipfsData = await IPFSData.deploy();
  await ipfsData.deployed();
  console.log("IPFSData deployed to:", ipfsData.address);

  // Deploy ComprehensivePatientData contract
  try {
    const ComprehensivePatientData = await ethers.getContractFactory("ComprehensivePatientData");
    const comprehensivePatientData = await ComprehensivePatientData.deploy(deployer.address); // Pass the deployer's address as initial owner
    await comprehensivePatientData.deployed();
    console.log("ComprehensivePatientData deployed to:", comprehensivePatientData.address);
  } catch (error) {
    console.error("Error deploying ComprehensivePatientData contract:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
