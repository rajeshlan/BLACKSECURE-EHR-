// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PatientData is Ownable {
    struct Patient {
        string name;
        uint256 age;
    }

    mapping(address => Patient) private patients;

    event PatientDataSet(address indexed patientAddress, string name, uint256 age);

    constructor(address initialOwner) Ownable(initialOwner) {
        // Your contract code here
    }

    function setPatientData(address _patientAddress, string memory _name, uint256 _age) public onlyOwner {
        patients[_patientAddress] = Patient(_name, _age);
        emit PatientDataSet(_patientAddress, _name, _age);
    }

    function getPatientData(address _patientAddress) public view returns (string memory, uint256) {
        Patient memory patient = patients[_patientAddress];
        return (patient.name, patient.age);
    }
}
