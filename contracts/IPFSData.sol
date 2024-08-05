// contracts/IPFSData.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IPFSData {
    mapping(address => string) private ipfsHashes;

    event IPFSHashSet(address indexed userAddress, string hash);

    function setIPFSHash(address userAddress, string memory hash) public virtual {
        ipfsHashes[userAddress] = hash;
        emit IPFSHashSet(userAddress, hash);
    }

    function getIPFSHash(address userAddress) public view virtual returns (string memory) {
        return ipfsHashes[userAddress];
    }
}
