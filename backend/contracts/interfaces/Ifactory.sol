//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.8;

interface IFactory {
    event NewClub(
        address clubAddress,
        address owner,
        string clubName,
        string clubSymbol,
        address depositToken,
        uint256 depositEndDate,
        uint256 depositLimit,
        uint256 maxMembers,
        address treasureAddress
    );

    function createClub(
        address[] memory _gnosisowners,
        string memory _groupName,
        string memory _groupSymbol,
        address _depositToken,
        uint256 _depositEndDate,
        uint256 _depositLimit,
        uint256 _maxMembers
    ) external returns (address pool, address safe);
}
