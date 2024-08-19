import { expect } from "chai";
import { solidity } from "ethereum-waffle";
import * as chai from "chai";
import pkg from 'hardhat';

const { ethers } = pkg;

chai.use(solidity);

describe("ComprehensivePatientData", function () {
  this.timeout(60000); // Increase timeout to 60 seconds

  let ComprehensivePatientData, comprehensivePatientData, owner, doctor, patient, anotherDoctor, unauthorizedUser;

  beforeEach(async function () {
    [owner, doctor, patient, anotherDoctor, unauthorizedUser] = await ethers.getSigners();

    // Deploy ComprehensivePatientData contract
    ComprehensivePatientData = await ethers.getContractFactory("ComprehensivePatientData");
    comprehensivePatientData = await ComprehensivePatientData.deploy(owner.address);
    await comprehensivePatientData.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await comprehensivePatientData.owner()).to.equal(owner.address);
  });

  it("Should allow owner to register a patient and assign them to a doctor", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    const [name, phoneNumber, ssn, age] = await comprehensivePatientData.getPatientDetails(patient.address);
    expect(name).to.equal("John Doe");
    expect(phoneNumber).to.equal("1234567890");
    expect(ssn).to.equal("SSN12345");
    expect(age).to.equal(45);
  });

  it("Should not allow registering a patient who is already registered", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await expect(
      comprehensivePatientData.registerPatient(
        patient.address,
        doctor.address,
        "John Doe",
        "1234567890",
        "SSN12345",
        45
      )
    ).to.be.revertedWith("Patient is already registered.");
  });

  it("Should allow owner to update patient data", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await comprehensivePatientData.setPatientData(
      patient.address,
      "QmTestHash"
    );

    const ipfsHash = await comprehensivePatientData.getPatientData(patient.address);
    expect(ipfsHash).to.equal("QmTestHash");
  });

  it("Should only allow assigned doctor or owner to set and get IPFS data", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await comprehensivePatientData.setPatientData(patient.address, "QmTestHash");

    const ipfsHash = await comprehensivePatientData.getPatientData(patient.address);
    expect(ipfsHash).to.equal("QmTestHash");

    // Attempt to get or set data by a non-assigned doctor should fail
    await expect(
      comprehensivePatientData.connect(anotherDoctor).setPatientData(patient.address, "QmAnotherHash")
    ).to.be.revertedWith("Access denied.");

    await expect(
      comprehensivePatientData.connect(anotherDoctor).getPatientData(patient.address)
    ).to.be.revertedWith("Access denied.");
  });

  it("Should allow owner to transfer a patient to another doctor", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await comprehensivePatientData.transferPatient(patient.address, anotherDoctor.address);

    const [name, phoneNumber, ssn, age] = await comprehensivePatientData.connect(anotherDoctor).getPatientDetails(patient.address);
    expect(name).to.equal("John Doe");
    expect(phoneNumber).to.equal("1234567890");
    expect(ssn).to.equal("SSN12345");
    expect(age).to.equal(45);
  });

  it("Should revert transfer when an unauthorized user tries to transfer a patient", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await expect(
      comprehensivePatientData.connect(unauthorizedUser).transferPatient(patient.address, anotherDoctor.address)
    ).to.be.revertedWith("Only the current doctor or owner can transfer this patient.");
  });

  it("Should handle multiple patients' data correctly", async function () {
    const anotherPatient = anotherDoctor;  // Using anotherDoctor as another patient for simplicity

    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await comprehensivePatientData.registerPatient(
      anotherPatient.address,
      anotherDoctor.address,
      "Jane Doe",
      "0987654321",
      "SSN54321",
      50
    );

    const [name1] = await comprehensivePatientData.getPatientDetails(patient.address);
    const [name2] = await comprehensivePatientData.getPatientDetails(anotherPatient.address);

    expect(name1).to.equal("John Doe");
    expect(name2).to.equal("Jane Doe");
  });

  it("Should not allow transfer to an invalid doctor address", async function () {
    await comprehensivePatientData.registerPatient(
      patient.address,
      doctor.address,
      "John Doe",
      "1234567890",
      "SSN12345",
      45
    );

    await expect(
      comprehensivePatientData.transferPatient(patient.address, ethers.constants.AddressZero)
    ).to.be.revertedWith("New doctor address cannot be zero.");
  });
});
