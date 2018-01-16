var BackableVehicle = artifacts.require("./BackableVehicle.sol");
var SplitPurchaser = artifacts.require("./SplitPurchaser.sol");

module.exports = function(deployer) {
  deployer.deploy(BackableVehicle);
  deployer.deploy(SplitPurchaser);
};