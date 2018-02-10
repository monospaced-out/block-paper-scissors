export const PLAY = 'PLAY'

export function play(choice) {
  return {
    type: PLAY,
    choice
  }
}
