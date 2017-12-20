const { ethTransaction, ethCall } = require('./helpers')
// Specifically request an abstraction for PreHumousWork
const PreHumousWork = artifacts.require("PreHumousWork.sol");

contract('PreHumousWork', function(accounts) {
  describe('isCreated', () => {
    it('should create a work, not for sale', async () => {
      // const phWork = await PreHumousWork.new(200, "secret")
      const a = await PreHumousWork.deployed()
      // const c = await ethCall(phWork.artistRoyaltyBps.call())
      // c.assertReturnValue(200)
    })
  })
});
