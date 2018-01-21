import React, { Component } from 'react'
import { Form, Text } from 'react-form';
import BackableVehicle from '../build/contracts/BackableVehicle.json'
import getWeb3 from './utils/getWeb3'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null
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

  instantiateContract(description) {
    const contract = require('truffle-contract')
    const backableVehicle = contract(BackableVehicle)
    backableVehicle.setProvider(this.state.web3.currentProvider)

    // register the work
    this.state.web3.eth.getAccounts((error, accounts) => {
      backableVehicle.new(description, {from: accounts[0]})
    })
  };

  listWork(submittedValues) {
    const contract = require('truffle-contract')
    const backableVehicle = contract(BackableVehicle)
    backableVehicle.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let work = backableVehicle.at(submittedValues.workAddress);
      work.listForSale(submittedValues.buyerAddress,  web3.toWei(submittedValues.price, "ether"), {from: accounts[0]})
    })
  }

  buyWork(submittedValues) {
    const contract = require('truffle-contract')
    const backableVehicle = contract(BackableVehicle)
    backableVehicle.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let work = backableVehicle.at(submittedValues.workAddress);
      work.salePrice.call().then( results => {
        work.purchaseListing({from: accounts[0], value: results})
      })
    })
  }

  render() {
    return (
      <div className="App">
        Register Work:
        <Form onSubmit={submittedValues => this.instantiateContract(submittedValues.description)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="registrationForm">
            <label htmlFor="description">Art Description: </label>
            <Text field="description" id="description" />
            <button type="submit">Register</button>
          </form>
        )}
        </Form>
        List Work:
        <Form onSubmit={submittedValues => this.listWork(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="listForm">
            <label htmlFor="workAddress">Work Address: </label>
            <Text field="workAddress" id="workAddress" />
            <label htmlFor="buyerAddress">Buyer Address: </label>
            <Text field="buyerAddress" id="buyerAddress" />
            <label htmlFor="price">Price: </label>
            <Text field="price" id="price" />
            <button type="submit">List</button>
          </form>
        )}
        </Form>
        Buy Work:
        <Form onSubmit={submittedValues => this.buyWork(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="buyForm">
            <label htmlFor="workAddress">Work Address: </label>
            <Text field="workAddress" id="workAddress" />
            <button type="submit">Buy</button>
          </form>
        )}
        </Form>
      </div>
    );
  }
}

export default App
