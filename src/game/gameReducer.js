import { PLAY, CHOICES } from './ui/choiceButton/ChoiceButtonActions'
import { RESET_GAME } from './ui/readout/ReadoutActions'
import { UPDATE_PLAYERS, ON_RECEIVE_INVITE, ON_RECEIVE_CANCEL_INVITE, ON_RECEIVE_ACCEPT_INVITE, ON_RECEIVE_REJECT_INVITE, ON_RECEIVE_COMMIT_CHOICE, ON_RECEIVE_REVEAL_CHOICE, SEND_INVITE, CANCEL_INVITE, ACCEPT_INVITE, REJECT_INVITE } from './ui/players/PlayerActions'
import { sendMessage, INVITE_MESSAGE, CANCEL_INVITE_MESSAGE, ACCEPT_INVITE_MESSAGE, REJECT_INVITE_MESSAGE, COMMIT_CHOICE_MESSAGE, REVEAL_CHOICE_MESSAGE } from '../api/Api'
import store from '../store'
import BlockPaperScissorsContract from '../../build/contracts/BlockPaperScissors.json'

const contract = require('truffle-contract')

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
    return activePlayers.indexOf(p) !== -1;
  });
}

const waitForTransactionFrom = (from, cb) => {
  let web3 = store.getState().web3.web3Instance
  let filter = web3.eth.filter('latest')
  filter.watch(function(err, blockHash) {
    web3.eth.getBlock(blockHash, false, (err, confirmedBlock) => {
      if (confirmedBlock.transactions.length > 0) {
        confirmedBlock.transactions.forEach(function(txId) {
          web3.eth.getTransaction(txId, (err, transaction) => {
            if (transaction.from === from) {
              cb()
              filter.stopWatching()
            }
          })
        })
      }
    })
  })
}

const getChoiceFromBlockchain = (opponent, gameId, cb) => {
  let web3 = store.getState().web3.web3Instance
  let myAddress = web3.eth.accounts[0]
  const blockPaperScissors = contract(BlockPaperScissorsContract)
  blockPaperScissors.setProvider(web3.currentProvider)
  blockPaperScissors.deployed().then(function(blockPaperScissorsInstance) {
    blockPaperScissorsInstance.getChoice(opponent, myAddress, gameId, {from: myAddress}).then((choice) => {
      cb(choice)
    })
  })
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      sendMessage({ recipient: state.opponent, message: COMMIT_CHOICE_MESSAGE, meta: null })
      if (state.opponentChoice) {
        sendMessage({ recipient: state.opponent, message: REVEAL_CHOICE_MESSAGE, meta: action.key })
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
      return { ...state, incomingInvites: state.incomingInvites.filter(i => i !== action.sender) }
    case ON_RECEIVE_ACCEPT_INVITE:
      if ( state.outgoingInvites.includes(action.sender) ) {
        return { ...state, outgoingInvites: [], opponent: action.sender, gameId: action.gameId }
      }
      return state
    case ON_RECEIVE_COMMIT_CHOICE:
      waitForTransactionFrom(state.opponent, () => {
        // load current, up-to-date state because we don't know when this will run
        let currentState = store.getState()
        getChoiceFromBlockchain(currentState.game.opponent, currentState.game.gameId, (choice) => {
          store.dispatch({ type: ON_RECEIVE_RECORDED_CHOICE, choice })
        })
      })
      return state
    case ON_RECEIVE_RECORDED_CHOICE:
      if (state.playerChoice && action.choice) {
        sendMessage({ recipient: state.opponent, message: REVEAL_CHOICE_MESSAGE, meta: state.key })
      }
      return { ...state, opponentChoice: action.choice }
    case ON_RECEIVE_REVEAL_CHOICE:
      if (!state.opponentChoice) {
        getChoiceFromBlockchain(state.opponent, state.gameId, (choice) => {
          store.dispatch({ type: ON_RECEIVE_RECORDED_CHOICE, choice })
        })
      }
      if (action.sender === state.opponent) {
        return { ...state, opponentKey: action.key }
      }
      return state
    case ON_RECEIVE_REJECT_INVITE:
      return { ...state, outgoingInvites: state.outgoingInvites.filter(i => i !== action.sender) }
    case SEND_INVITE:
      sendMessage({ recipient: action.recipient, message: INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: [ ...state.outgoingInvites, action.recipient ] }
    case CANCEL_INVITE:
      sendMessage({ recipient: action.recipient, message: CANCEL_INVITE_MESSAGE, meta: null })
      return { ...state, outgoingInvites: state.outgoingInvites.filter((i => i !== action.recipient)) }
    case ACCEPT_INVITE:
      let gameId = String(Date.now())
      sendMessage({ recipient: action.recipient, message: ACCEPT_INVITE_MESSAGE, meta: gameId })
      return { ...state,
        outgoingInvites: [],
        incomingInvites: state.incomingInvites.filter((i => i !== action.recipient)),
        opponent: action.recipient,
        gameId: gameId
      }
    case REJECT_INVITE:
      sendMessage({ recipient: action.recipient, message: REJECT_INVITE_MESSAGE, meta: null })
      return { ...state, incomingInvites: state.incomingInvites.filter((i => i !== action.recipient)) }
    default:
      return state
  }
}

export default gameReducer
