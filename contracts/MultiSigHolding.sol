pragma solidity ^0.4.17;


/**
 * @title MultiSigOwnership
 * @dev contract that only signs certain transactions with a LinkedSale
 *      contract if both the holder and the holding sign this
 *    Also holds funds, which can only be liquidated if there is a 
 */
contract MultiSigHolding {
  address holder;
  address holding;

  function MultiSigHolding(address _holder, address _holding) public {
    holder = _holder;
    holding = _holding;
  }

  function () public payable {}
}