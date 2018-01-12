var Holder = artifacts.require('../contracts/Holder.sol');

contract('Holder', function(accounts) {
  let holder;
  const HOLDINGS = 10000000000000000; // must be greater than gas cost
  const NOT_OWNER = accounts[1];

  // event watchers
  let fundedWatcher;
  let withdrawalWatcher;

  beforeEach(async function () {
    holder = await Holder.new();
    fundedWatcher = holder.Funded();
    withdrawalWatcher = holder.Withdrawal();
  });

  it('created contract should have 0 holdings held', async () => {
    let holdings = await holder.holdings.call();
    assert.isTrue(holdings == 0);
  })

  it('paid contract should have that amount of holdings held', async () => {
    await holder.sendTransaction({ from: NOT_OWNER, value: HOLDINGS });
    let holdings = await holder.holdings.call();
    assert.isTrue(holdings == HOLDINGS);
  })

  it('owner withdrawing should drain holdings', async () => {
    const owner = await holder.owner.call();
    var beforeBalance = web3.eth.getBalance(owner);
    await holder.sendTransaction({ from: NOT_OWNER, value: HOLDINGS });
    let fundedEvents = fundedWatcher.get();
    assert.isTrue(fundedEvents[0].args.funder == NOT_OWNER);
    assert.isTrue(fundedEvents[0].args.amount == HOLDINGS);
    await holder.withdrawHoldings({ from: owner });
    let withdrawalEvents = withdrawalWatcher.get();
    assert.isTrue(withdrawalEvents[0].args.owner == owner);
    assert.isTrue(withdrawalEvents[0].args.amount == HOLDINGS);
    let holdings = await holder.holdings.call();
    assert.isTrue(holdings == 0);
    var afterBalance = web3.eth.getBalance(owner);
    assert.isTrue(afterBalance.toNumber() > beforeBalance.toNumber());
  })

  it('only owner can withdraw', async () => {
    await holder.sendTransaction({ from: NOT_OWNER, value: HOLDINGS });
    let failed = false;
    try {
      await holder.withdrawHoldings({ from: NOT_OWNER });
    } catch(err) {
      failed = true;
    }
    assert.isTrue(failed);
    //no events
    let fundedEvents = fundedWatcher.get();
    let withdrawalEvents = withdrawalWatcher.get();
    assert.isTrue(fundedEvents.length == 0);
    assert.isTrue(withdrawalEvents.length == 0);

    let holdings = await holder.holdings.call();
    assert.isTrue(holdings == HOLDINGS);
  })

});
