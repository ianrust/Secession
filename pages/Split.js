import React, { Component } from 'react'
import { Form, Text } from 'react-form';
import SplitPurchaser from '../build/contracts/SplitPurchaser.json'
import BackableVehicle from '../build/contracts/BackableVehicle.json'
import getWeb3 from './utils/getWeb3'

class Split extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stake: 0,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
  }

  instantiateContract(submittedValues) {
    const contract = require('truffle-contract')
    const splitPurchaser = contract(SplitPurchaser)
    splitPurchaser.setProvider(this.state.web3.currentProvider)

    // register the work
    this.state.web3.eth.getAccounts((error, accounts) => {
      splitPurchaser.new(submittedValues.shares, submittedValues.workAddress, {from: accounts[0]})
    })
  };

  transfer(submittedValues) {
    const contract = require('truffle-contract')
    const splitPurchaser = contract(SplitPurchaser)
    splitPurchaser.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let split = splitPurchaser.at(submittedValues.royaltyAddress);
      split.transfer(submittedValues.toAddress, submittedValues.shares, {from: accounts[0]})
    })
  }

  listWork(submittedValues) {
    const contract = require('truffle-contract')
    const splitPurchaser = contract(SplitPurchaser)
    splitPurchaser.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let split = splitPurchaser.at(submittedValues.royaltyAddress);
      split.listVehicle(submittedValues.buyerAddress,  web3.toWei(submittedValues.price, "ether"), {from: accounts[0]})
    })
  }

  buyWork(submittedValues) {
    const contract = require('truffle-contract')
    const splitPurchaser = contract(SplitPurchaser)
    splitPurchaser.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let split = splitPurchaser.at(submittedValues.royaltyAddress);
      console.log("here")
      console.log(split)
      split.getPrice.call().then( results => {
        console.log(results)
        split.purchaseVehicle({from: accounts[0], value: results})
      })
    })
  }

  getStake(submittedValues) {
    const contract = require('truffle-contract')
    const splitPurchaser = contract(SplitPurchaser)
    splitPurchaser.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let split = splitPurchaser.at(submittedValues.royaltyAddress);
      split.balanceOf(accounts[0]).then( results => {
        let ours = results
        split.totalSupply.call().then( results =>{
          this.setState({ stake: ours/results*100 })
        })
      })
    })
  }

  render() {
    return (
      <div className="Split">
        Create a royalty contract:
        <Form onSubmit={submittedValues => this.instantiateContract(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="splitForm">
            <label htmlFor="workAddress">Work Address: </label>
            <Text field="workAddress" id="workAddress" />
            <label htmlFor="shares">Number of Shares: </label>
            <Text field="shares" id="shares" />
            <button type="submit">Create Royalty Purchaser</button>
          </form>
        )}
        </Form>
        Send royalty shares:
        <Form onSubmit={submittedValues => this.transfer(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="splitForm">
            <label htmlFor="royaltyAddress">Royalty Contract Address: </label>
            <Text field="royaltyAddress" id="royaltyAddress" />
            <label htmlFor="toAddress">To: </label>
            <Text field="toAddress" id="toAddress" />
            <label htmlFor="shares">Number of Shares: </label>
            <Text field="shares" id="shares" />
            <button type="submit">Transfer</button>
          </form>
        )}
        </Form>
        Buy the work:
        <Form onSubmit={submittedValues => this.buyWork(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="splitForm">
            <label htmlFor="royaltyAddress">Royalty Contract Address: </label>
            <Text field="royaltyAddress" id="royaltyAddress" />
            <button type="submit">Buy</button>
          </form>
        )}
        </Form>
        List the owned work for sale:
        <Form onSubmit={submittedValues => this.listWork(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="splitForm">
            <label htmlFor="royaltyAddress">Royalty Contract Address: </label>
            <Text field="royaltyAddress" id="royaltyAddress" />
            <label htmlFor="buyerAddress">Buyer Address: </label>
            <Text field="buyerAddress" id="buyerAddress" />
            <label htmlFor="price">Price: </label>
            <Text field="price" id="price" />
            <button type="submit">List</button>
          </form>
        )}
        </Form>
        Get Stake:
        <Form onSubmit={submittedValues => this.getStake(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="splitForm">
            <label htmlFor="royaltyAddress">Royalty Contract Address: </label>
            <Text field="royaltyAddress" id="royaltyAddress" />
            <button type="submit">getStake</button>
          </form>
        )}
        </Form>
        <div>
          Stake: {this.state.stake}%
        </div>
      </div>
    );
  }
}

export default Split
