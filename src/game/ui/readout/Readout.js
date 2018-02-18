import React from 'react'
import { connect } from 'react-redux'
import { CHOICES, CHOICE_IMAGE_MAPPING, ROCK, PAPER, SCISSORS } from '../../ui/choiceButton/ChoiceButtonActions'
import { resetGame } from './ReadoutActions'

const hash = require('hash.js')

const winCheck = (playerChoice, opponentChoice, CHOICES) => {
  let playerChoiceIndex = CHOICES.indexOf(playerChoice)
  let opponentChoiceIndex = CHOICES.indexOf(opponentChoice)
  let mod = CHOICES.length

  if (playerChoiceIndex === (opponentChoiceIndex + 1) % mod)
    return 'YOU WIN'
  else if (opponentChoiceIndex === (playerChoiceIndex + 1) % mod) {
    return 'YOU LOSE'
  } else if (opponentChoiceIndex === playerChoiceIndex) {
    return 'IT\'S A DRAW'
  } else {
    return 'well fuck'
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
  let hasOpponentChoice = opponentKey && opponentChoice
  let decryptedChoice = decryptChoice(opponentChoice, opponentKey)
  let opponentChoiceDisplay = opponentChoice ? decryptedChoice : '...'
  let outcome = hasOpponentChoice ? winCheck(playerChoice, opponentChoiceDisplay, CHOICES) : ''
  let newGameButton
  if (opponentChoice) {
    newGameButton = <span className="btn" onClick={() => resetGame()}>New Game</span>
  }
  let myImage = <img src={CHOICE_IMAGE_MAPPING[playerChoice]} alt={playerChoice} />
  let loadingSpinner = <div className="spinner"></div>
  let theirImage = hasOpponentChoice ? <img src={CHOICE_IMAGE_MAPPING[decryptedChoice]} alt={opponentChoice} /> : loadingSpinner
  return (
    <div>
      <div className="readout-choice-container">
        <div className="readout-choice">
          {myImage}
        </div>
        <div className="readout-choice">
          {theirImage}
        </div>
      </div>
      <div className="outcome">
        {outcome}
      </div>
      <div className="new-game-container">
        {newGameButton}
      </div>
    </div>
  )
}

const ReadoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Readout)

export default ReadoutContainer
