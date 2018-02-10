import React from 'react'
import { connect } from 'react-redux'
import { play, CHOICES } from './gameActions'

const mapStateToProps = (state, ownProps) => {
  return {
    playerChoice: state.game.playerChoice,
    opponentChoice: state.game.opponentChoice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChoiceClick: choice => {
      dispatch(play(choice))
    }
  }
}

let Game = ({ onChoiceClick, playerChoice, opponentChoice }) => {
  let [ rock, paper, scissors ] = CHOICES
  return(
    <div>
      <div>Current Choice: {playerChoice}</div>
      <div>Opponent Choice: {opponentChoice}</div>
      <button onClick={() => onChoiceClick(rock)}>Rock</button>
      <button onClick={() => onChoiceClick(paper)}>Paper</button>
      <button onClick={() => onChoiceClick(scissors)}>Scissors</button>
    </div>
  )
}

Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default Game
