import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');

export function subscribeToAddresses(myAddress, cb) {
  socket.on('addresses', cb);
  socket.emit('introduction', { address: myAddress })
}
