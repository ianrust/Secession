pragma solidity ^0.4.17;


// emit events w/ loopback to registers in 
import './LinkedSale.sol';
import './ShareToken.sol';
import './MultiSigHolding.sol';
// import './DisplayLoan.sol';

/**
 * @title Provenance
 * @dev master record for a work
 */
contract Provenance {
  address artist;
  address currentCollector;

  MultiSigHolding work;

  ShareToken royaltyPool;
  ShareToken propertyPool;

  LinkedSale currentSale;

  uint256 transitiveRewardHeld;

  uint private NUM_SHARES = 100000;

  modifier collectorOnly() {
    require(msg.sender == currentCollector);
    _;
  }

  function Provenance(address _artist, address _work) public {
    artist = _artist;
    currentCollector = _artist;

    work = new MultiSigHolding(currentCollector, _work);

    royaltyPool = new ShareToken(artist, NUM_SHARES);
    propertyPool = new ShareToken(artist, NUM_SHARES);
  }

  // create a sale
  function listForSale() public
    collectorOnly()
  {
    // currentSale = (new LinkedSale()).value(transitiveRewardHeld);
  }

  // loan out work
  function loan() public
    collectorOnly()
  {

  }

  // accepts any transitive rewards (and can be added to for addition transitive rewards)
  // specifically used for 
  function () public payable {
    transitiveRewardHeld += msg.value;
  }
}