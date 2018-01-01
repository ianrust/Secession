const ShareToken = artifacts.require("ShareToken.sol");

const helpers = require("./helpers.js");
var bigInt = require("big-integer");

const SUPPLY_MAX = 1000;

const makeToken = async (accounts) => {
  let contract = await ShareToken.isDeployed();
  assert.isTrue(contract);
  let token = await ShareToken.new(accounts[0], SUPPLY_MAX);
  return token
}

contract('ShareToken', function(accounts) {
  describe('isCreated', () => {
    it('create a token and dispense to it', async () => {
      let token = await makeToken(accounts);
      let supply = await token.getSupply.call();
      assert.equal(supply.valueOf(), SUPPLY_MAX);
      let firstBalance = await token.balanceOf.call(accounts[0]);
      assert.equal(firstBalance, SUPPLY_MAX);
    })
  })

  describe('singleDispense', () => {
    it('create a token and dispense to it', async () => {
      let token = await makeToken(accounts);
      let ids = [0, 1]
      let originalBalances = ids.map((i) => bigInt(helpers.getEthBalance(accounts[i])));
      let toDispense = bigInt(Math.floor(originalBalances[1] / 2e9) * 1e6);
      let done = await token.dispense.sendTransaction({ from: accounts[1], value: toDispense });
      let finalBalances = ids.map((i) => bigInt(helpers.getEthBalance(accounts[i])));
      assert.equal(finalBalances[0].minus(originalBalances[0]).compare(toDispense), 0);
    })
  })

  describe('halfDispense', () => {
    it('create a token, transfer half, split the dispense', async () => {
      let token = await makeToken(accounts);

      let ids = [0, 1, 2]
      let sendAmount = Math.floor(SUPPLY_MAX / 2);
      let successfulTransfer = await token.transfer(accounts[1], sendAmount, {from: accounts[0]});
      let firstBalance = await token.balanceOf.call(accounts[0]);
      assert.equal(firstBalance.toNumber(), sendAmount);
      let secondBalance = await token.balanceOf.call(accounts[1]);
      assert.equal(secondBalance.toNumber(), sendAmount);

      let originalBalances = ids.map((i) => bigInt(helpers.getEthBalance(accounts[i])));
      let toDispense = bigInt(Math.floor(originalBalances[2] / 2e9) * 1e6);
      let done = await token.dispense.sendTransaction({ from: accounts[2], value: toDispense });
      let finalBalances = ids.map((i) => bigInt(helpers.getEthBalance(accounts[i])));
      let perShare = Math.floor(toDispense / SUPPLY_MAX);

      assert.equal(finalBalances[0].minus(originalBalances[0]).compare(toDispense - Math.floor(perShare * sendAmount)), 0);
      assert.equal(finalBalances[1].minus(originalBalances[1]).compare(Math.floor(perShare * sendAmount)), 0);
    })
  })

  describe('unevenDispense', () => {
    it('create a token, transfer half, split the dispense', async () => {
      let token = await makeToken(accounts);

      let ids = [0, 1, 2]
      let sendAmount = Math.floor(SUPPLY_MAX / 7);
      let successfulTransfer = await token.transfer(accounts[1], sendAmount, {from: accounts[0]});
      let firstBalance = await token.balanceOf.call(accounts[0]);
      assert.equal(firstBalance.toNumber(), SUPPLY_MAX - sendAmount);
      let secondBalance = await token.balanceOf.call(accounts[1]);
      assert.equal(secondBalance.toNumber(), sendAmount);

      let originalBalances = ids.map((i) => bigInt(helpers.getEthBalance(accounts[i])));
      let toDispense = bigInt(Math.floor(originalBalances[2] / 2e9) * 1e6);

      let done = await token.dispense.sendTransaction({ from: accounts[2], value: toDispense});
      let finalBalances = ids.map((i) => bigInt(helpers.getEthBalance(accounts[i])));

      let perShare = Math.floor(toDispense / SUPPLY_MAX);
      assert.equal(finalBalances[0].minus(originalBalances[0]).compare(toDispense - Math.floor(perShare * sendAmount)), 0);
      assert.equal(finalBalances[1].minus(originalBalances[1]).compare(Math.floor(perShare * sendAmount)), 0);
    })
  })
});
