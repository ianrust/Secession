pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/token/ERC20Basic.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './BackableVehicle.sol';


/**
* @title Split purchaser
* @dev Contract that purchases a Backable vehicle and splits sale payments
*      Modification of SplitPayment
*/
contract SplitPurchaser is Ownable, ERC20Basic {

  // BackableVehicle to be purchased
  BackableVehicle backableVehicle;

  using SafeMath for uint256;

  mapping(address => uint256) public shares;
  mapping(address => uint256) public released;
  uint256 public totalReleased = 0;

  /**
  * @dev Creates the payment splitter, with creator as sole owner
  * @param _ownerShares initial token pool
  * @param _vehicleAddress BackableVehicle this payment will be purchasing
  */
  function SplitPurchaser(uint256 _ownerShares, address _vehicleAddress)
      Ownable()
      public {
    backableVehicle = BackableVehicle(_vehicleAddress);
    totalSupply = _ownerShares;
    shares[msg.sender] = _ownerShares;
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
  function balanceOf(address _who) public view returns (uint256) {
    return shares[_who];
  }

  /**
   * @dev Claim your share of the balance.
   */
  function claim() public {
    address payee = msg.sender;

    require(shares[payee] > 0);

    uint256 totalReceived = this.balance.add(totalReleased);
    uint256 payment = totalReceived.mul(shares[payee]).div(totalSupply).sub(released[payee]);

    require(payment != 0);
    require(this.balance >= payment);

    released[payee] = released[payee].add(payment);
    totalReleased = totalReleased.add(payment);

    payee.transfer(payment);
  }

  /**
   * @dev payable fallback
   */
  function () public payable {}

}