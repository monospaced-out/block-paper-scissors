import React from 'react'
import { connect } from 'react-redux'
import { play } from './ChoiceButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {
    choice: ownProps.choice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChoiceClick: choice => {
      dispatch(play(choice))
    }
  }
}

let ChoiceButton = ({ onChoiceClick, choice }) => {
  return (
    <button onClick={() => onChoiceClick(choice)}>{choice}</button>
  )
}

const ChoiceButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceButton)

export default ChoiceButtonContainer

