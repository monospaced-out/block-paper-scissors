import React from 'react'
import { connect } from 'react-redux'
import { play, CHOICE_IMAGE_MAPPING } from './ChoiceButtonActions'
import store from '../../../store'
import BlockPaperScissorsContract from '../../../../build/contracts/BlockPaperScissors.json'

const CONTRACT_ADDRESS = process.env.REACT_APP_BLOCK_PAPER_SCISSORS_CONTRACT

const contract = require('truffle-contract')
const hash = require('hash.js')

const postPlayToBlockchain = (opponentAddress, choice, gameId, cb) => {
  let web3 = store.getState().web3.web3Instance
  let myAddress = web3.eth.accounts[0]

  let blockPaperScissors = contract(BlockPaperScissorsContract)
  blockPaperScissors.setProvider(web3.currentProvider)
  let deployed = CONTRACT_ADDRESS ? blockPaperScissors.at(CONTRACT_ADDRESS) : blockPaperScissors.deployed()

  // Get current ethereum wallet.
  deployed.then(function(blockPaperScissorsInstance) {
    blockPaperScissorsInstance.createPlay(opponentAddress, choice, gameId, {from: myAddress}).then(cb)
  })
}

const encryptChoice = (choice, key) => {
  return hash.sha256().update(choice + key).digest('hex')
}

const mapStateToProps = (state, ownProps) => {
  return {
    choice: ownProps.choice,
    opponent: state.game.opponent,
    gameId: state.game.gameId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChoiceClick: (opponentAddress, choice, gameId) => {
      let key = Date.now()
      let encryptedChoice = encryptChoice(choice, key)
      postPlayToBlockchain(opponentAddress, encryptedChoice, gameId)
      dispatch(play(choice, key))
    }
  }
}

let ChoiceButton = ({ onChoiceClick, opponent, choice, gameId }) => {
  let src = CHOICE_IMAGE_MAPPING[choice]
  return (
    <img className="choice" onClick={() => onChoiceClick(opponent.address, choice, gameId)} src={src} alt={choice} />
  )
}

const ChoiceButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceButton)

export default ChoiceButtonContainer
