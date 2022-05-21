// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;

contract Club {

    struct SpecificClub {
        uint128 maxNumber;
        uint128 minPercent;
        address[] addedAddress;
    }

    struct PendingUserVotes {
        uint256 totalVotes;
    }

    uint256 public clubBalances;

    struct IndividualInfo{
        address _individualDetails;
        uint balances;
    }


    enum VoteResult {
        Yes,
        N0
    }

    uint public index = 0;

    error maxParticipantsReached();

    mapping(address => SpecificClub) public aNewClub;
    mapping(uint => SpecificClub) public clubry;
    mapping(address => IndividualInfo) public loneInfo;
    mapping(address=>mapping(address=>PendingUserVotes)) pendingUserVotes;

    event YouAdded(address justAdded, string addedOrNot);
    event SellPublished(string result);


    // function createClub (address ownerAddress, uint128 numberOfPeople, uint128 perPeople) public {
    //     ownerAddress = msg.sender;
    //     SpecificClub storage club = aNewClub[msg.sender];
    //     club.creatorAddress = msg.sender;
    //     club.maxNumber = numberOfPeople;
    //     club.minPercent = perPeople;
    //     club.addedAddress.push(msg.sender);
    //     index++;
    // }
    function createClub (uint128 numberOfPeople, uint128 perPeople) public {
        SpecificClub storage club = aNewClub[msg.sender];
        club.maxNumber = numberOfPeople;
        club.minPercent = perPeople;
        club.addedAddress.push(payable(msg.sender));
        index++;
    }

    // function joinClub (address intendingAddress, address clubAddress) public {
    //     intendingAddress = msg.sender;
    //     SpecificClub storage club = aNewClub[clubAddress];
    //     if(club.addedAddress.length > club.maxNumber) revert maxParticipantsReached(); 
    //     club.addedAddress.push(intendingAddress);
    // }

    function getClubProfile(address _address) public view returns(address[] memory){
        SpecificClub storage c = aNewClub[_address];
        return c.addedAddress;
    }

    function clubVote(VoteResult _vote, address _clubAddress, address _pendingAddress) public {
        SpecificClub storage club = aNewClub[_clubAddress];
        uint256 amountOfAddedAddress = club.addedAddress.length;
        uint128 percentOwnerCreated = club.minPercent;
        if(amountOfAddedAddress > club.maxNumber) revert maxParticipantsReached();
        PendingUserVotes storage i_ = pendingUserVotes[_clubAddress][_pendingAddress];
        if((i_.totalVotes * 100)/amountOfAddedAddress >=percentOwnerCreated){
            club.addedAddress.push(_pendingAddress);
            emit YouAdded(_pendingAddress, "Added");
        }
        else{
            i_.totalVotes++;
            emit YouAdded(_pendingAddress, "Not Added");

        }
    }
    

    // function clubVote (VoteResult _Vote, address clubCreator, address indicatingAddress) public {
    //     SpecificClub storage club = aNewClub[clubCreator];
    //     address toVote = msg.sender;
    //     //address clubAdd = club.creatorAddress;
    //     uint _amountOfAddedAddress = club.addedAddress.length;
    //     uint percentOwnerCreated = club.minPercent;
    //     for (uint i; i < club.addedAddress.length; i++){
    //         if(club.addedAddress[i] == toVote){
    //             if(_Vote == VoteResult.Yes){
    //                 emit YouAdded(indicatingAddress, "Added");
    //                 voteLogic(clubCreator, _amountOfAddedAddress, percentOwnerCreated,indicatingAddress);
    //             }
    //             else{
    //                 emit YouAdded(indicatingAddress, "Not Added");
    //                 revert("");
    //             }
    //         }

    //         else{
    //             revert("You cant vote");
    //         }
            
    //     }
    // }

    function voteLogic(address _address, uint amountOfAddedAddress, uint pcent, address _indicatingAddress) private {
        SpecificClub storage club = aNewClub[_address];
        if ((amountOfAddedAddress * 100)/amountOfAddedAddress >= pcent){
            club.addedAddress.push(_indicatingAddress);
        }
    }

    // function changeParameters(uint128 _maxnumber, uint128 _minPercent) public {
    //     address clubCreate = msg.sender;
    //     SpecificClub storage club = aNewClub[clubCreate];
    //     require(club.creatorAddress == msg.sender, "you can't call this function");
    //     club.maxNumber = _maxnumber;
    //     club.minPercent = _minPercent;
    // }


    function deposit(address gnosis, address _address) public payable{
        SpecificClub storage club = aNewClub[_address];
        address _loanaddress = msg.sender;
        for (uint i; i < club.addedAddress.length; i++){
            if(club.addedAddress[i] == msg.sender){
                IndividualInfo storage mine = loneInfo[_loanaddress];
                mine.balances+= msg.value;
                clubBalances+= msg.value;
                payable(gnosis).transfer(msg.value);
            }
            else{
                revert("");
            }
        }
        
    }

    function sellStake(address _loneAddress, uint amount) public{
        uint _stakerPercent = percentageStake(_loneAddress);
        require(_stakerPercent > 0, "you have no stake");
        require(amount <= _stakerPercent, "reduce the amount");
        emit SellPublished("your sale have been published");
    }

    function percentageStake(address loneAddress) public view returns (uint) {
        IndividualInfo storage mine = loneInfo[loneAddress];
        uint stakerPercent = (mine.balances * 100)/ clubBalances;
        return stakerPercent;
    }


    function buyStake() public {}

}