export const PLAY = 'PLAY'

export const CHOICES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors'
}

export function play(choice) {
  return {
    type: PLAY,
    choice
  }
}
