import openSocket from 'socket.io-client';
const  socket = openSocket(process.env.REACT_APP_SERVER_URL);

export const INVITE_MESSAGE = 'invite'
export const CANCEL_INVITE_MESSAGE = 'cancelInvite'
export const ACCEPT_INVITE_MESSAGE = 'acceptInvite'
export const REJECT_INVITE_MESSAGE = 'rejectInvite'
export const COMMIT_CHOICE_MESSAGE = 'commitChoice'
export const REVEAL_CHOICE_MESSAGE = 'revealChoice'

export function subscribeToAddresses(myAddress, myName, cb) {
  socket.on('addresses', cb);
  socket.emit('introduction', { address: myAddress, name: myName })
}

export function subscribeToMessages(cb) {
  socket.on('receiveMessage', cb);
}

export function sendMessage({recipient, message, meta}) {
  socket.emit('sendMessage', { recipient, message, meta })
}
