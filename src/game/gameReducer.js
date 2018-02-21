import { PLAY } from './ui/choiceButton/ChoiceButtonActions'
import { RESET_GAME } from './ui/readout/ReadoutActions'
import { UPDATE_PLAYERS, ON_RECEIVE_INVITE, ON_RECEIVE_CANCEL_INVITE, ON_RECEIVE_ACCEPT_INVITE, ON_RECEIVE_REJECT_INVITE, ON_RECEIVE_COMMIT_CHOICE, ON_RECEIVE_REVEAL_CHOICE, SEND_INVITE, CANCEL_INVITE, ACCEPT_INVITE, REJECT_INVITE, SET_UPORT_NAME } from './ui/players/PlayerActions'
import { sendMessage, INVITE_MESSAGE, CANCEL_INVITE_MESSAGE, ACCEPT_INVITE_MESSAGE, REJECT_INVITE_MESSAGE, COMMIT_CHOICE_MESSAGE, REVEAL_CHOICE_MESSAGE } from '../api/Api'
import store from '../store'
import includesAddress from '../util/includesAddress'
import getChoiceFromBlockchain from '../util/getChoiceFromBlockchain'
import axios from 'axios'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const ON_RECEIVE_RECORDED_CHOICE = 'onReceiveRecordedChoice'

const initialState = {
  playerChoice: null,
  opponentChoice: null,
  opponentKey: null,
  players: [],
  incomingInvites: [],
  outgoingInvites: [],
  opponent: null,
  gameId: null,
  key: null
}

const filterInactive = (players, activePlayers) => {
  return players.filter(function(p) {
    return includesAddress(activePlayers, p)
  });
}

const getMyAddress = () => {
  let web3 = store.getState().web3.web3Instance
  return web3.eth.accounts[0]
}

const waitForChoiceFromBlockchain = (opponentAddress, gameId, cb) => {
  let myAddress = getMyAddress()
  getChoiceFromBlockchain(myAddress, opponentAddress, gameId, (choice) => {
    if (choice) {
      cb(choice)
    } else {
      setTimeout(() => {
        waitForChoiceFromBlockchain(opponentAddress, gameId, cb)
      }, 5000)
    }
  })
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      sendMessage({ recipient: state.opponent.address, message: COMMIT_CHOICE_MESSAGE, meta: null })
      if (state.opponentChoice) {
        sendMessage({ recipient: state.opponent.address, message: REVEAL_CHOICE_MESSAGE, meta: action.key })
      }
      return { ...state, playerChoice: action.choice, key: action.key }
    case RESET_GAME:
      return { ...state, playerChoice: null, opponentChoice: null, opponentKey: null, opponent: null, gameId: null, key: null }
    case UPDATE_PLAYERS:
      return { ...state,
        players: action.players,
        incomingInvites: filterInactive(state.incomingInvites, action.players),
        outgoingInvites: filterInactive(state.outgoingInvites, action.players)
      }
    case ON_RECEIVE_INVITE:
      return { ...state, incomingInvites: [ ...state.incomingInvites, action.sender ] }
    case ON_RECEIVE_CANCEL_INVITE:
      return { ...state, incomingInvites: state.incomingInvites.filter(i => i.address !== action.sender.address) }
    case ON_RECEIVE_ACCEPT_INVITE:
      if ( includesAddress(state.outgoingInvites, action.sender) ) {
        return { ...state, outgoingInvites: [], opponent: action.sender, gameId: action.gameId }
      }
      return state
    case ON_RECEIVE_COMMIT_CHOICE:
      waitForChoiceFromBlockchain(state.opponent.address, state.gameId, (choice) => {
        store.dispatch({ type: ON_RECEIVE_RECORDED_CHOICE, choice })
      })
      return state
    case ON_RECEIVE_RECORDED_CHOICE:
      if (state.playerChoice && action.choice) {
        sendMessage({ recipient: state.opponent.address, message: REVEAL_CHOICE_MESSAGE, meta: state.key })
        axios.post(SERVER_URL + '/save-result', { key: state.key, player: getMyAddress(), gameId: state.gameId })
      }
      return { ...state, opponentChoice: action.choice }
    case ON_RECEIVE_REVEAL_CHOICE:
      if (!state.opponentChoice) {
        waitForChoiceFromBlockchain(state.opponent.address, state.gameId, (choice) => {
          store.dispatch({ type: ON_RECEIVE_RECORDED_CHOICE, choice })
        })
      }
      if (action.sender.address === state.opponent.address) {
        return { ...state, opponentKey: action.key }
      }
      return state
    case ON_RECEIVE_REJECT_INVITE:
      return { ...state, outgoingInvites: state.outgoingInvites.filter(i => i.address !== action.sender.address) }
    case SEND_INVITE:
      sendMessage({ recipient: action.recipient.address, message: INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: [ ...state.outgoingInvites, action.recipient ] }
    case CANCEL_INVITE:
      sendMessage({ recipient: action.recipient.address, message: CANCEL_INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: state.outgoingInvites.filter((i => i.address !== action.recipient.address)) }
    case ACCEPT_INVITE:
      let gameId = String(Date.now())
      sendMessage({ recipient: action.recipient.address, message: ACCEPT_INVITE_MESSAGE, meta: gameId })
      return { ...state,
        outgoingInvites: [],
        incomingInvites: state.incomingInvites.filter((i => i.address !== action.recipient.address)),
        opponent: action.recipient,
        gameId: gameId
      }
    case REJECT_INVITE:
      sendMessage({ recipient: action.recipient.address, message: REJECT_INVITE_MESSAGE, meta: null })
      return { ...state, incomingInvites: state.incomingInvites.filter((i => i.address !== action.recipient.address)) }
    case SET_UPORT_NAME:
      return { ...state, uportName: action.name }
    default:
      return state
  }
}

export default gameReducer
