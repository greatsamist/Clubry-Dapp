// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.5;


/// @title A simulator for trees
/// @author Brennan, Eric, Ephraim, GreatSam
/// @notice This contract aids in the creation of clubs and its governance
/// @dev Functins helps in the moderation of the clubs activities
contract Club {

    /// Attributes of a club
    struct SpecificClub {
        uint128 maxNumber;
        uint128 minPercent;
        address[] addedAddress;
    }

    /// Votes still on pending
    struct PendingUserVotes {
        uint256 totalVotes;
    }

    /// The amount in a club
    uint256 public clubBalances;

    /// An individual info
    struct IndividualInfo{
        address _individualDetails;
        uint balances;
    }

    // Indicates the vote result
    enum VoteResult {
        Yes,
        N0
    }

    /// The count on club creation
    uint public index = 0;

    /// Custom error
    error maxParticipantsReached();

    /// Mappings
    mapping(address => SpecificClub) public aNewClub;
    mapping(uint => SpecificClub) public clubry;
    mapping(address => IndividualInfo) public loneInfo;
    mapping(address=>mapping(address=>PendingUserVotes)) pendingUserVotes;

    // Events to emit a new participant of a club and when a stake is published for sale.
    event YouAdded(address justAdded, string addedOrNot);
    event SellPublished(string result);


    /// @notice Create a new club in the contract
    /// @dev Increase the number of clubs for prospective members
    /// @param numberOfPeople The maximum number of people for the club
    /// @param perPeople The minimum percentage estimated on a member
    function createClub (uint128 numberOfPeople, uint128 perPeople) public {
        SpecificClub storage club = aNewClub[msg.sender];
        club.maxNumber = numberOfPeople;
        club.minPercent = perPeople;
        club.addedAddress.push(payable(msg.sender));
        index++;
    }

    /// @notice Return the addresses in a club.
    /// @param _address The address that initializes the club creation
    /// @return c.addedAddress a collection of the whole addreses in a club
    function getClubProfile(address _address) public view returns(address[] memory){
        SpecificClub storage c = aNewClub[_address];
        return c.addedAddress;
    }


    /// @notice The club voting logic
    /// @param _vote An enum indicating votes
    /// @param _clubAddress The address that initializes the club creation
    /// @param _pendingAddress The pending address
    function clubVote(VoteResult _vote, address _clubAddress, address _pendingAddress) public {
        SpecificClub storage club = aNewClub[_clubAddress];
        uint256 amountOfAddedAddress = club.addedAddress.length;
        uint128 percentOwnerCreated = club.minPercent;
        if(amountOfAddedAddress > club.maxNumber) revert maxParticipantsReached();
        PendingUserVotes storage i_ = pendingUserVotes[_clubAddress][_pendingAddress];
        if(_vote == VoteResult.Yes){
            if((i_.totalVotes * 100)/amountOfAddedAddress >=percentOwnerCreated){
                club.addedAddress.push(_pendingAddress);
                emit YouAdded(_pendingAddress, "Added");
            }
            else{
                i_.totalVotes++;
                emit YouAdded(_pendingAddress, "Not Added");

            }
        }
        else{

        }
    }
    
    /// @notice Voting system handling
    /// @param _address The creator address that serves as indicator
    /// @param amountOfAddedAddress The number of addresses that
    /// @param pcent The percentage
    /// @param _indicatingAddress address showing interest
    function voteLogic(address _address, uint amountOfAddedAddress, uint pcent, address _indicatingAddress) private {
        SpecificClub storage club = aNewClub[_address];
        if ((amountOfAddedAddress * 100)/amountOfAddedAddress >= pcent){
            club.addedAddress.push(_indicatingAddress);
        }
    }

    /// @notice A person contribution into a club using the gnosis address
    /// @param gnosis The gnosis address
    /// @param _address The club creator address
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

    /// @notice The selling of stake by an individual
    /// @param _loneAddress The address selling a stake
    /// @param amount The amount intended to be sold
    function sellStake(address _loneAddress, uint amount) public{
        uint _stakerPercent = percentageStake(_loneAddress);
        require(_stakerPercent > 0, "You have no stake.");
        require(amount <= _stakerPercent, "Reduce the amount.");
        emit SellPublished("Your sale have been published/");
    }

    /// @notice The stake percentage
    /// @param loneAddress The address from which a stake is being made
    /// @return stakerPercent The percentage required from a single stake
    function percentageStake(address loneAddress) public view returns (uint) {
        IndividualInfo storage mine = loneInfo[loneAddress];
        uint stakerPercent = (mine.balances * 100)/ clubBalances;
        return stakerPercent;
    }


    function buyStake() public {}

    
    function joinClub (address intendingAddress, address clubAddress) public {
        intendingAddress = msg.sender;
        SpecificClub storage club = aNewClub[clubAddress];
        if(club.addedAddress.length > club.maxNumber) revert maxParticipantsReached(); 
        club.addedAddress.push(intendingAddress);
    }


    // function changeParameters(uint128 _maxnumber, uint128 _minPercent) public {
    //     address clubCreate = msg.sender;
    //     SpecificClub storage club = aNewClub[clubCreate];
    //     require(club.creatorAddress == msg.sender, "you can't call this function");
    //     club.maxNumber = _maxnumber;
    //     club.minPercent = _minPercent;
    // }

}