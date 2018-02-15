import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    web3Instance: state.web3.web3Instance
  }
}

let Web3Status = ({ web3Instance }) => {
  let hasAddress = web3Instance && web3Instance.eth.accounts[0]
  let status = hasAddress ? 'Connected to web3 :)' : 'Not connected to web3 :('
  return(
    <p className="web3-status">
      { status }
    </p>
  )
}

export default connect(
  mapStateToProps,
  null
)(Web3Status)
