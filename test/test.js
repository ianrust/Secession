// Specifically request an abstraction for SecessionWork
const SecessionWork = artifacts.require("SecessionWork.sol");

contract('SecessionWork', function(accounts) {
  describe('isCreated', () => {
    it('should create a work, not for sale', async () => {
      let contract = await SecessionWork.isDeployed();
      assert.isTrue(contract);
      let work = await SecessionWork.new(0, 200, "secret");
      let royalty = await work.getArtistRoyaltyBps.call();
      assert.equal(royalty, 200);
    })
  })
});
