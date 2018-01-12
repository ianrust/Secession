pragma solidity ^0.4.18;


import './Holder.sol';
import './Listable.sol';


/**
* @title Backable vehicle
* @dev A vehicle that lets you back and list
*      (often tied to an off-chain source of value),
*      and doesn't allow withdrawals when a listing occurs
*      (to prevent owners from wuickly withdrawing before a sale)
*/
contract BackableVehicle is Listable, Holder {

  // mutex for when a list, sale, or withdrawal happens
  bool public holdingsLocked;

  /**
  * @dev Throws if holdings are locked
  */
  modifier onlyWhenUnlocked() {
    require(!holdingsLocked);
    _;
  }

  /**
  * @dev Lists the sale, and locks the holdings
  * @param _buyer the only person allowed to purchase
  * @param _salePrice the price at which the sale can occur
  */
  function listForSale(address _buyer, uint256 _salePrice) public onlyOwner {
  	holdingsLocked = true;
  	super.listForSale(_buyer, _salePrice);
  }

  /**
  * @dev Allows the buyer to purchase the contract, clears the lock
  */
  function purchaseListing() public payable onlyBuyer {
  	holdingsLocked = false;
    super.purchaseListing();
  }

  /**
  * @dev Allows the owner to claim the holdings from the contract, but only if not locked
  */
  function withdrawHoldings() public onlyOwner onlyWhenUnlocked {
    super.withdrawHoldings();
  }

}