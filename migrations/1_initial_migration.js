var Migrations = artifacts.require("./Migrations.sol");
var SecessionWork = artifacts.require("./SecessionWork.sol");
var ShareToken = artifacts.require("./ShareToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SecessionWork);
  deployer.deploy(ShareToken);
};
