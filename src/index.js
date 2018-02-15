import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import { subscribeToAddresses, subscribeToMessages, INVITE_MESSAGE, CANCEL_INVITE_MESSAGE, ACCEPT_INVITE_MESSAGE, REJECT_INVITE_MESSAGE } from './api/Api'
import { updatePlayers, onReceiveInvite, onReceiveCancelInvite, onReceiveAcceptInvite, onReceiveRejectInvite } from './game/ui/players/PlayerActions'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
  let web3 = store.getState().web3.web3Instance
  let myAddress = web3.eth.accounts[0]
  if (myAddress) {
    subscribeToAddresses(myAddress, addresses => {
      let notIncludingMyAddress = addresses.filter( address => {
        return address !== myAddress
      })
      store.dispatch(updatePlayers(notIncludingMyAddress))
    })
    subscribeToMessages(({sender, message, meta}) => {
      switch (message) {
        case INVITE_MESSAGE:
          store.dispatch(onReceiveInvite(sender))
          break
        case CANCEL_INVITE_MESSAGE:
          store.dispatch(onReceiveCancelInvite(sender))
          break
        case ACCEPT_INVITE_MESSAGE:
          store.dispatch(onReceiveAcceptInvite(sender))
          break
        case REJECT_INVITE_MESSAGE:
          store.dispatch(onReceiveRejectInvite(sender))
          break
        default:
          console.log('invalid message', message)
      }
    })
  }
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
