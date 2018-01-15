var BackableVehicle = artifacts.require('../contracts/BackableVehicle.sol');
var SplitPurchaser = artifacts.require('../contracts/SplitPurchaser.sol');

contract('SplitPurchaser', function(accounts) {
  let backableVehicle;
  let splitPurchaser;
  const PRICE = 1000000000000000000; // must be greater than gas cost

  beforeEach(async function () {
    backableVehicle = await BackableVehicle.new({ from: accounts[2] });
  });

  // token tests
  it('should return the correct totalSupply after construction', async function () {
    let splitPayment = await SplitPurchaser.new(100, backableVehicle.address, { from: accounts[0] });
    let totalSupply = await splitPayment.totalSupply(); 

    assert.equal(totalSupply, 100);
  });

  it('should return correct balances after transfer', async function () {
    let splitPayment = await SplitPurchaser.new(100, backableVehicle.address, { from: accounts[0] });
    await splitPayment.transfer(accounts[1], 100);

    let firstAccountBalance = await splitPayment.balanceOf(accounts[0]);
    assert.equal(firstAccountBalance, 0);

    let secondAccountBalance = await splitPayment.balanceOf(accounts[1]);
    assert.equal(secondAccountBalance, 100);
  });

  it('should throw an error when trying to transfer more than balance', async function () {
    let splitPayment = await SplitPurchaser.new(100, backableVehicle.address, { from: accounts[0] });
    try {
      await splitPayment.transfer(accounts[1], 101);
      assert.fail('should have thrown before');
    } catch (error) {
      // assertRevert(error);
    }
  });

  it('should throw an error when trying to transfer to 0x0', async function () {
    let splitPayment = await SplitPurchaser.new(100, backableVehicle.address, { from: accounts[0] });
    try {
      await splitPayment.transfer(0x0, 100);
      assert.fail('should have thrown before');
    } catch (error) {
      // assertRevert(error);
    }
  });

  // purchase tests

  it('should dispense funds on sale equally', async function () {
    let splitPayment = await SplitPurchaser.new(100, backableVehicle.address, { from: accounts[0] });
    await splitPayment.transfer(accounts[1], 50);

    let firstAccountBalance = await splitPayment.balanceOf(accounts[0]);
    assert.equal(firstAccountBalance, 50);

    let secondAccountBalance = await splitPayment.balanceOf(accounts[1]);
    assert.equal(secondAccountBalance, 50);

    // list for sale to split purchaser
    await backableVehicle.listForSale(splitPayment.address, PRICE, { from: accounts[2] });
    // attempt to buy as not owner of splitPayment
    try {
      await splitPayment.purchaseVehicle({ from: accounts[1], value: PRICE });
      assert.fail('should have thrown attempting to buy as not the owner');
    } catch (error) {}

    // buy as owner
    await splitPayment.purchaseVehicle({ from: accounts[0], value: PRICE });

    // now resell
    await splitPayment.listVehicle(accounts[3], PRICE, { from: accounts[0] });
    var collectorBeforeBalance = web3.eth.getBalance(accounts[0]);
    var otherBeforeBalance = web3.eth.getBalance(accounts[1]);
    await backableVehicle.purchaseListing({ from: accounts[3], value: PRICE });
    await splitPayment.claim({ from: accounts[0] });
    await splitPayment.claim({ from: accounts[1] });
    var collectorAfterBalance = web3.eth.getBalance(accounts[0]);
    var otherAfterBalance = web3.eth.getBalance(accounts[1]);
    const owner = await backableVehicle.owner.call();
    assert.isTrue(owner == accounts[3]);

    // make sure payments went through
    assert.isTrue((collectorAfterBalance.toNumber()-collectorBeforeBalance.toNumber()) > PRICE/4);
    assert.isTrue((otherAfterBalance.toNumber()-otherBeforeBalance.toNumber()) > PRICE/4);

  });

});
