import React from 'react'
import { connect } from 'react-redux'
import { CHOICES } from '../../ui/choiceButton/ChoiceButtonActions'

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
  return {}
}

let Readout = ({ playerChoice, opponentChoice }) => {
  let buttonChoice = 'rock'
  let outcome = winCheck(playerChoice, opponentChoice, CHOICES)
  return (
    <div>
      <div>Outcome: {outcome}</div>
      <div>Current Choice: {playerChoice}</div>
      <div>Opponent Choice: {opponentChoice}</div>
    </div>
  )
}

const ReadoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Readout)

export default ReadoutContainer

