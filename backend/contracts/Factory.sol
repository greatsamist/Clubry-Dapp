// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

// import our child contract
import "./Clubry.sol";
import "./Clone.sol";

contract Factory is CloneFactory {
    // stores an array of all child contract
    Club[] public ClubArray;

    address public masterContract;

    constructor(address _masterContract) {
        masterContract = _masterContract;
    }

    function createClub() external {
        Club club = Club(createClone(masterContract));
        ClubArray.push(club);
    }

    function getChildren() external view returns (Club[] memory) {
        return ClubArray;
    }

    function gfSetClub(
        uint256 _ClubArray,
        uint128 numberOfPeople,
        uint128 perPeople
    ) public {
        Club(address(ClubArray[_ClubArray])).createClub(
            numberOfPeople,
            perPeople
        );
    }
}
