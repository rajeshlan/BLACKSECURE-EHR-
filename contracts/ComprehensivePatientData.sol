// contracts/ComprehensivePatientData.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./UserData.sol";
import "./IPFSData.sol";

contract ComprehensivePatientData is UserData, IPFSData {
    constructor(address initialOwner) UserData(initialOwner) {}

    function registerUser(
        address userAddress,
        string memory _name,
        string memory _phoneNumber,
        string memory _ssn,
        uint256 _age
    ) public override(UserData) onlyOwner {
        super.registerUser(userAddress, _name, _phoneNumber, _ssn, _age);
    }

    function setIPFSHash(address userAddress, string memory hash) public override(IPFSData) onlyOwner {
        super.setIPFSHash(userAddress, hash);
    }

    function getUserInfo(address userAddress) public view override(UserData) returns (string memory, string memory, string memory, uint256) {
        return super.getUserInfo(userAddress);
    }

    function getIPFSHash(address userAddress) public view override(IPFSData) returns (string memory) {
        return super.getIPFSHash(userAddress);
    }
}
