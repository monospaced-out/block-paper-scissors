import axios from 'axios'
import store from '../store'
import { UPDATE_RESULTS, RELOAD_RESULTS, updateResults } from './resultsActions'
import getChoiceFromBlockchain from '../util/getChoiceFromBlockchain'
import decryptChoice from '../util/decryptChoice'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const initialState = {
  results: []
}

const groupResultsByGame = (results) => {
  let games = []
  results.forEach(result => {
    let matchingGame = games.reduce((existingGame, game) => {
      if (existingGame) return existingGame
      let gameMatches = game.gameId === result.gameId
      let playerMatches = game.players.includes(result.player)
      let opponentMatches = game.players.includes(result.opponent)
      if (gameMatches && playerMatches && opponentMatches) {
        return game
      }
      return null
    }, null)
    if (matchingGame) {
      matchingGame.results.push(result)
    } else {
      games.push({
        gameId: result.gameId,
        players: [ result.player, result.opponent ],
        results: [ result ]
      })
    }
  })
  return games
}

const getChoicesForGame = (results, mapped) => {
  if (results.length === 0) return Promise.resolve(mapped)
  let result = results[0]
  return getChoiceFromBlockchain(result.player, result.opponent, result.gameId).then((choice) => {
    if (choice) {
      let decrypted = decryptChoice(choice, result.key)
      if (decrypted !== 'invalid') {
        mapped[result.player] = decrypted
        if (!mapped.players.includes[result.player]) {
          mapped.players.push({ address: result.player, name: result.name })
        }
      }
      return getChoicesForGame(results.slice(1), mapped)
    }
  })
}

const getChoicesForGames = (games) => {
  if (games.length === 0) return Promise.resolve([])
  let game = games[0]
  let mapped = { gameId: game.gameId, players: [] }
  return getChoicesForGame(game.results, mapped).then((choicesForGame) => {
    return getChoicesForGames(games.slice(1)).then(choicesForGames => {
      return Promise.resolve([...choicesForGames, choicesForGame])
    })
  })
}

const convertResults = (results) => {
  return getChoicesForGames(groupResultsByGame(results)).then(gameChoices => {
    return gameChoices
  })
}

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_RESULTS:
      axios.get(SERVER_URL + '/results').then((results) => {
        convertResults(results.data).then(converted => {
          store.dispatch(updateResults(converted))
        })
      })
      return state
    case UPDATE_RESULTS:
      return { ...state, results: action.results }
    default:
      return state
  }
}

export default resultsReducer
