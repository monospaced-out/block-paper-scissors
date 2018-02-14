import React from 'react'
import { connect } from 'react-redux'
import { CHOICES } from '../../ui/choiceButton/ChoiceButtonActions'
import { resetGame } from './ReadoutActions'

const winCheck = (playerChoice, opponentChoice, CHOICES) => {
  let playerScore = CHOICES.indexOf(playerChoice)
  let opponentScore = CHOICES.indexOf(opponentChoice)
  let mod = CHOICES.length

  if (playerScore === (opponentScore + 1) % mod)
    return 'win'
  else if (opponentScore === (playerScore + 1) % mod) {
    return 'lose'
  } else {
    return 'tie'
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playerChoice: state.game.playerChoice,
    opponentChoice: state.game.opponentChoice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetGame() {
      dispatch(resetGame())
    }
  }
}

let Readout = ({ playerChoice, opponentChoice, resetGame }) => {
  let outcome = winCheck(playerChoice, opponentChoice, CHOICES)
  return (
    <div>
      <div>Outcome: {outcome}</div>
      <div>Current Choice: {playerChoice}</div>
      <div>Opponent Choice: {opponentChoice}</div>
      <button onClick={() => resetGame()}>New Game</button>
    </div>
  )
}

const ReadoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Readout)

export default ReadoutContainer
