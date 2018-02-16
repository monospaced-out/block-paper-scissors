import React from 'react'
import { connect } from 'react-redux'
import { CHOICES, ROCK, PAPER, SCISSORS } from '../../ui/choiceButton/ChoiceButtonActions'
import { resetGame } from './ReadoutActions'

const hash = require('hash.js')

const winCheck = (playerChoice, opponentChoice, CHOICES) => {
  let playerChoiceIndex = CHOICES.indexOf(playerChoice)
  let opponentChoiceIndex = CHOICES.indexOf(opponentChoice)
  let mod = CHOICES.length

  if (playerChoiceIndex === (opponentChoiceIndex + 1) % mod)
    return 'win'
  else if (opponentChoiceIndex === (playerChoiceIndex + 1) % mod) {
    return 'lose'
  } else if (opponentChoiceIndex === playerChoiceIndex) {
    return 'tie'
  } else {
    return 'invalid'
  }
}

const decryptChoice = (choice, key) => {
  let rockEncryption = hash.sha256().update(ROCK + key).digest('hex')
  let paperEncryption = hash.sha256().update(PAPER + key).digest('hex')
  let scissorsEncryption = hash.sha256().update(SCISSORS + key).digest('hex')
  if (rockEncryption === choice) {
    return ROCK
  } else if (paperEncryption === choice) {
    return PAPER
  } else if (scissorsEncryption === choice) {
    return SCISSORS
  }
  return 'invalid'
}

const mapStateToProps = (state, ownProps) => {
  return {
    playerChoice: state.game.playerChoice,
    opponentChoice: state.game.opponentChoice,
    opponentKey: state.game.opponentKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetGame() {
      dispatch(resetGame())
    }
  }
}

let Readout = ({ playerChoice, opponentChoice, opponentKey, resetGame }) => {
  let decryptedChoice = decryptChoice(opponentChoice, opponentKey)
  let outcome = winCheck(playerChoice, decryptedChoice, CHOICES)
  return (
    <div>
      <div>Outcome: {outcome}</div>
      <div>My Choice: {playerChoice}</div>
      <div>Opponent Choice: {decryptedChoice}</div>
      <button onClick={() => resetGame()}>New Game</button>
    </div>
  )
}

const ReadoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Readout)

export default ReadoutContainer
