import React from 'react'
import { connect } from 'react-redux'
import { play } from './ChoiceButtonActions'
import store from '../../../store'
import BlockPaperScissorsContract from '../../../../build/contracts/BlockPaperScissors.json'

const contract = require('truffle-contract')

const postPlayToBlockchain = (opponent, choice, gameId, cb) => {
  let web3 = store.getState().web3.web3Instance

  const blockPaperScissors = contract(BlockPaperScissorsContract)
  blockPaperScissors.setProvider(web3.currentProvider)

  // Get current ethereum wallet.
  web3.eth.getCoinbase((error, coinbase) => {
    blockPaperScissors.deployed().then(function(blockPaperScissorsInstance) {
      blockPaperScissorsInstance.createPlay(opponent, choice, gameId, {from: coinbase}).then(cb)
    })
  })
}

const encryptChoice = (choice, key) => {
  return choice // TODO
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
    onChoiceClick: (opponent, choice, gameId) => {
      let key = Date.now()
      let encryptedChoice = encryptChoice(choice, key)
      postPlayToBlockchain(opponent, encryptedChoice, gameId, () => {
        dispatch(play(choice))
      })
    }
  }
}

let ChoiceButton = ({ onChoiceClick, opponent, choice, gameId }) => {
  return (
    <button onClick={() => onChoiceClick(opponent, choice, gameId)}>{choice}</button>
  )
}

const ChoiceButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceButton)

export default ChoiceButtonContainer
