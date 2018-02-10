import { PLAY, CHOICES } from './ui/choiceButton/ChoiceButtonActions'

const initialState = {
  playerChoice: null,
  opponentChoice: null
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      let opponentChoice = CHOICES[ Math.floor(Math.random() * CHOICES.length) ]
      return { ...state, playerChoice: action.choice, opponentChoice }
    default:
      return state
  }
}

export default gameReducer
