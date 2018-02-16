import React from 'react'
import { connect } from 'react-redux'
import Readout from '../readout/Readout'
import ChoiceButton from '../choiceButton/ChoiceButton'
import { CHOICES } from '../choiceButton/ChoiceButtonActions'
import Players from '../../ui/players/Players'

const mapStateToProps = (state) => {
  return {
    playerChoice: state.game.playerChoice,
    opponentChoice: state.game.opponentChoice,
    opponentKey: state.game.opponentKey,
    opponent: state.game.opponent
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

let GameMain = ({ playerChoice, opponentChoice, opponentKey, opponent }) => {
  let readout =
    <div>
      <Readout />
    </div>

  let buttons =
    <div className="choice-button-container">
      {
        CHOICES.map((choice, index) => {
          return (<ChoiceButton choice={choice} key={index} />)
        })
      }
    </div>

  let players = <Players />

  if (!opponent) {
    return players
  } else if (playerChoice) {
    return readout
  } else {
    return buttons
  }
}

const GameMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameMain)

export default GameMainContainer
