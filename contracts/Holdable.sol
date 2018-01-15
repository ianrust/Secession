pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ReentrancyGuard.sol';


/**
* @title Holdable
* @dev extension of Ownable that can be hold ether
*/

contract Holdable is Ownable, ReentrancyGuard {

  // events that track funding and withdrawal
  event Funded(address indexed funder, uint256 indexed amount);
  event Withdrawal(address indexed owner, uint256 indexed amount);

  // holds holdings given to this contract
  uint256 public holdings;

  /**
  * @dev Allows the owner to claim the holdings from the contract.
  *      Equivalent to melting it down if it were made of gold
  */
  function withdrawHoldings() public onlyOwner nonReentrant {
    owner.transfer(holdings);
    Withdrawal(owner, holdings);
    holdings = 0;
  }

  /**
  * @dev Anyone can back the contract
  *      (a good way for patrons or fans to encourage people to buy contract)
  */
  function () public payable {
    Funded(msg.sender, msg.value);
    holdings += msg.value;
  }

}
