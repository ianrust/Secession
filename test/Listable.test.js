var Listable = artifacts.require('../contracts/Listable.sol');

contract('Listable', function(accounts) {
  let listable;
  const PRICE = 10000000000000000; // must be greater than gas cost
  const BUYER = accounts[1];
  const NOT_BUYER = accounts[2];

  // event watchers
  let saleWatcher;
  let transferWatcher;

  beforeEach(async function () {
    listable = await Listable.new();
    saleWatcher = listable.Sale();
    transferWatcher = listable.OwnershipTransferred();
  });

  it('created contract should have invalid sale', async () => {
    let buyer = await listable.buyer.call();
    assert.isTrue(buyer == 0);
    let salePrice = await listable.salePrice.call();
    assert.isTrue(salePrice == 0);
  })

  it('listed contract should have correct sale parameters', async () => {
    const owner = await listable.owner.call();
    await listable.listForSale(BUYER, PRICE, { from: owner });
    let buyerOut = await listable.buyer.call();
    assert.isTrue(buyerOut == BUYER);
    let salePriceOut = await listable.salePrice.call();
    assert.isTrue(salePriceOut == PRICE);
  })

  it('purchased contract should transfer ownership', async () => {
    const owner = await listable.owner.call();
    var beforeBalance = web3.eth.getBalance(owner);
    await listable.listForSale(BUYER, PRICE, { from: owner });
    await listable.purchaseListing({ from: BUYER, value: PRICE });
    const newOwner = await listable.owner.call();
    assert.isTrue(newOwner == BUYER);
    var afterBalance = web3.eth.getBalance(owner);
    assert.isTrue(afterBalance > beforeBalance);
    let saleEvents = saleWatcher.get();
    assert.isTrue(saleEvents[0].args.previousOwner == owner);
    assert.isTrue(saleEvents[0].args.newOwner == newOwner);
    assert.isTrue(saleEvents[0].args.price.valueOf() == PRICE);
    let transferEvents = transferWatcher.get();
    assert.isTrue(transferEvents[0].args.previousOwner == owner);
    assert.isTrue(transferEvents[0].args.newOwner == newOwner);
  })

  it('invalid price should reject sale', async () => {
    const owner = await listable.owner.call();
    await listable.listForSale(BUYER, PRICE, { from: owner });
    let failed = false;
    try {
      await listable.purchaseListing({ from: BUYER, value: PRICE-1000000 });
    } catch(err) {
      failed = true;
    }
    assert.isTrue(failed);
    //no events
    let saleEvents = saleWatcher.get();
    let transferEvents = transferWatcher.get();
    assert.isTrue(saleEvents.length == 0);
    assert.isTrue(transferEvents.length == 0);
    const newOwner = await listable.owner.call();
    assert.isTrue(newOwner != BUYER);
  })

  it('invalid buyer should reject sale', async () => {
    const owner = await listable.owner.call();
    await listable.listForSale(BUYER, PRICE, { from: owner });
    let failed = false;
    try {
      await listable.purchaseListing({ from: NOT_BUYER, value: PRICE });
    } catch(err) {
      failed = true;
    }
    assert.isTrue(failed);
    //no events
    let saleEvents = saleWatcher.get();
    let transferEvents = transferWatcher.get();
    assert.isTrue(saleEvents.length == 0);
    assert.isTrue(transferEvents.length == 0);
    const newOwner = await listable.owner.call();
    assert.isTrue(newOwner != NOT_BUYER);
  })

});
