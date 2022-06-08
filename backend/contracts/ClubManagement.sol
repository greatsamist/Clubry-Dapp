// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.8;

/// @title A simulator for trees
/// @author Brennan, Eric, Ephraim, GreatSam
/// @notice This contract aids in the creation of clubs and its governance
/// @dev Functins helps in the moderation of the clubs activities

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClubManagement is ERC20, Ownable {
    event NewDeposit(address user, uint256 quantity, address token);
    event NewMint(address user, uint256 quantity);
    event NewBurn(address user, uint256 quantity);

    address public depositToken;
    uint256 public depositEndDate;
    uint256 public maxMember;
    uint256 public depositLimit;
    uint256 public maxMembers;
    address public treasureAddress;

    constructor(
        string memory _clubName,
        string memory _clubSymbol,
        address _depositToken,
        uint256 _depositEndDate,
        uint256 _depositLimit,
        uint256 _maxMembers,
        address _treasureAddress,
        address _contractOwner
    ) ERC20(_clubName, _clubSymbol) {
        depositToken = _depositToken;
        depositEndDate = _depositEndDate;
        depositLimit = _depositLimit;
        maxMembers = _maxMembers;
        treasureAddress = _treasureAddress;
        transferOwnership(_contractOwner);
    }

    modifier canAddDeposit() {
        require(depositEndDate > block.timestamp, "deposit ended");
        _;
    }

    function addDeposit(uint256 _depositAmount) public payable canAddDeposit {
        if (depositToken == address(0)) {
            require(depositLimit >= msg.value, "deposit amount error");
            payable(treasureAddress).transfer(msg.value);
            _mint(msg.sender, msg.value);
            emit NewDeposit(msg.sender, msg.value, address(0));
        } else {
            require(depositLimit >= _depositAmount, "deposit amount error");
            IERC20 token = IERC20(depositToken);
            token.transferFrom(msg.sender, treasureAddress, _depositAmount);
            _mint(msg.sender, _depositAmount);
            emit NewDeposit(msg.sender, _depositAmount, depositToken);
        }
    }

    function mintTokenTo(address _toWallet, uint256 _quantity)
        public
        onlyOwner
    {
        _mint(_toWallet, _quantity);
        emit NewMint(_toWallet, _quantity);
    }

    function burnTokenTo(address _toWallet, uint256 _quantity)
        public
        onlyOwner
    {
        _burn(_toWallet, _quantity);
        emit NewBurn(_toWallet, _quantity);
    }

    function setDepositLimit(uint256 _depositLimit) public onlyOwner {
        depositLimit = _depositLimit;
    }

    function setDepositEnDate(uint256 _depositEndDate) public onlyOwner {
        depositEndDate = _depositEndDate;
    }
}
