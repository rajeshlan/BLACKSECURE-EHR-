import { expect } from "chai";
import { solidity } from "ethereum-waffle";
import * as chai from "chai";
import pkg from 'hardhat'; // Default import for CommonJS module

const { ethers } = pkg;

chai.use(solidity);

describe("UserData", function () {
  this.timeout(60000); // Increase timeout to 60 seconds

  let UserData, userData, owner, addr1, addr2, addrs;

  beforeEach(async function () {
    console.log("Starting beforeEach hook...");

    // Get the ContractFactory and Signers here.
    UserData = await ethers.getContractFactory("UserData");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    console.log("Deploying contract...");

    // Deploy the contract with the owner address as the initial owner.
    userData = await UserData.deploy(owner.address);
    await userData.deployed();

    console.log("Contract deployed successfully.");
  });

  it("Should set the right owner", async function () {
    expect(await userData.owner()).to.equal(owner.address);
  });

  it("Should allow owner to set user data", async function () {
    await userData.registerUser(owner.address, "name", "1234567890", "ssn", 30);
    const [name, phoneNumber, ssn, age] = await userData.getUserInfo(owner.address);
    expect(name).to.equal("name");
    expect(phoneNumber).to.equal("1234567890");
    expect(ssn).to.equal("ssn");
    expect(age).to.equal(30);
  });

  it("Should not allow non-owner to set user data", async function () {
    await expect(userData.connect(addr1).registerUser(addr1.address, "name", "1234567890", "ssn", 30)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow owner to update user data", async function () {
    await userData.registerUser(owner.address, "Initial name", "1234567890", "ssn", 30);
    await userData.registerUser(owner.address, "Updated name", "0987654321", "new ssn", 35);
    const [name, phoneNumber, ssn, age] = await userData.getUserInfo(owner.address);
    expect(name).to.equal("Updated name");
    expect(phoneNumber).to.equal("0987654321");
    expect(ssn).to.equal("new ssn");
    expect(age).to.equal(35);
  });

  it("Should return empty data for non-existent user", async function () {
    const [name, phoneNumber, ssn, age] = await userData.getUserInfo(addr2.address);
    expect(name).to.equal("");
    expect(phoneNumber).to.equal("");
    expect(ssn).to.equal("");
    expect(age).to.equal(0);
  });

  it("Should handle multiple users' data correctly", async function () {
    await userData.registerUser(owner.address, "name1", "1111111111", "ssn1", 25);
    await userData.registerUser(addr1.address, "name2", "2222222222", "ssn2", 30);
    const [name1, phoneNumber1, ssn1, age1] = await userData.getUserInfo(owner.address);
    const [name2, phoneNumber2, ssn2, age2] = await userData.getUserInfo(addr1.address);
    expect(name1).to.equal("name1");
    expect(phoneNumber1).to.equal("1111111111");
    expect(ssn1).to.equal("ssn1");
    expect(age1).to.equal(25);
    expect(name2).to.equal("name2");
    expect(phoneNumber2).to.equal("2222222222");
    expect(ssn2).to.equal("ssn2");
    expect(age2).to.equal(30);
  });
});
