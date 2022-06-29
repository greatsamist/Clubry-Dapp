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
    event SellPublished(string success);
    event YouAdded(address A, string Added);
    error maxParticipantsReached();


    struct Club {
    address depositToken;
    uint256 depositEndDate;
    uint256 maxMember;
    uint256 depositLimit;
    uint256 minPercent;
    address treasureAddress;
    address[] addedAddress;
    }

     /// An individual info
    struct IndividualInfo {
        address _individualDetails;
        uint256 balances;
    }

     struct PendingUserVotes {
        uint256 totalVotes;
    }

    enum VoteResult {
        Yes,
        No
    }

    uint256 public clubBalances;


   

    constructor(
        string memory _clubName,
        string memory _clubSymbol,
        // address _depositToken,
        // uint256 _depositEndDate,
        // uint256 _depositLimit,
        // uint256 _maxMembers,
        // address _treasureAddress,
        address _contractOwner
    ) ERC20(_clubName, _clubSymbol) {
        // depositToken = _depositToken;
        // depositEndDate = _depositEndDate;
        // depositLimit = _depositLimit;
        // maxMembers = _maxMembers;
        // treasureAddress = _treasureAddress;
        transferOwnership(_contractOwner);
    }

    mapping(address => Club) public clubInfo;
    mapping(address => IndividualInfo) public loneInfo;
    mapping(address => mapping(address => PendingUserVotes)) pendingUserVotes;

    modifier canAddDeposit() {
        Club storage C = clubInfo[msg.sender];
        require( C.depositEndDate > block.timestamp, "deposit ended");
        _;
    }

    function addDeposit(uint256 _depositAmount) public payable canAddDeposit {
        Club storage C = clubInfo[msg.sender];
        IndividualInfo storage mine = loneInfo[msg.sender];
        
        if (C.depositToken == address(0)) {
            require(C.depositLimit >= msg.value, "deposit amount error");
            clubBalances = clubBalances + _depositAmount;
            payable(C.treasureAddress).transfer(msg.value);
            _mint(msg.sender, msg.value);
            emit NewDeposit(msg.sender, msg.value, address(0));
        } else {
            require(C.depositLimit >= _depositAmount, "deposit amount error");
            clubBalances = clubBalances + _depositAmount;
            IERC20 token = IERC20(C.depositToken);
            token.transferFrom(msg.sender, C.treasureAddress, _depositAmount);
            _mint(msg.sender, _depositAmount);
            emit NewDeposit(msg.sender, _depositAmount, C.depositToken);
        }

            if(mine._individualDetails == msg.sender){
                mine.balances = mine.balances + _depositAmount;
            }
            else{
            mine._individualDetails = msg.sender;
            mine.balances = mine.balances + _depositAmount;
            }

    }

    function joinClub(address intendingAddress) external {
        intendingAddress = msg.sender;
        Club storage C = clubInfo[msg.sender];
        if (C.addedAddress.length > C.maxMember)
            revert maxParticipantsReached();
        C.addedAddress.push(intendingAddress);
    }

     function percentageStake(address loneAddress)
        public
        view
        returns (uint256)
    {
        IndividualInfo storage mine = loneInfo[loneAddress];
        uint256 stakerPercent = (mine.balances * 100) / clubBalances;
        return stakerPercent;
    }


    function sellStake(address _loneAddress, uint256 amount) external {
        uint256 _stakerPercent = percentageStake(_loneAddress);
        require(_stakerPercent > 0, "You have no stake.");
        require(amount <= _stakerPercent, "Reduce the amount.");
        emit SellPublished("Your sale have been published");
    }

    function buyStake(address _loneAddress, uint256 amount) external{
        
    }

    function voteLogic(
        address _address,
        uint256 amountOfAddedAddress,
        uint256 pcent,
        address _indicatingAddress
    ) private {
        Club storage C = clubInfo[_address];
        if ((amountOfAddedAddress * 100) / amountOfAddedAddress >= pcent) {
            C.addedAddress.push(_indicatingAddress);
        }
    }

    function clubVote(
        VoteResult _vote,
        address _clubAddress,
        address _pendingAddress
    ) public {
        Club storage C = clubInfo[_clubAddress];
        uint256 amountOfAddedAddress = C.addedAddress.length;
        uint256 percentOwnerCreated = C.minPercent;
        if (amountOfAddedAddress > C.maxMember)
            revert maxParticipantsReached();
        PendingUserVotes storage i_ = pendingUserVotes[_clubAddress][
            _pendingAddress
        ];
        if (_vote == VoteResult.Yes) {
            if (
                (i_.totalVotes * 100) / amountOfAddedAddress >=
                percentOwnerCreated
            ) {
                C.addedAddress.push(_pendingAddress);
                emit YouAdded(_pendingAddress, "Added");
            } else {
                i_.totalVotes++;
                emit YouAdded(_pendingAddress, "Not Added");
            }
        } else {}
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
        Club storage C = clubInfo[msg.sender];
        C.depositLimit = _depositLimit;
    }

    function setDepositEnDate(uint256 _depositEndDate) public onlyOwner {
        Club storage C = clubInfo[msg.sender];
        C.depositEndDate = _depositEndDate;
    }
}
