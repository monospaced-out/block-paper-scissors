export const PLAY = 'PLAY'

export const ROCK = 'rock'
export const PAPER = 'paper'
export const SCISSORS = 'scissors'

export const CHOICES = [
  ROCK,
  PAPER,
  SCISSORS
]

export function play(choice, key) {
  return {
    type: PLAY,
    choice,
    key
  }
}
