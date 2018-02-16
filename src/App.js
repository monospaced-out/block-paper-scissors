import React, { Component } from 'react'
import { Link } from 'react-router'

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
            <Link to="/" className="pure-menu-heading"><span className="text-block">Block</span><span className="text-paper">Paper</span><span className="text-scissors-1">Scis</span><span className="text-scissors-2">sors</span></Link>
          </div>
          <div>
            <img src="block-paper-scissors.svg" className="logo" role="presentation" />
          </div>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
