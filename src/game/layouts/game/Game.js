import React, { Component } from 'react'
import ChoiceButton from '../../ui/choiceButton/ChoiceButton'
import Readout from '../../ui/readout/Readout'
import { CHOICES } from '../../ui/choiceButton/ChoiceButtonActions'

class Game extends Component {
  render() {
    return(
      <div>
        <Readout />
        {
          CHOICES.map((choice, index) => {
            return (<ChoiceButton choice={choice} key={index} />)
          })  
        }
      </div>
    )
  }
}

export default Game
