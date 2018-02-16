export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'
export const ON_RECEIVE_INVITE = 'ON_RECEIVE_INVITE'
export const ON_RECEIVE_CANCEL_INVITE = 'ON_RECEIVE_CANCEL_INVITE'
export const ON_RECEIVE_ACCEPT_INVITE = 'ON_RECEIVE_ACCEPT_INVITE'
export const ON_RECEIVE_REJECT_INVITE = 'ON_RECEIVE_REJECT_INVITE'
export const ON_RECEIVE_COMMIT_CHOICE = 'ON_RECEIVE_COMMIT_CHOICE'
export const ON_RECEIVE_REVEAL_CHOICE = 'ON_RECEIVE_REVEAL_CHOICE'
export const SEND_INVITE = 'SEND_INVITE'
export const CANCEL_INVITE = 'CANCEL_INVITE'
export const ACCEPT_INVITE = 'ACCEPT_INVITE'
export const REJECT_INVITE = 'REJECT_INVITE'

export function updatePlayers(players) {
  return {
    type: UPDATE_PLAYERS,
    players: players
  }
}

export function onReceiveInvite(sender) {
  return {
    type: ON_RECEIVE_INVITE,
    sender
  }
}

export function onReceiveCancelInvite(sender) {
  return {
    type: ON_RECEIVE_CANCEL_INVITE,
    sender
  }
}

export function onReceiveAcceptInvite(sender, gameId) {
  return {
    type: ON_RECEIVE_ACCEPT_INVITE,
    sender,
    gameId
  }
}

export function onReceiveRejectInvite(sender) {
  return {
    type: ON_RECEIVE_REJECT_INVITE,
    sender
  }
}

export function onReceiveCommitChoice(sender) {
  return {
    type: ON_RECEIVE_COMMIT_CHOICE,
    sender
  }
}

export function onReceiveRevealChoice(sender, key) {
  return {
    type: ON_RECEIVE_REVEAL_CHOICE,
    sender,
    key
  }
}

export function sendInvite(recipient) {
  return {
    type: SEND_INVITE,
    recipient
  }
}

export function cancelInvite(recipient) {
  return {
    type: CANCEL_INVITE,
    recipient
  }
}

export function acceptInvite(recipient) {
  return {
    type: ACCEPT_INVITE,
    recipient
  }
}

export function rejectInvite(recipient) {
  return {
    type: REJECT_INVITE,
    recipient
  }
}
