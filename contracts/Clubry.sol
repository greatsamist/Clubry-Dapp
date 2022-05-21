// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

contract Club {

    struct SpecificClub {

        address creatorAddress;
        uint128 maxNumber;
        uint128 minPercent;
        address[] addedAddress;
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

    mapping(address => SpecificClub) public aNewClub;
    mapping(uint => SpecificClub) public clubry;
    mapping(address => IndividualInfo) public loneInfo;

    event YouAdded(address justAdded, string addedOrNot);
    event SellPublished(string result);


    function createClub (address ownerAddress, uint128 numberOfPeople, uint128 perPeople) public {
        ownerAddress = msg.sender;
        SpecificClub storage club = aNewClub[msg.sender];
        club.creatorAddress = msg.sender;
        club.maxNumber = numberOfPeople;
        club.minPercent = perPeople;
        club.addedAddress.push(msg.sender);
        index++;
    }

    function joinClub (address intendingAddress) public view {
        intendingAddress = msg.sender;
    }

    function clubVote (VoteResult _Vote, address clubCreator, address indicatingAddress) public {
        SpecificClub storage club = aNewClub[clubCreator];
        address toVote = msg.sender;
        address clubAdd = club.creatorAddress;
        uint _amountOfAddedAddress = club.addedAddress.length;
        uint percentOwnerCreated = club.minPercent;
        for (uint i; i < club.addedAddress.length; i++){
            if(club.addedAddress[i] == toVote){
                if(_Vote == VoteResult.Yes){
                    emit YouAdded(indicatingAddress, "Added");
                    voteLogic(clubAdd, _amountOfAddedAddress, percentOwnerCreated,indicatingAddress);
                }
                else{
                    emit YouAdded(indicatingAddress, "Not Added");
                    revert("");
                }
            }

            else{
                revert("You cant vote");
            }
            
        }
    }

    function voteLogic(address _address, uint amountOfAddedAddress, uint pcent, address _indicatingAddress) private {
        SpecificClub storage club = aNewClub[_address];
        if ((amountOfAddedAddress * 100)/amountOfAddedAddress >= pcent){
            club.addedAddress.push(_indicatingAddress);
        }
    }

    function changeParameters(uint128 _maxnumber, uint128 _minPercent) public {
        address clubCreate = msg.sender;
        SpecificClub storage club = aNewClub[clubCreate];
        require(club.creatorAddress == msg.sender, "you can't call this function");
        club.maxNumber = _maxnumber;
        club.minPercent = _minPercent;
    }


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