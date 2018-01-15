var Holdable = artifacts.require('../contracts/Holdable.sol');

contract('Holdable', function(accounts) {
  let holdable;
  const HOLDINGS = 10000000000000000; // must be greater than gas cost
  const NOT_OWNER = accounts[1];

  // event watchers
  let fundedWatcher;
  let withdrawalWatcher;

  beforeEach(async function () {
    holdable = await Holdable.new();
    fundedWatcher = holdable.Funded();
    withdrawalWatcher = holdable.Withdrawal();
  });

  it('created contract should have 0 holdings held', async () => {
    let holdings = await holdable.holdings.call();
    assert.isTrue(holdings == 0);
  })

  it('paid contract should have that amount of holdings held', async () => {
    await holdable.sendTransaction({ from: NOT_OWNER, value: HOLDINGS });
    let holdings = await holdable.holdings.call();
    assert.isTrue(holdings == HOLDINGS);
  })

  it('owner withdrawing should drain holdings', async () => {
    const owner = await holdable.owner.call();
    var beforeBalance = web3.eth.getBalance(owner);
    await holdable.sendTransaction({ from: NOT_OWNER, value: HOLDINGS });
    let fundedEvents = fundedWatcher.get();
    assert.isTrue(fundedEvents[0].args.funder == NOT_OWNER);
    assert.isTrue(fundedEvents[0].args.amount == HOLDINGS);
    await holdable.withdrawHoldings({ from: owner });
    let withdrawalEvents = withdrawalWatcher.get();
    assert.isTrue(withdrawalEvents[0].args.owner == owner);
    assert.isTrue(withdrawalEvents[0].args.amount == HOLDINGS);
    let holdings = await holdable.holdings.call();
    assert.isTrue(holdings == 0);
    var afterBalance = web3.eth.getBalance(owner);
    assert.isTrue(afterBalance.toNumber() > beforeBalance.toNumber());
  })

  it('only owner can withdraw', async () => {
    await holdable.sendTransaction({ from: NOT_OWNER, value: HOLDINGS });
    let failed = false;
    try {
      await holdable.withdrawHoldings({ from: NOT_OWNER });
    } catch(err) {
      failed = true;
    }
    assert.isTrue(failed);
    //no events
    let fundedEvents = fundedWatcher.get();
    let withdrawalEvents = withdrawalWatcher.get();
    assert.isTrue(fundedEvents.length == 0);
    assert.isTrue(withdrawalEvents.length == 0);

    let holdings = await holdable.holdings.call();
    assert.isTrue(holdings == HOLDINGS);
  })

});
