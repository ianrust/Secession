pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ReentrancyGuard.sol';


/**
* @title Listable
* @dev extension of Ownable that is sellable via a simple list API.
*/
contract Listable is Ownable, ReentrancyGuard {

  // event that is emitted whenever a sale happens
  event Sale(address indexed previousOwner, address indexed newOwner, uint256 indexed price);

  /**
  * @dev Throws if called by any account other than the buyer
  */
  modifier onlyBuyer() {
    require(msg.sender == buyer);
    _;
  }

  uint256 public salePrice;
  address public buyer;

  /**
  * @dev Allows the owner to list the work for sale for a certain price to a certain seller
  *      This agreement is to happen off chain.
  * @param _buyer the only person allowed to purchase
  * @param _salePrice the price at which the sale can occur
  */
  function listForSale(address _buyer, uint256 _salePrice) public onlyOwner {
    buyer = _buyer;
    salePrice = _salePrice;
  }

  /**
  * @dev Allows the buyer to purchase the contract for the specified amount
  *      NonRentrent to protect against anything seeking to 
  */
  function purchaseListing() public payable onlyBuyer nonReentrant {
    require(msg.sender != address(0));
    require(msg.value == salePrice);
    owner.transfer(msg.value);
    Sale(owner, msg.sender, salePrice);
    OwnershipTransferred(owner, msg.sender);
    owner = msg.sender;
    salePrice = 0;
    buyer = address(0);
  }

  /**
  * @dev Overload the default transferOwnership in order to emit a Sale event w/ 0 price
  */
  function transferOwnership(address newOwner) public onlyOwner {
    super.transferOwnership(newOwner);
    Sale(owner, msg.sender, 0);
  }

}
