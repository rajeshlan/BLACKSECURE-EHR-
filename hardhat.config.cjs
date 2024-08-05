// Import necessary Hardhat plugins
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

// Destructure environment variables from the .env file
const { PRIVATE_KEY, PRIVATE_NETWORK_URL, ETHERSCAN_API_KEY } = process.env;

// Check if the PRIVATE_KEY is defined and valid
if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not defined in the .env file.');
}
if (PRIVATE_KEY.length !== 64) {
  throw new Error('Invalid private key length. Please check the PRIVATE_KEY in your .env file.');
}

module.exports = {
  // Default network configuration
  defaultNetwork: "private",
  networks: {
    // Hardhat network configuration
    hardhat: {
      accounts: {
        count: 10,
        // Increase the balance of the accounts
        accountsBalance: "1000000000000000000000000" // 1 million ETH
      },
    },
    // Custom private network configuration
    private: {
      url: PRIVATE_NETWORK_URL || "http://127.0.0.1:8545",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  // Etherscan API key for contract verification
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  // Solidity compiler configuration
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // Path configuration for Hardhat
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
