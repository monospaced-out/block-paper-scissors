import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    players: state.game.players
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

let Players = ({ players }) => {
  let addresses = players.map((player, index) => {
    return <div key={index}>{ player }</div>
  })
  return(
    <div>
      { addresses }
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players)
