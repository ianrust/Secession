import React, { Component } from 'react'

class Logo extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="Logo">
        <img src="/static/secession.png" />
      </div>
    );
  }
}

export default Logo
