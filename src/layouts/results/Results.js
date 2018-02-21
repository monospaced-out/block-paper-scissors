import React from 'react'
import { connect } from 'react-redux'
import winCheck from '../../util/winCheck'
import { CHOICE_IMAGE_MAPPING } from '../../game/ui/choiceButton/ChoiceButtonActions'

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
          if (result && result.players && result.players.length >= 2) {
            let player1 = result.players[0]
            let player2 = result.players[1]
            let choice1 = result[player1.address]
            let choice2 = result[player2.address]
            let player1Class = winCheck(choice1, choice2).search('WIN') !== -1 ? 'player win' : 'player'
            let player2Class = winCheck(choice2, choice1).search('WIN') !== -1 ? 'player win' : 'player'
            let name1 = player1.name || 'anonymous'
            let name2 = player2.name || 'anonymous'
            let src1 = CHOICE_IMAGE_MAPPING[choice1]
            let src2 = CHOICE_IMAGE_MAPPING[choice2]
            return (
              <div key={index} className="game-result">
                <div className={player1Class}>
                  <div>{name1}</div>
                  <div>{player1.address}</div>
                  <img src={src1} alt={choice1} />
                </div>
                <div className={player2Class}>
                  <div>{name2}</div>
                  <div>{player2.address}</div>
                  <img src={src2} alt={choice2} />
                </div>
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
