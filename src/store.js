import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import reducer from './reducer'
import { reloadResults } from './results/resultsActions'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware
    )
  )
)

const history = syncHistoryWithStore(browserHistory, store)

const initialLoadResults = () => {
  if (store.getState().web3.web3Instance) {
    store.dispatch(reloadResults())
  } else {
    setTimeout(() => {
      initialLoadResults()
    }, 1000)
  }
}

history.listen(location => {
  if (location.pathname === '/results') {
    initialLoadResults()
  }
})

export default store
