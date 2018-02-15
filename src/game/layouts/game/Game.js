import React, { Component } from 'react'
import GameMain from '../../ui/main/GameMain'
import Players from '../../ui/players/Players'
import Web3Status from '../../ui/web3Status/Web3Status'

class Game extends Component {
  render() {
    return(
      <div>
        <GameMain />
        <Players />
        <Web3Status />
      </div>
    )
  }
}

export default Game
