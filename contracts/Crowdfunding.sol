// SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Crowdfunding {

    struct Petitions {
        string name;
        uint256 amountNeeded;
        address payable recipient;
        uint256 favourCount;
        bool isFullfilled;
        mapping(address => bool) voteFavour;
    }
    uint256 public totalPetitions;
    address payable[] noOfFunders;
    mapping(uint256 => Petitions) public petition;
    mapping(address => uint256) public funders;
    uint256 public raisedAmount;
    uint256 public totalFundNeed;
    uint256 public timeDeadline;
    address payable public manager;

    constructor() {
        manager = payable(msg.sender);
        
    }
    
    modifier OnlyManager() {
        require(manager == msg.sender, "You are not an Manager");
        _;
    }

    function setFundTime(uint256 _totalFundNeed, uint256 _timeDeadline)
        public
        OnlyManager
    {
        totalFundNeed = _totalFundNeed;
        timeDeadline = block.timestamp + _timeDeadline;
    }

    function setPetition(string memory _name,uint256 _amountNeeded,address _recipient) public OnlyManager {
        Petitions storage _petition = petition[totalPetitions];
        _petition.name = _name;
        _petition.amountNeeded = _amountNeeded;
        _petition.recipient = payable(_recipient);
        _petition.isFullfilled = false;
        totalPetitions++;
      //  console.log(_petition.name,_petition.amountNeeded, _petition.recipient,_petition.isFullfilled);
    }
 
    modifier isExist(uint256 index) {
        require(totalPetitions > index, "Don't have Petition of this ID");
        _;
    }

    function fundPetitions() public payable {
        require(block.timestamp < timeDeadline, "Deadline has been Passed");
        require( msg.value >= 0.01 ether,"Funding Amount Must be greater than 0.01 ether");
        if (funders[msg.sender] == 0) noOfFunders.push(payable(msg.sender));
        funders[msg.sender] += msg.value;
        raisedAmount+=msg.value;
    }

    function votePetition(uint256 index) public isExist(index) {
        require(funders[msg.sender]>0,"You are not a funder");
        Petitions storage _petition = petition[index]; 
        require(!_petition.voteFavour[msg.sender], "Already Voted");
        _petition.voteFavour[msg.sender] = true;
        _petition.favourCount++;
    }

    function payRecipient(uint256 index) public payable isExist(index) OnlyManager returns (string memory result)
    {
        Petitions storage _petition = petition[index];
        require(address(this).balance >= _petition.amountNeeded, "Not enough Fund");
        require( _petition.favourCount > (noOfFunders.length / 2),"Sorry,Request Not Fullfilled");
        require(!_petition.isFullfilled, "Already Paid");
        (bool success, ) = _petition.recipient.call{value: _petition.amountNeeded}(msg.data);
        if (success) {
        raisedAmount-=_petition.amountNeeded;
        _petition.isFullfilled = true;
        return "You have Paid";
        } else 
        return "Transaction Failed try after sometimes";
    }

    function refund() public payable {
        require(block.timestamp > timeDeadline && raisedAmount < totalFundNeed,"Deadline has not been Passed");
        require(funders[msg.sender] > 0, "You are not a Funder");
        payable(msg.sender).transfer(funders[msg.sender]);
    }
}
