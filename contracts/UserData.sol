// contracts/UserData.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract UserData is Ownable {
    struct User {
        string name;
        string phoneNumber;
        string ssn;
        uint256 age;
    }

    mapping(address => User) private users;

    event UserRegistered(address indexed userAddress, string name, string phoneNumber, uint256 age);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function registerUser(
        address userAddress,
        string memory _name,
        string memory _phoneNumber,
        string memory _ssn,
        uint256 _age
    ) public virtual onlyOwner {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_phoneNumber).length > 0, "Phone number is required");
        require(bytes(_ssn).length > 0, "SSN is required");
        require(_age > 0, "Age is required");

        users[userAddress] = User(_name, _phoneNumber, _ssn, _age);

        emit UserRegistered(userAddress, _name, _phoneNumber, _age);
    }

    function getUserInfo(address _userAddress) public view virtual returns (string memory, string memory, string memory, uint256) {
        User storage user = users[_userAddress];
        return (user.name, user.phoneNumber, user.ssn, user.age);
    }

    function getPublicUserInfo(address _userAddress) public view virtual returns (string memory, string memory, uint256) {
        User storage user = users[_userAddress];
        return (user.name, user.phoneNumber, user.age);
    }
}
