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
    opponent: state.game.opponent
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

let GameMain = ({ playerChoice, opponentChoice, opponent }) => {
  let readout =
    <div>
      <Readout />
    </div>

  let buttons =
    <div>
      {
        CHOICES.map((choice, index) => {
          return (<ChoiceButton choice={choice} key={index} />)
        })
      }
    </div>

  let players = <Players />

  if (!opponent) {
    return players
  } else if (playerChoice && opponentChoice) {
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
