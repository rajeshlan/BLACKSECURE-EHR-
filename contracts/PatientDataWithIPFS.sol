// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PatientDataWithIPFS is Ownable {
    mapping(address => string) private ipfsHashes;

    event IPFSHashSet(address indexed patientAddress, string ipfsHash);

    constructor(address initialOwner) Ownable(initialOwner) {
        // Your contract code here
    }

    function setIPFSHash(address _patientAddress, string memory _hash) public onlyOwner {
        ipfsHashes[_patientAddress] = _hash;
        emit IPFSHashSet(_patientAddress, _hash);
    }

    function getIPFSHash(address _patientAddress) public view returns (string memory) {
        return ipfsHashes[_patientAddress];
    }
}
