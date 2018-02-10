import React, { Component } from 'react'
import { connect } from 'react-redux'
import { play, CHOICES } from './gameActions'
import store from '../store'

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
  let { ROCK, PAPER, SCISSORS } = CHOICES
  return(
    <div>
      <div>Current Choice: {playerChoice}</div>
      <div>Opponent Choice: {opponentChoice}</div>
      <button onClick={() => onChoiceClick(ROCK)}>Rock</button>
      <button onClick={() => onChoiceClick(PAPER)}>Paper</button>
      <button onClick={() => onChoiceClick(SCISSORS)}>Scissors</button>
    </div>
  )
}

Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default Game
