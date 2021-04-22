function createWebSocket(store, socket, url) {
  //Evaluate if the socket is still valid
  if(socket) {
    if(socket.url !== url || socket.readyState !== WebSocket.OPEN) {
      //Something has changed, destroy the old socket
      socket.onerror = null; //To avoid dispatching error events
      socket.onopen = null; //To avoid dispatching open events
      socket.onclose = null; //To avoid dispatching close events
      socket.onmessage = null; //To avoid dispatching recv events
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
    socket.onerror = function(event) {
      //Emit the disconnection event
      store.dispatch("webSocket/connectionError", event);
    };
    socket.onopen = function() {
      //Emit the connection event
      store.dispatch("webSocket/connectionOpened");
    };
    socket.onclose = function() {
      //Emit the disconnection event
      store.dispatch("webSocket/connectionClosed");
    };
    socket.onmessage = function(e) {
      store.dispatch("webSocket/recv", JSON.parse(e.data));
    };
  } else {
    //Issue a disconnection, as the socket could not be 
    //created
    store.dispatch("webSocket/connectionClosed");
  }

  return socket;
}

export default store => {
  var socket = null;

  //Subscribe to actions
  store.subscribeAction((action) => {
    switch(action.type) {
      case "webSocket/connect":
        //We"re reconnecting
        socket = createWebSocket(store, socket, action.payload);
        break;

        case "webSocket/send":
          //Send only if valid
          if(socket) {
            socket.send(JSON.stringify(action.payload))
          }
          break;

      default:
        break;
    }
  });
}
  