import CenitalCliConnection from '../../api/CenitalCliConnection';

export default store => {
  const socket = new CenitalCliConnection();
  const modulePrefix = 'connection/';

  //Subscribe to the socket's callbacks
  socket.addEventListener('open', function() {
    store.commit(modulePrefix + 'SET_CONNECTED', true);
    store.commit(modulePrefix + 'SET_ERROR', false);
    store.dispatch('fetch');
  });
  socket.addEventListener('close', function() {
    store.commit(modulePrefix + 'SET_CONNECTED', false);
    store.dispatch('reset');
  });
  socket.addEventListener('error', function() {
    store.commit(modulePrefix + 'SET_ERROR', true);
  });
  socket.addEventListener('recv', function(event) {
    store.commit(modulePrefix + 'RECV', event.data);
  });

  //Subscribe to actions
  store.subscribe((mutation) => {
    switch(mutation.type) {
    case modulePrefix + 'CONNECT':
      socket.connect(mutation.payload.url)
      .then(mutation.payload.resolve)
      .catch(mutation.payload.reject);
      break;

    case modulePrefix + 'DISCONNECT':
      socket.disconnect()
      .then(mutation.payload.resolve)
      .catch(mutation.payload.reject);
      break;

    case modulePrefix + 'SEND':
      socket.send(mutation.payload.tokens)
        .then(mutation.payload.resolve)
        .catch(mutation.payload.reject);
      break;
    case modulePrefix + 'SEND_NO_SUCCESS':
        socket.sendNoSuccess(mutation.payload.tokens)
        .then(mutation.payload.resolve)
        .catch(mutation.payload.reject);
        break;

    case modulePrefix + 'SEND_NO_ACK':
      socket.sendNoAck(mutation.payload.tokens);
      mutation.payload.resolve();
      break;

    }
  }, { prepend: true });
}