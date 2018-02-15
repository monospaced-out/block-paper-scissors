import React, { Component } from 'react'
import GameMain from '../../ui/main/GameMain'
import Players from '../../ui/players/Players'

class Game extends Component {
  render() {
    return(
      <div>
        <GameMain />
        <Players />
      </div>
    )
  }
}

export default Game
