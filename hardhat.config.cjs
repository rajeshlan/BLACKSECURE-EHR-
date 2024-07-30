require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

const { PRIVATE_KEY, PRIVATE_NETWORK_URL, ETHERSCAN_API_KEY } = process.env;

console.log("Private Key Length:", PRIVATE_KEY.length); // Debugging line
console.log("Private Key:", PRIVATE_KEY); // Debugging line

if (PRIVATE_KEY.length !== 64) {
  throw new Error('Invalid private key length. Please check the PRIVATE_KEY in your .env file.');
}

module.exports = {
  defaultNetwork: "private",
  networks: {
    hardhat: {
      accounts: {
        count: 10, // Ensure there are at least 10 signers available
      },
    },
    private: {
      url: PRIVATE_NETWORK_URL || "http://127.0.0.1:8545",
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
