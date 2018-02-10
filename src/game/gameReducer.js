import { PLAY, CHOICES } from './gameActions'

const initialState = {
  playerChoice: null,
  opponentChoice: null
}

const gameReducer = (state = initialState, action) => {
  let choices = [CHOICES.ROCK, CHOICES.PAPER, CHOICES.SCISSORS]

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
