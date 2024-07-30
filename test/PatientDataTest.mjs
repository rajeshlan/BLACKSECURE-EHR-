// test/PatientDataTest.mjs

import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

describe("PatientData", function () {
  let PatientData;
  let patientData;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    PatientData = await ethers.getContractFactory("PatientData");
    const signers = await ethers.getSigners();

    // Ensure we have enough signers
    if (signers.length < 3) {
      console.error("Signers available:", signers.length); // Log the number of signers available
      throw new Error("Not enough signers available");
    }

    [owner, addr1, addr2] = signers;

    console.log("Owner:", owner.address);
    console.log("Addr1:", addr1.address);
    console.log("Addr2:", addr2.address);

    patientData = await PatientData.deploy(owner.address);
    await patientData.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await patientData.owner()).to.equal(owner.address);
    });
  });

  describe("Data Management", function () {
    it("Should allow the owner to add patient data", async function () {
      const tx = await patientData.setPatientData(addr1.address, "Sample Name", 30);
      await tx.wait();
      const data = await patientData.getPatientData(addr1.address);
      expect(data[0]).to.equal("Sample Name");
      expect(data[1].toNumber()).to.equal(30);
    });

    it("Should not allow non-owners to add patient data", async function () {
      await expect(
        patientData.connect(addr1).setPatientData(addr2.address, "Sample Name", 30)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow the owner to update patient data", async function () {
      let tx = await patientData.setPatientData(addr1.address, "Sample Name", 30);
      await tx.wait();
      tx = await patientData.setPatientData(addr1.address, "Updated Name", 40);
      await tx.wait();
      const data = await patientData.getPatientData(addr1.address);
      expect(data[0]).to.equal("Updated Name");
      expect(data[1].toNumber()).to.equal(40);
    });
  });
});
