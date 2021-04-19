function createWebSocket(store, socket, url) {
  //Evaluate if the socket is still valid
  if(socket) {
    if(socket.url !== url || socket.readyState !== WebSocket.OPEN) {
      //Something has changed, destroy the old socket
      socket.onclose = null; //To avoid dispatching close events
      socket.close(1000); //1000: Normal closure
      socket = null;
    }
  }

  //If it turns out that the socket has changed, recreate it if possible
  if(!socket && url) {
    //Create the new connection
    socket = new WebSocket(url);
  }

  //Configure the callbacks
  if(socket) {
    socket.onopen = function() {
      //Emit the connection event
      store.dispatch('webSocket/connectionOpened');
    };
    socket.onmessage = function() {
      //TODO
    };
    socket.onclose = function() {
      //Emit the disconnection event
      store.dispatch('webSocket/connectionClosed');
    };
  } else {
    //Issue a disconnection, as the socket could not be 
    //created
    store.dispatch('webSocket/connectionClosed');
  }

  return socket;
}

export default function createWebSocketPlugin() {
  return store => {
    var socket = null;

    //Subscribe to mutations
    store.subscribe((mutation) => {
      switch(mutation.type) {
        case "webSocket/SET_URL":
          //We're reconnecting
          socket = createWebSocket(store, socket, mutation.payload);
          break;

        default:
          break;
      }
    });
  }
}
  