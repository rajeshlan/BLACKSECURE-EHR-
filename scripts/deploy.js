async function main() {
    const [deployer] = await ethers.getSigners();

    const PatientData = await ethers.getContractFactory("PatientData");
    const patientData = await PatientData.deploy(deployer.address);
    console.log("PatientData contract deployed to:", patientData.address);

    const PatientDataWithIPFS = await ethers.getContractFactory("PatientDataWithIPFS");
    const patientDataWithIPFS = await PatientDataWithIPFS.deploy(deployer.address);
    console.log("PatientDataWithIPFS contract deployed to:", patientDataWithIPFS.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});
