pragma solidity ^0.4.17;


import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';
import './MultiSigHolding.sol';

/**
 * @title Linked Sale
 * @dev Sale automation that respects royalty and property rights,
 *      as well as holds a deposit to incentivize the collector to sell
 *      on chain again
 */
contract LinkedSale is Destructible {

  // paties
  address seller;
  address buyer;
  address escrow;
  address artist;
  address multiSigHolding;

  // monies
  uint256 price;
  uint256 escrowReward;
  uint256 sellerDeposit;
  uint256 transitiveReward;
  uint256 escrowDeposit;

  bool directSale;

  address private provenanceAddress;

  // dispenses to owners of all the shares of royalties
  address private royaltyPoolAddress;
  // dispenses to owners of the shares of the actual work
  // (resets on sale, ie all shares are liquidated)
  address private propertyPoolAddress;

  // data for sending deposit back in chain
  uint256 private previousTransitiveReward;

  // tracks how much has been sent to this contract
  uint256 private fundsHeld;

  enum TransactionState {
    ForSale,
    ValidBid,
    BidAccepted,
    ReadyForPurchase,
    Purchased,
    InTransit,
    UnverifiedRecipt,
    Dead
  }

  TransactionState transactionState;

  uint256 artistRoyaltyBps = 0;

  uint256 private FULL_BPS = 10000;

  modifier contractAddressesOnly() {
    require(
      msg.sender == buyer ||
      msg.sender == seller ||
      msg.sender == escrow
    );
    _;
  }
  modifier sellerOnly() {
    require(msg.sender == seller);
    _;
  }
  modifier escrowOnly() {
    require(msg.sender == escrow);
    _;
  }
  modifier buyerOnly() {
    require(msg.sender == buyer);
    _;
  }
  modifier multiSigHoldingOnly() {
    require(msg.sender == multiSigHolding);
    _;
  }
  modifier setupPhaseOnly() {
    require(
      transactionState <= TransactionState.ReadyForPurchase
    );
    _;
  }

  function LinkedSale(address _seller,
                      address _escrow,
                      address _artist,
                      address _multiSigHolding,
                      uint256 _price,
                      uint256 _escrowReward,
                      uint256 _sellerDeposit,
                      uint256 _transitiveReward,
                      uint256 _escrowDeposit,
                      address _royaltyPoolAddress,
                      address _propertyPoolAddress,
                      address _artistRoyaltyBps) public payable { 
    seller              = _seller;
    escrow              = _escrow;
    artist              = _artist;
    multiSigHolding     = _multiSigHolding;
    price               = _price;
    escrowReward        = _escrowReward;
    sellerDeposit       = _sellerDeposit;
    transitiveReward    = _transitiveReward;
    escrowDeposit       = _escrowDeposit;
    royaltyPoolAddress  = _royaltyPoolAddress;
    propertyPoolAddress = _propertyPoolAddress;
    _artistRoyaltyBps   = _artistRoyaltyBps;
    transactionState    = TransactionState.ForSale;
    // direct sale
    directSale          = (escrow == address(0));
    fundsHeld           = 0;
    provenanceAddress   = msg.sender;
    previousTransitiveReward = msg.value;
  }

  function sendPayment(address _payee, uint256 _amount) internal
  {
    _payee.transfer(_amount);
    fundsHeld -= _amount;
  }

  function returnFunds() internal {
    if (!directSale) {
      if (transactionState >= TransactionState.BidAccepted) {
        sendPayment(seller, sellerDeposit);
      }
      if (transactionState == TransactionState.ReadyForPurchase) {
        sendPayment(escrow, escrowDeposit);
      }
    } else if (transactionState == TransactionState.ReadyForPurchase) {
        sendPayment(seller, sellerDeposit);
    }
  }

  function clearListing() internal {
    transactionState = TransactionState.Dead;
  }

  // clear the listing
  function cancelSale() public
    contractAddressesOnly()
    setupPhaseOnly()
  {
    returnFunds();
    clearListing();
  }

  // bid for a chance to buy.
  // highest bid always gets to be the buyer.
  function bid(uint256 _price) public
  {
    require(transactionState == TransactionState.ForSale);
    require(escrow != msg.sender);
    if (_price > price) {
      price = _price;
      buyer = msg.sender;
      transactionState = TransactionState.ValidBid;
    }
  }

  // accept the current best bid, put down seller deposit
  function acceptBid() public payable
    multiSigHoldingOnly()
  {
    require(transactionState == TransactionState.ValidBid);
    require(msg.value == sellerDeposit);
    require(buyer != address(0)); // TODO replace with actual state
    fundsHeld += msg.value;
    if (directSale) {
      transactionState = TransactionState.ReadyForPurchase;
    } else {
      transactionState = TransactionState.BidAccepted;  
    }
  }

  // provide escrow deposit (to give incentive to shipping/insurance)
  function acceptEscrow() public payable
    escrowOnly()
  {
    require(transactionState == TransactionState.BidAccepted);
    require(msg.value == escrowDeposit);
    transactionState = TransactionState.ReadyForPurchase;
    fundsHeld += msg.value;
  }

  // provide escrow reward (to go to shipping/insurance company)
  function buy() public payable
    buyerOnly()
  {
    require(transactionState == TransactionState.ReadyForPurchase);
    require(
      msg.value == (price + escrowReward + transitiveReward)
    );
    transactionState = TransactionState.Purchased;
    fundsHeld += msg.value;
  }

  // function for marking shipped by the shipping/insurance company
  function markShipped() public
    sellerOnly()
  {
    require(transactionState == TransactionState.Purchased);
    if (!directSale) {
      transactionState = TransactionState.InTransit;
    } else {
      transactionState = TransactionState.UnverifiedRecipt;
    }
  }

  // function for marking received by purchaser
  function markReceived() public
    escrowOnly()
  {
    require(transactionState == TransactionState.InTransit);
    transactionState = TransactionState.UnverifiedRecipt;
  }

  // function for shipping/insurance company to verify the receipt
  // initiates all transfers in check-effects-interactions
  // TODO implement multisig with art address
  function verifyReceived() public
    multiSigHoldingOnly()
  {
    require(transactionState == TransactionState.UnverifiedRecipt);

    // process transactions

    // seller sale price + reward from previous sale
    uint256 sellerPayment = sellerDeposit +
                            previousTransitiveReward;
    sendPayment(seller, sellerPayment);

    // pay owners of the shares of the work
    uint256 ownersPayment = price * (FULL_BPS - artistRoyaltyBps) / 10000;
    sendPayment(propertyPoolAddress, ownersPayment);

    // escrow/shipping/insurance
    uint256 escrowPayment =
      escrowDeposit +
      escrowReward * (FULL_BPS - artistRoyaltyBps) / 10000;
    sendPayment(escrow, escrowPayment);

    // artist royalty (fixed percentage + change from other transactions)
    uint256 royaltyPayment = price * artistRoyaltyBps / 10000;
    sendPayment(royaltyPoolAddress, royaltyPayment);

    // send any change to artist, excepting the transitive reward
    sendPayment(artist, fundsHeld - transitiveReward);

    // send transitive reward back for future sales
    sendPayment(provenanceAddress, transitiveReward);

    transactionState = TransactionState.Dead;

    destroy();
  }

  function () public payable {
    // holds any random funds. will be given to the artist on sale
    fundsHeld += msg.value;
  }

}