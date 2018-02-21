import React from 'react'
import { connect } from 'react-redux'
import { CHOICE_IMAGE_MAPPING } from '../../ui/choiceButton/ChoiceButtonActions'
import { resetGame } from './ReadoutActions'
import decryptChoice from '../../../util/decryptChoice'
import winCheck from '../../../util/winCheck'

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
  let outcome = hasOpponentChoice ? winCheck(playerChoice, opponentChoiceDisplay) : ''
  let newGameButton
  if (hasOpponentChoice) {
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
