pragma solidity ^0.4.17;

contract SecessionWork {
  // artist address
  address artist;

  // metadata for a Sale
  struct Sale {
    address seller;
    address buyer;
    bool escrowRequired;
    address escrow;

    // monies
    uint256 price;
    uint256 escrowReward;
    uint256 sellerDeposit;
    uint256 transitiveReward;
    uint256 escrowDeposit;
  }

  // metadata for a RoyaltySale
  struct RoyaltySale {
    address seller;
    address buyer;

    // monies
    uint256 price;
    uint256 bps;
    bool forSale;
  }

  // mapping for holding royalty tokens
  mapping(address => uint256) royalties;
  mapping(address => RoyaltySale) listRoyaltySales;
  mapping(address => bool) isRoyaltyOwner;
  address[] royaltyOwners;

  // constant royalty basis points (1/100%) for artist
  // is applied to every sale
  uint256 artistRoyaltyBps;

  // Transaction state
  TransactionState transactionState;

  // proposal by collector for sale
  Sale listSale;

  // actual sales that occurred
  Sale lastSale;

  // keccak256 hash of the initial secret.
  // This must be used to transact the work (in addition to being the collector)
  bytes32 private keccak256Secret;

  // how much we have been sent, used to make sure there is no orphaned eth
  uint256 private fundsHeld;

  uint256 private FULL_BPS = 10000;

  enum TransactionState {
    Owned,
    ForSale,
    ValidBid,
    BidAccepted,
    ReadyForPurchase,
    Purchased,
    InTransit,
    UnverifiedRecipt
  }

  // basic checks for ensuring only certain addresses can do certain things
  modifier artistOnly() { require(msg.sender == artist); _; }
  modifier collectorOnly() {
    require(msg.sender == lastSale.buyer);
    _;
  }
  modifier escrowOnly() { require(msg.sender == listSale.escrow); _; }
  modifier buyerOnly() { require(msg.sender == listSale.buyer); _; }
  modifier secretHolderOnly(string secret) {
    require(keccak256Secret == keccak256(secret));
    _;
  }
  modifier contractAddressesOnly() {
    require(
      msg.sender == listSale.buyer ||
      msg.sender == listSale.seller ||
      msg.sender == listSale.escrow
    );
    _;
  }
  modifier setupPhaseOnly() {
    require(
      uint(transactionState) <= uint(TransactionState.ReadyForPurchase)
    );
    _;
  }

  // register a work, will be added to the work array held by this contract
  function SecessionWork(address artist_,
                         uint256 artistRoyaltyBps_,
                         string secret_) public {

    // make sure the royalty percantage is < 100%
    require(artistRoyaltyBps < FULL_BPS);

    artistRoyaltyBps = artistRoyaltyBps_;
    transactionState = TransactionState.Owned;
    keccak256Secret = keccak256(secret_);

    Sale memory registrationSale;
    registrationSale.seller = address(0);
    registrationSale.buyer = msg.sender;
    registrationSale.price = 0;
    registrationSale.transitiveReward = 0;
    lastSale = registrationSale;

    artist = artist_;

    royalties[artist] = artistRoyaltyBps_;
    addRoyaltyOwner(artist);

    clearRoyaltySale(artist);
  }

  // getters for tests
  function getArtistRoyaltyBps() external view returns (uint256 res) {
    return artistRoyaltyBps;
  }

  function addRoyaltyOwner(address newOwner_) private {
    if (!isRoyaltyOwner[newOwner_]) {
      royaltyOwners.push(newOwner_);
      isRoyaltyOwner[newOwner_] = true;
    }
  }

  function clearRoyaltySale(address sender_) private {
    listRoyaltySales[sender_].bps = 0;
    listRoyaltySales[sender_].price = 0;
    listRoyaltySales[sender_].seller = address(0);
    listRoyaltySales[sender_].buyer = address(0);
    listRoyaltySales[sender_].forSale = false;
  }

  // list artist royalty for sale
  function listArtistRoyaltyForSale(uint256 bps_,
                                    uint256 price_,
                                    address buyer_) external {
    require(royalties[msg.sender] >= bps_);

    listRoyaltySales[msg.sender].bps = bps_;
    listRoyaltySales[msg.sender].price = price_;
    listRoyaltySales[msg.sender].seller = msg.sender;
    listRoyaltySales[msg.sender].buyer = buyer_;
    listRoyaltySales[msg.sender].forSale = true;
  }

  function cancelArtistRoyaltyForSale() external {
    require(listRoyaltySales[msg.sender].forSale);
    clearRoyaltySale(msg.sender);
  }

  function buyArtistRoyaltyForSale(address seller_) external payable {
    require(royalties[seller_] <= listRoyaltySales[seller_].bps);
    require(listRoyaltySales[seller_].forSale);
    require(listRoyaltySales[seller_].price == msg.value);
    require(listRoyaltySales[seller_].buyer == msg.sender);

    seller_.transfer(msg.value);

    clearRoyaltySale(seller_);
    clearRoyaltySale(msg.sender);
    royalties[msg.sender] += listRoyaltySales[seller_].bps;
    royalties[seller_] -= listRoyaltySales[seller_].bps;
    addRoyaltyOwner(msg.sender);
  }

  // make a escrow-less listing
  function listForDirectSale(uint256 price_,
                             uint256 transitiveReward_,
                             uint256 sellerDeposit_) external
    collectorOnly()
  {
    transactionState = TransactionState.ForSale;
    listSale.seller = msg.sender;
    listSale.buyer = address(0);
    listSale.escrowRequired = false;
    listSale.escrow = address(0);
    listSale.price = price_;
    listSale.escrowReward = 0;
    listSale.transitiveReward = transitiveReward_;
    listSale.sellerDeposit = sellerDeposit_;
    listSale.escrowDeposit = 0;
  }

  // make a listing
  function listForEscrowSale(uint256 price_,
                             address escrow_,
                             uint256 escrowReward_,
                             uint256 transitiveReward_,
                             uint256 sellerDeposit_,
                             uint256 escrowDeposit_) external
    collectorOnly()
  {
    require (transactionState == TransactionState.Owned);
    transactionState = TransactionState.ForSale;
    listSale.seller = msg.sender;
    listSale.buyer = address(0);
    listSale.escrowRequired = true;
    listSale.escrow = escrow_;
    listSale.price = price_;
    listSale.escrowReward = escrowReward_;
    listSale.transitiveReward = transitiveReward_;
    listSale.sellerDeposit = sellerDeposit_;
    listSale.escrowDeposit = escrowDeposit_;
  }

  function returnFunds() internal {
    if (listSale.escrowRequired) {
      if (transactionState >= TransactionState.BidAccepted) {
        sendPayment(listSale.seller, listSale.sellerDeposit);
      }
      if (transactionState == TransactionState.ReadyForPurchase) {
        sendPayment(listSale.escrow, listSale.escrowDeposit);
      }
    } else if (transactionState == TransactionState.ReadyForPurchase) {
        sendPayment(listSale.seller, listSale.sellerDeposit);
    }
  }

  function clearListing() internal {
    transactionState = TransactionState.Owned;
    listSale.seller = msg.sender;
    listSale.buyer = address(0);
    listSale.escrowRequired = false;
    listSale.escrow = address(0);
    listSale.price = 0;
    listSale.escrowReward = 0;
    listSale.sellerDeposit = 0;
    listSale.transitiveReward = 0;
    listSale.escrowDeposit = 0;
  }

  // clear the listing
  function cancelSale() external
    contractAddressesOnly()
    setupPhaseOnly()
  {
    returnFunds();
    clearListing();
  }

  // bid for a chance to buy.
  // highest bid always gets to be the buyer.
  function bid(uint256 price_) external
  {
    require(transactionState == TransactionState.ForSale);
    require(listSale.escrow != msg.sender);
    if (price_ > listSale.price) {
      listSale.price = price_;
      listSale.buyer = msg.sender;
      transactionState = TransactionState.ValidBid;
    }
  }

  // accept the current best bid, put down seller deposit
  function acceptBid() external payable
    collectorOnly()
  {
    require(transactionState == TransactionState.ValidBid);
    require(msg.value == listSale.sellerDeposit);
    require(listSale.buyer != address(0)); // TODO replace with actual state
    fundsHeld += msg.value;
    if (listSale.escrowRequired) {
      transactionState = TransactionState.BidAccepted;
    } else {
      transactionState = TransactionState.ReadyForPurchase;
    }
  }

  // provide escrow deposit (to give incentive to shipping/insurance)
  function acceptEscrow() external payable
    escrowOnly()
  {
    require(transactionState == TransactionState.BidAccepted);
    require(msg.value == listSale.escrowDeposit);
    transactionState = TransactionState.ReadyForPurchase;
    fundsHeld += msg.value;
  }

  // provide escrow reward (to go to shipping/insurance company)
  function buy() external payable
    buyerOnly()
  {
    require(transactionState == TransactionState.ReadyForPurchase);
    require(
      msg.value == (listSale.price + listSale.escrowReward + listSale.transitiveReward)
    );
    transactionState = TransactionState.Purchased;
    fundsHeld += msg.value;
  }

  // function for marking shipped by the shipping/insurance company
  function markShipped() external
    collectorOnly()
  {
    require(transactionState == TransactionState.Purchased);
    if (listSale.escrowRequired) {
      transactionState = TransactionState.InTransit;
    } else {
      transactionState = TransactionState.UnverifiedRecipt;
    }
  }

  // function for marking received by purchaser
  function markReceived() external
    escrowOnly()
  {
    require(transactionState == TransactionState.InTransit);
    transactionState = TransactionState.UnverifiedRecipt;
  }

  // clear the listing
  function sendPayment(address payee_, uint256 amount_) internal
  {
    payee_.transfer(amount_);
    fundsHeld -= amount_;
  }

  // function for shipping/insurance company to verify the receipt
  // initiates all transfers in check-effects-interactions
  function verifyReceived(string secret_) external
    buyerOnly()
    secretHolderOnly(secret_)
  {
    require(transactionState == TransactionState.UnverifiedRecipt);

    // process transactions
    // seller sale price + reward from previous sale
    uint256 sellerPayment =
      listSale.sellerDeposit +
      lastSale.transitiveReward;
      listSale.price * (FULL_BPS - artistRoyaltyBps) / 10000 ;
    sendPayment(listSale.seller, sellerPayment);

    // escrow/shipping/insurance
    uint256 escrowPayment =
      listSale.escrowDeposit +
      listSale.escrowReward * (FULL_BPS - artistRoyaltyBps) / 10000;
    sendPayment(listSale.escrow, escrowPayment);

    // artist royalty (fixed percentage + change from other transactions)

    // loop through royalty holders and send royalties due
    for(uint i = 0; i < royaltyOwners.length; ++i) {
      uint256 royaltyPayment =
        (listSale.price + listSale.escrowReward) * royalties[royaltyOwners[i]] / 10000;
      sendPayment(royaltyOwners[i], royaltyPayment);
    }
    // send any change to artist, excepting the transitive reward
    sendPayment(artist, fundsHeld - listSale.transitiveReward);

    lastSale = listSale;
    transactionState = TransactionState.Owned;
    clearListing();
  }
}