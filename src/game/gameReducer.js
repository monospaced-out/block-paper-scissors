import { PLAY, CHOICES } from './ui/choiceButton/ChoiceButtonActions'
import { RESET_GAME } from './ui/readout/ReadoutActions'
import { UPDATE_PLAYERS, ON_RECEIVE_INVITE, ON_RECEIVE_CANCEL_INVITE, ON_RECEIVE_ACCEPT_INVITE, ON_RECEIVE_REJECT_INVITE, SEND_INVITE, CANCEL_INVITE, ACCEPT_INVITE, REJECT_INVITE } from './ui/players/PlayerActions'
import { sendMessage, INVITE_MESSAGE, CANCEL_INVITE_MESSAGE, ACCEPT_INVITE_MESSAGE, REJECT_INVITE_MESSAGE } from '../api/Api'

const initialState = {
  playerChoice: null,
  opponentChoice: null,
  players: [],
  incomingInvites: [], // TODO: filter out disconnected players
  outgoingInvites: [],
  opponent: null
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      let opponentChoice = CHOICES[ Math.floor(Math.random() * CHOICES.length) ]
      return { ...state, playerChoice: action.choice, opponentChoice }
    case RESET_GAME:
      return { ...state, playerChoice: null, opponentChoice: null }
    case UPDATE_PLAYERS:
      return { ...state, players: action.players }
    case ON_RECEIVE_INVITE:
      return { ...state, incomingInvites: [ ...state.incomingInvites, action.sender ] }
    case ON_RECEIVE_CANCEL_INVITE:
      return { ...state, incomingInvites: state.incomingInvites.filter(i => i !== action.sender) }
    case ON_RECEIVE_ACCEPT_INVITE:
      if ( state.outgoingInvites.includes(action.sender) ) {
        return { ...state, outgoingInvites: [], opponent: action.sender }
      }
      return state
    case ON_RECEIVE_REJECT_INVITE:
      return { ...state, outgoingInvites: state.outgoingInvites.filter(i => i !== action.sender) }
    case SEND_INVITE:
      sendMessage({ recipient: action.recipient, message: INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: state.outgoingInvites.concat([action.recipient]) }
    case CANCEL_INVITE:
      sendMessage({ recipient: action.recipient, message: CANCEL_INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: state.outgoingInvites.filter((i => i !== action.recipient)) }
    case ACCEPT_INVITE:
      sendMessage({ recipient: action.recipient, message: ACCEPT_INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: [], incomingInvites: state.incomingInvites.filter((i => i !== action.recipient)), opponent: action.recipient }
    case REJECT_INVITE:
      sendMessage({ recipient: action.recipient, message: REJECT_INVITE_MESSAGE, meta: null })
      return { ...state, incomingInvites: state.incomingInvites.filter((i => i !== action.recipient)) }
    default:
      return state
  }
}

export default gameReducer
