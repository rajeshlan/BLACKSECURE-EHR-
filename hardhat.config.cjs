require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

const { PRIVATE_KEY, PRIVATE_NETWORK_URL, ETHERSCAN_API_KEY } = process.env;

if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not defined in the .env file.');
}
if (PRIVATE_KEY.length !== 64) {
  throw new Error('Invalid private key length. Please check the PRIVATE_KEY in your .env file.');
}

module.exports = {
  defaultNetwork: "hardhat", // Set default network to hardhat
  networks: {
    hardhat: {
      accounts: {
        count: 10,
        accountsBalance: "1000000000000000000000000" // 1 million ETH
      },
    },
    private: {
      url: PRIVATE_NETWORK_URL || "http://127.0.0.1:8545",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts",
  },
};
