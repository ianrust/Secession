var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "<MNEMONIC>";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/<KEY>")
      },
      network_id: 3,
      gas: 6721975,
    },
  },
  solc: { optimizer: { enabled: true, runs: 200 } }
};