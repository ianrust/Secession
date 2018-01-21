import React, { Component } from 'react'
import { Form, Text } from 'react-form';
import BackableVehicle from '../build/contracts/BackableVehicle.json'
import getWeb3 from './utils/getWeb3'

class WorkInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      set: false,
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

  getWorkInfo(submittedValues) {
    const contract = require('truffle-contract')
    const backableVehicle = contract(BackableVehicle)
    backableVehicle.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      let work = backableVehicle.at(submittedValues.workAddress);

      // Get all the data
      work.owner.call().then( results => {
        this.setState({ owner: results })
      })
      work.buyer.call().then( results => {
        this.setState({ buyer: results })
      })
      work.salePrice.call().then( results => {
        this.setState({ price: web3.fromWei(results, "ether").toNumber() })
      })
      work.description.call().then( results => {
        this.setState({ description: results })
      })

      this.setState({ set: true })
    })
  }

  render() {
    let form = (
      <div className="WorkInfo">
        Get Work Info:
        <Form onSubmit={submittedValues => this.getWorkInfo(submittedValues)}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="infoForm">
            <label htmlFor="workAddress">Work Address: </label>
            <Text field="workAddress" id="workAddress" />
            <button type="submit">Get Info</button>
          </form>
        )}
        </Form>
      </div>
    )
    if (this.state.set) {
      return ([
        form,
        [
          <div>
            Owner: {this.state.owner}
          </div>,
          <div>
            Description: {this.state.description}
          </div>,
          <div>
            Buyer: {this.state.buyer}
          </div>,
          <div>
            Price: {this.state.price}
          </div>,
        ],
      ])
    } else {
      return form;
    }
  }
}

export default WorkInfo
