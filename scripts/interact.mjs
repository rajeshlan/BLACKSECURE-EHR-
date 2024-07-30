import 'dotenv/config';
import { ethers } from "ethers";
import contractABI from '../artifacts/contracts/DataTransfer.sol/DataTransfer.json' assert { type: 'json' };

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

async function transferData(receiver, payload) {
    const tx = await contract.transferData(receiver, payload);
    await tx.wait();
}

async function getData(sender, receiver) {
    const data = await contract.getData(sender, receiver);
    console.log("Data:", ethers.utils.parseBytes32String(data));
}

async function main() {
    const receiver = "0x17B7d7618bA568E63F6875495c4e3360dE6DEEF8"; // Replace with actual receiver address
    const payload = ethers.utils.formatBytes32String("Sample data");

    console.log("Transferring data...");
    await transferData(receiver, payload);

    console.log("Data transferred.");

    console.log("Retrieving data...");
    await getData(signer.address, receiver);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});
