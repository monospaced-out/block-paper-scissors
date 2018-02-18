import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    web3Instance: state.web3.web3Instance
  }
}

let Web3Status = ({ web3Instance }) => {
  let hasAddress = web3Instance && web3Instance.eth.accounts[0]
  let status = hasAddress ? 'You are connected to web3. :)' : 'You are not connected to web3. :('
  return(
    <div className="footer">
      <p>
        This is currently running on the Rinkeby testnet. { status }
      </p>
      <p>
        <a href="https://github.com/monospaced-out/block-paper-scissors" target="_blank">github.com/monospaced-out/block-paper-scissors</a>
      </p>
    </div>
  )
}

export default connect(
  mapStateToProps,
  null
)(Web3Status)
