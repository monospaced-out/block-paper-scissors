import React from 'react'
import { connect } from 'react-redux'
import Readout from '../readout/Readout'
import ChoiceButton from '../choiceButton/ChoiceButton'
import { CHOICES } from '../choiceButton/ChoiceButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {
    playerChoice: state.game.playerChoice,
    opponentChoice: state.game.opponentChoice
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

let GameMain = ({ playerChoice, opponentChoice }) => {
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

  if (playerChoice && opponentChoice) {
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
