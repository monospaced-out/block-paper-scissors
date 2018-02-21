import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import web3Reducer from './util/web3/web3Reducer'
import gameReducer from './game/gameReducer'
import resultsReducer from './results/resultsReducer'

const reducer = combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  game: gameReducer,
  results: resultsReducer
})

export default reducer
