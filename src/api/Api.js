import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

export const INVITE_MESSAGE = 'invite'
export const CANCEL_INVITE_MESSAGE = 'cancelInvite'
export const ACCEPT_INVITE_MESSAGE = 'acceptInvite'
export const REJECT_INVITE_MESSAGE = 'rejectInvite'

export function subscribeToAddresses(myAddress, cb) {
  socket.on('addresses', cb);
  socket.emit('introduction', { address: myAddress })
}

export function subscribeToMessages(cb) {
  socket.on('receiveMessage', cb);
}

export function sendMessage({recipient, message, meta}) {
  socket.emit('sendMessage', { recipient, message, meta })
}
