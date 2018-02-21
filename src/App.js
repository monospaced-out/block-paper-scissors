import React, { Component } from 'react'
import { Link } from 'react-router'
import Web3Status from './game/ui/web3Status/Web3Status'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <div>
            <Link to="/" className="pure-menu-heading">
              <div className="logo-text">
                <span className="text-block">Block</span><span className="text-paper">Paper</span><span className="text-scissors-1">Scis</span><span className="text-scissors-2">sors</span>
              </div>
              <div>
                <img src="block-paper-scissors.svg" className="logo" role="presentation" />
              </div>
            </Link>
          </div>
        </nav>

        <div className="nav-2">
          <Link to="/" className="btn">Play</Link>
          <Link to="/results" className="btn">Archives</Link>
        </div>

        {this.props.children}

        <Web3Status />
      </div>
    );
  }
}

export default App
