import { CHOICES } from '../game/ui/choiceButton/ChoiceButtonActions'

export default (playerChoice, opponentChoice) => {
  let playerChoiceIndex = CHOICES.indexOf(playerChoice)
  let opponentChoiceIndex = CHOICES.indexOf(opponentChoice)
  let mod = CHOICES.length

  if (playerChoiceIndex === (opponentChoiceIndex + 1) % mod)
    return 'YOU WIN'
  else if (opponentChoiceIndex === (playerChoiceIndex + 1) % mod) {
    return 'YOU LOSE'
  } else if (opponentChoiceIndex === playerChoiceIndex) {
    return 'IT\'S A DRAW'
  } else {
    return 'well fuck'
  }
}
