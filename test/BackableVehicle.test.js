var BackableVehicle = artifacts.require('../contracts/BackableVehicle.sol');

contract('BackableVehicle', function(accounts) {
  let backableVehicle;
  const PRICE = 100; // must be greater than gas cost
  const HOLDINGS = 100; // must be greater than gas cost
  const BUYER = accounts[1];
  const NEVER_OWNER = accounts[2];

  beforeEach(async function () {
    backableVehicle = await BackableVehicle.new();
  });

  it('created contract should be unlocked', async () => {
    let holdingsLocked = await backableVehicle.holdingsLocked.call();
    assert.isFalse(holdingsLocked);
  })

  it('sale of contract with back and eventual withdrawal of backing', async () => {
    const owner = await backableVehicle.owner.call();
    await backableVehicle.sendTransaction({ from: NEVER_OWNER, value: HOLDINGS });
    await backableVehicle.listForSale(BUYER, PRICE, { from: owner });
    let holdingsLocked = await backableVehicle.holdingsLocked.call();
    assert.isTrue(holdingsLocked);
    await backableVehicle.purchaseListing({ from: BUYER, value: PRICE });
    holdingsLocked = await backableVehicle.holdingsLocked.call();
    assert.isFalse(holdingsLocked);
    const newOwner = await backableVehicle.owner.call();
    assert.isTrue(newOwner == BUYER);
    let holdings = await backableVehicle.holdings.call();
    assert.isTrue(holdings == HOLDINGS);
    // new owner withdraws
    await backableVehicle.withdrawHoldings({ from: BUYER });
    holdings = await backableVehicle.holdings.call();
    assert.isTrue(holdings == 0);
  })

  it('unable to withdraw funds when sale is listed', async () => {
    const owner = await backableVehicle.owner.call();
    await backableVehicle.sendTransaction({ from: NEVER_OWNER, value: HOLDINGS });
    await backableVehicle.listForSale(BUYER, PRICE, { from: owner });
    // owner attempts to withdraw
    var failed = false;
    try {
      await backableVehicle.withdrawHoldings({ from: BUYER });
    } catch(err) {
      failed = true;
    }
    assert.isTrue(failed);
  })

});
