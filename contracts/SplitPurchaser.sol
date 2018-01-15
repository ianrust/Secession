pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/payment/SplitPayment.sol';
import 'zeppelin-solidity/contracts/token/ERC20Basic.sol';
import './BackableVehicle.sol';


/**
* @title Split purchaser
* @dev Contract that purchases a Backable vehicle and splits sale payments
*/
contract SplitPurchaser is Ownable, SplitPayment, ERC20Basic {

  // BackableVehicle to be purchased
  BackableVehicle backableVehicle;

  /**
  * @dev Creates the payment splitter, with creator as sole owner
  * @param _ownerShares initial token pool
  * @param _vehicleAddress BackableVehicle this payment will be purchasing
  */
  function SplitPurchaser(uint256 _ownerShares, address _vehicleAddress)
      Ownable()
      SplitPayment(getInitialOwners(msg.sender), getInitialShares(_ownerShares))
      public {
    backableVehicle = BackableVehicle(_vehicleAddress);
    totalSupply = _ownerShares;
  }

  /**
  * @dev transfer tokens from one address to another
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= shares[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    shares[msg.sender] = shares[msg.sender].sub(_value);
    shares[_to] = shares[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }


  /**
  * @dev Array initializer for owner
  * @param _owner owner of contract
  */
  function getInitialOwners(address _owner) internal pure returns (address[] initialOwners) {
    initialOwners = new address[](1);
    initialOwners[0] = _owner;
  }

  /**
  * @dev Array initializer for tokens
  * @param _ownerShares initial owner pool
  */
  function getInitialShares(uint256 _ownerShares) internal pure returns (uint256[] initialShares) {
    initialShares = new uint256[](1);
    initialShares[0] = _ownerShares;
  }

  /**
  * @dev Purchase the vehicle
  */
  function purchaseVehicle() public payable onlyOwner {
    backableVehicle.purchaseListing.value(msg.value)();
  }

  /**
  * @dev List the vehicle
  */
  function listVehicle(address _buyer, uint256 _salePrice) public onlyOwner {
    backableVehicle.listForSale(_buyer, _salePrice);
  }

  /**
  * @dev get the balance of an address
  */
  function balanceOf(address _owner) public view returns (uint256) {
    return shares[_owner];
  }

}