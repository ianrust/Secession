pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/token/BasicToken.sol';


/**
 * @title Cap Table Token
 * @dev Token contract that handles transfers of tokens and relaying the cap table
 */
contract ShareToken is BasicToken {

  // track whether an investor has gotten involved
  mapping(address => bool) isInvestor;
  address[] investors;
  uint256 supply;

  /**
  * @dev transfer token for a specified address, track investors
  * @param _initialOwner address of owner of all initial dividend tokens
  * @param _supply The number of tokens to mint
  */
  function ShareToken(address _initialOwner,
                         uint256 _supply) public {
    // shares of the dividends. if you hold all, you get the full royalty
    // if you hold less, you get a proportial amount of the royalty
    balances[_initialOwner] = _supply;
    supply = _supply;
    addInvestor(_initialOwner);
  }


  /**
  * @dev returns the total number of shares
  */
  function getSupply() public view returns (uint256) {
    return supply;
  }

  /**
  * @dev private method for adding an investor for easy dispensing of dividends
  * @param _newInvestor the investor to be added
  */
  function addInvestor(address _newInvestor) private {
    if (!isInvestor[_newInvestor]) {
      investors.push(_newInvestor);
      isInvestor[_newInvestor] = true;
    }
  }

  /**
  * @dev transfer token for a specified address and maintains investor list
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    if (BasicToken.transfer(_to, _value)) {
      addInvestor(_to);
      return true;
    }
    return false;

    //TODO emit an event
  }

  /**
  * @dev pay to all token holders proportionally to all investors
  *.     according to number of tokens held. will round down
  */
  function dispense() public payable {
    uint256 perShareDividend = msg.value / supply;
    uint256 change = msg.value - (perShareDividend * supply);
    // loop through investors and dispense their proportion
    for (uint256 i = 0; i < investors.length; ++i) {
      investors[i].transfer(perShareDividend * balances[investors[i]]);
    }
    // send change to the initial owner
    investors[0].transfer(change);

    //TODO emit an event
  }

}