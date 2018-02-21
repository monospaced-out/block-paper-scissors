const hash = require('hash.js')

import { ROCK, PAPER, SCISSORS } from '../game/ui/choiceButton/ChoiceButtonActions'

export default (choice, key) => {
  let rockEncryption = hash.sha256().update(ROCK + key).digest('hex')
  let paperEncryption = hash.sha256().update(PAPER + key).digest('hex')
  let scissorsEncryption = hash.sha256().update(SCISSORS + key).digest('hex')
  if (rockEncryption === choice) {
    return ROCK
  } else if (paperEncryption === choice) {
    return PAPER
  } else if (scissorsEncryption === choice) {
    return SCISSORS
  }
  return 'invalid'
}
