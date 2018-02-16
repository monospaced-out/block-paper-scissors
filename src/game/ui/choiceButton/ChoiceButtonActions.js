export const PLAY = 'PLAY'

export const ROCK = 'rock'
export const PAPER = 'paper'
export const SCISSORS = 'scissors'

export const CHOICES = [
  ROCK,
  PAPER,
  SCISSORS
]

export const CHOICE_IMAGE_MAPPING = {
  'rock': 'choices/block.svg',
  'paper': 'choices/paper.svg',
  'scissors': 'choices/scissors.svg'
}

export function play(choice, key) {
  return {
    type: PLAY,
    choice,
    key
  }
}
