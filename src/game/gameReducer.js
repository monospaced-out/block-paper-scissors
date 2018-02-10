import { PLAY } from './gameActions'

const initialState = {
  playerChoice: null,
  opponentChoice: null
}

const choices = [
  'rock',
  'paper',
  'scissors'
]

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      let opponentChoice = choices[ Math.floor(Math.random() * choices.length) ]
      return { ...state, playerChoice: action.choice, opponentChoice }
      break
    default:
      return state
  }
}

export default gameReducer
