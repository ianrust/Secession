pragma solidity ^0.4.17;


import './ShareToken.sol';
import './Provenance.sol';


/**
 * @title Linked Sale
 * @dev Sale automation that respects royalty and property rights,
 *      as well as holds a deposit to incentivize the collector to sell
 *      on chain again
 */
contract LinkedSale {

  // // metadata for a Sale
  // struct Metadata {
  //   address seller;
  //   address buyer;
  //   bool escrowRequired;
  //   address escrow;

  //   // monies
  //   uint256 price;
  //   uint256 escrowReward;
  //   uint256 sellerDeposit;
  //   uint256 transitiveReward;
  //   uint256 escrowDeposit;
  // }

  // Metadata private metadata;

  // //TDODO convert to address
  // Provenance private provenance;

  // ShareToken private royaltyInvestors;
  // ShareToken private propertyInvestors;

  // // data for sending deposit back in chain
  // uint256 private previousDeposit;
  // address private currentOwner;

  // function LinkedSale(Metadata _metadata, Provenance _provenance) public {
  //   metadata = _metadata;
  //   provenance = _provenance;
  // }

//   // TODO adapt this

//     function listForDirectSale(uint256 price_,
//                              uint256 transitiveReward_,
//                              uint256 sellerDeposit_) external
//     collectorOnly()
//   {
//     transactionState = TransactionState.ForSale;
//     listSale.seller = msg.sender;
//     listSale.buyer = address(0);
//     listSale.escrowRequired = false;
//     listSale.escrow = address(0);
//     listSale.price = price_;
//     listSale.escrowReward = 0;
//     listSale.transitiveReward = transitiveReward_;
//     listSale.sellerDeposit = sellerDeposit_;
//     listSale.escrowDeposit = 0;
//   }

//   // make a listing
//   function listForEscrowSale(uint256 price_,
//                              address escrow_,
//                              uint256 escrowReward_,
//                              uint256 transitiveReward_,
//                              uint256 sellerDeposit_,
//                              uint256 escrowDeposit_) external
//     collectorOnly()
//   {
//     require (transactionState == TransactionState.Owned);
//     transactionState = TransactionState.ForSale;
//     listSale.seller = msg.sender;
//     listSale.buyer = address(0);
//     listSale.escrowRequired = true;
//     listSale.escrow = escrow_;
//     listSale.price = price_;
//     listSale.escrowReward = escrowReward_;
//     listSale.transitiveReward = transitiveReward_;
//     listSale.sellerDeposit = sellerDeposit_;
//     listSale.escrowDeposit = escrowDeposit_;
//   }

//   function returnFunds() internal {
//     if (listSale.escrowRequired) {
//       if (transactionState >= TransactionState.BidAccepted) {
//         sendPayment(listSale.seller, listSale.sellerDeposit);
//       }
//       if (transactionState == TransactionState.ReadyForPurchase) {
//         sendPayment(listSale.escrow, listSale.escrowDeposit);
//       }
//     } else if (transactionState == TransactionState.ReadyForPurchase) {
//         sendPayment(listSale.seller, listSale.sellerDeposit);
//     }
//   }

//   function clearListing() internal {
//     transactionState = TransactionState.Owned;
//     listSale.seller = msg.sender;
//     listSale.buyer = address(0);
//     listSale.escrowRequired = false;
//     listSale.escrow = address(0);
//     listSale.price = 0;
//     listSale.escrowReward = 0;
//     listSale.sellerDeposit = 0;
//     listSale.transitiveReward = 0;
//     listSale.escrowDeposit = 0;
//   }

//   // clear the listing
//   function cancelSale() external
//     contractAddressesOnly()
//     setupPhaseOnly()
//   {
//     returnFunds();
//     clearListing();
//   }

//   // bid for a chance to buy.
//   // highest bid always gets to be the buyer.
//   function bid(uint256 price_) external
//   {
//     require(transactionState == TransactionState.ForSale);
//     require(listSale.escrow != msg.sender);
//     if (price_ > listSale.price) {
//       listSale.price = price_;
//       listSale.buyer = msg.sender;
//       transactionState = TransactionState.ValidBid;
//     }
//   }

//   // accept the current best bid, put down seller deposit
//   function acceptBid() external payable
//     collectorOnly()
//   {
//     require(transactionState == TransactionState.ValidBid);
//     require(msg.value == listSale.sellerDeposit);
//     require(listSale.buyer != address(0)); // TODO replace with actual state
//     fundsHeld += msg.value;
//     if (listSale.escrowRequired) {
//       transactionState = TransactionState.BidAccepted;
//     } else {
//       transactionState = TransactionState.ReadyForPurchase;
//     }
//   }

//   // provide escrow deposit (to give incentive to shipping/insurance)
//   function acceptEscrow() external payable
//     escrowOnly()
//   {
//     require(transactionState == TransactionState.BidAccepted);
//     require(msg.value == listSale.escrowDeposit);
//     transactionState = TransactionState.ReadyForPurchase;
//     fundsHeld += msg.value;
//   }

//   // provide escrow reward (to go to shipping/insurance company)
//   function buy() external payable
//     buyerOnly()
//   {
//     require(transactionState == TransactionState.ReadyForPurchase);
//     require(
//       msg.value == (listSale.price + listSale.escrowReward + listSale.transitiveReward)
//     );
//     transactionState = TransactionState.Purchased;
//     fundsHeld += msg.value;
//   }

//   // function for marking shipped by the shipping/insurance company
//   function markShipped() external
//     collectorOnly()
//   {
//     require(transactionState == TransactionState.Purchased);
//     if (listSale.escrowRequired) {
//       transactionState = TransactionState.InTransit;
//     } else {
//       transactionState = TransactionState.UnverifiedRecipt;
//     }
//   }

//   // function for marking received by purchaser
//   function markReceived() external
//     escrowOnly()
//   {
//     require(transactionState == TransactionState.InTransit);
//     transactionState = TransactionState.UnverifiedRecipt;
//   }

//   // clear the listing
//   function sendPayment(address payee_, uint256 amount_) internal
//   {
//     payee_.transfer(amount_);
//     fundsHeld -= amount_;
//   }

//   // function for shipping/insurance company to verify the receipt
//   // initiates all transfers in check-effects-interactions
//   function verifyReceived(string secret_) external
//     buyerOnly()
//     secretHolderOnly(secret_)
//   {
//     require(transactionState == TransactionState.UnverifiedRecipt);

//     // process transactions
//     // seller sale price + reward from previous sale
//     uint256 sellerPayment =
//       listSale.sellerDeposit +
//       lastSale.transitiveReward;
//       listSale.price * (FULL_BPS - artistRoyaltyBps) / 10000 ;
//     sendPayment(listSale.seller, sellerPayment);

//     // escrow/shipping/insurance
//     uint256 escrowPayment =
//       listSale.escrowDeposit +
//       listSale.escrowReward * (FULL_BPS - artistRoyaltyBps) / 10000;
//     sendPayment(listSale.escrow, escrowPayment);

//     // artist royalty (fixed percentage + change from other transactions)

//     // loop through royalty holders and send royalties due
//     for(uint i = 0; i < royaltyOwners.length; ++i) {
//       uint256 royaltyPayment =
//         (listSale.price + listSale.escrowReward) * royalties[royaltyOwners[i]] / 10000;
//       sendPayment(royaltyOwners[i], royaltyPayment);
//     }
//     // send any change to artist, excepting the transitive reward
//     sendPayment(artist, fundsHeld - listSale.transitiveReward);

//     lastSale = listSale;
//     transactionState = TransactionState.Owned;
//     clearListing();
//   }
// }


}