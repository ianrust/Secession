var Migrations = artifacts.require("./Migrations.sol");
var SecessionWork = artifacts.require("./SecessionWork.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SecessionWork);
};
