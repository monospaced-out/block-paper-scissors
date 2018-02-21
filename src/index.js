import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { subscribeToAddresses, subscribeToMessages, INVITE_MESSAGE, CANCEL_INVITE_MESSAGE, ACCEPT_INVITE_MESSAGE, REJECT_INVITE_MESSAGE, COMMIT_CHOICE_MESSAGE, REVEAL_CHOICE_MESSAGE } from './api/Api'
import { setUportName, updatePlayers, onReceiveInvite, onReceiveCancelInvite, onReceiveAcceptInvite, onReceiveRejectInvite, onReceiveCommitChoice, onReceiveRevealChoice } from './game/ui/players/PlayerActions'
import getWeb3 from './util/web3/getWeb3'
import { Connect } from 'uport-connect'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Results from './layouts/results/Results'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

const connectToPlayers = (myAddress, myName) => {
  subscribeToAddresses(myAddress, myName, addresses => {
    let notIncludingMyAddress = addresses.filter( ( { address } ) => {
      return address !== myAddress
    })
    store.dispatch(updatePlayers(notIncludingMyAddress))
  })
}

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
  let web3 = store.getState().web3.web3Instance
  let myAddress = web3.eth.accounts[0]
  if (myAddress) {
    subscribeToMessages(({sender, message, meta}) => {
      switch (message) {
        case INVITE_MESSAGE:
          store.dispatch(onReceiveInvite(sender))
          break
        case CANCEL_INVITE_MESSAGE:
          store.dispatch(onReceiveCancelInvite(sender))
          break
        case ACCEPT_INVITE_MESSAGE:
          let gameId = meta
          store.dispatch(onReceiveAcceptInvite(sender, gameId))
          break
        case REJECT_INVITE_MESSAGE:
          store.dispatch(onReceiveRejectInvite(sender))
          break
        case COMMIT_CHOICE_MESSAGE:
          store.dispatch(onReceiveCommitChoice(sender))
          break
        case REVEAL_CHOICE_MESSAGE:
          let key = meta
          store.dispatch(onReceiveRevealChoice(sender, key))
          break
        default:
          console.log('invalid message', message)
      }
    })

    let uport = new Connect('BlockPaperScissors')
    uport.requestCredentials().then((credentials) => {
      let myName = credentials.name
      store.dispatch(setUportName(myName))
      connectToPlayers(myAddress, myName)
    }).catch(() => {
      connectToPlayers(myAddress, null)
    })
  }
})
.catch((err) => {
  console.log('Error in web3 initialization.', err)
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="/results" component={App}>
          <IndexRoute component={Results} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
