const getEthBalance = (address) => {
  return Math.floor(web3.eth.getBalance(address).toNumber());
}

module.exports = {
  getEthBalance
}