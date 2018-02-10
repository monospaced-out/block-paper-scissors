import React, { Component } from 'react'
import Game from '../../game/layouts/game/Game'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Game />
          </div>
        </div>
      </main>
    )
  }
}

export default Home
