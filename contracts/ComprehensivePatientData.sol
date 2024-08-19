// contracts/ComprehensivePatientData.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./UserData.sol";
import "./IPFSData.sol";

contract ComprehensivePatientData is UserData, IPFSData {
    // Mapping from patient address to doctor address
    mapping(address => address) private patientToDoctor;

    event PatientAssigned(address indexed patient, address indexed doctor);
    event PatientTransferred(address indexed patient, address indexed oldDoctor, address indexed newDoctor);

    constructor(address initialOwner) UserData(initialOwner) {}

    // Register a new patient and assign them to a doctor
    function registerPatient(
        address patientAddress,
        address doctorAddress,
        string memory _name,
        string memory _phoneNumber,
        string memory _ssn,
        uint256 _age
    ) public onlyOwner {
        require(patientToDoctor[patientAddress] == address(0), "Patient is already registered.");
        super.registerUser(patientAddress, _name, _phoneNumber, _ssn, _age);
        patientToDoctor[patientAddress] = doctorAddress;
        emit PatientAssigned(patientAddress, doctorAddress);
    }

    // Transfer patient to a new doctor
    function transferPatient(address patientAddress, address newDoctorAddress) public {
        address currentDoctor = patientToDoctor[patientAddress];
        require(currentDoctor == msg.sender || msg.sender == owner(), "Only the current doctor or owner can transfer this patient.");
        require(newDoctorAddress != address(0), "New doctor address cannot be zero.");

        patientToDoctor[patientAddress] = newDoctorAddress;
        emit PatientTransferred(patientAddress, currentDoctor, newDoctorAddress);
    }

    // Get patient details (only accessible by the assigned doctor or owner)
    function getPatientDetails(address patientAddress) public view returns (string memory name, string memory phoneNumber, string memory ssn, uint256 age) {
        require(msg.sender == patientToDoctor[patientAddress] || msg.sender == owner(), "Access denied.");
        return super.getUserInfo(patientAddress);
    }

    // Set IPFS hash for patient data (only accessible by the assigned doctor or owner)
    function setPatientData(address patientAddress, string memory ipfsHash) public {
        require(msg.sender == patientToDoctor[patientAddress] || msg.sender == owner(), "Access denied.");
        super.setIPFSHash(patientAddress, ipfsHash);
    }

    // Get IPFS hash for patient data (only accessible by the assigned doctor or owner)
    function getPatientData(address patientAddress) public view returns (string memory) {
        require(msg.sender == patientToDoctor[patientAddress] || msg.sender == owner(), "Access denied.");
        return super.getIPFSHash(patientAddress);
    }

    // Optional: Implement the transferData function if needed
    function transferData(address receiver, string memory data) public onlyOwner {
        setIPFSHash(receiver, data);  // Example logic to set IPFS hash for the receiver
    }
}
