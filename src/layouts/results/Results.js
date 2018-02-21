import React from 'react'
import { connect } from 'react-redux'
import winCheck from '../../util/winCheck'

const mapStateToProps = (state) => {
  return {
    results: state.results.results
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

let Results = ({ results }) => {
  return (
    <main className="container">
      {
        results.map((result, index) => {
          if (result.players && result.players.length >= 2) {
            let player1 = result.players[0]
            let player2 = result.players[1]
            let choice1 = result[player1]
            let choice2 = result[player2]
            let player1Class = winCheck(choice1, choice2).search('WIN') !== -1 ? 'win' : null
            let player2Class = winCheck(choice2, choice1).search('WIN') !== -1 ? 'win' : null
            return (
              <div key={index}>
                <span className={player1Class}>{player1} ({choice1})</span> vs <span className={player2Class}>{player1} ({choice2})</span>
              </div>
            )
          } else {
            return null
          }
        })
      }
    </main>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
