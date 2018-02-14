import { PLAY, CHOICES } from './ui/choiceButton/ChoiceButtonActions'
import { RESET_GAME } from './ui/readout/ReadoutActions'

const initialState = {
  playerChoice: null,
  opponentChoice: null
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      let opponentChoice = CHOICES[ Math.floor(Math.random() * CHOICES.length) ]
      return { ...state, playerChoice: action.choice, opponentChoice }
    case RESET_GAME:
      return { ...state, playerChoice: null, opponentChoice: null }
    default:
      return state
  }
}

export default gameReducer
