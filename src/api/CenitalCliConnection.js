import cenitalCli from "./cenitalCli";

function CenitalCliConnection() {
  let target = document.createTextNode(null);
  this.addEventListener = target.addEventListener.bind(target);
  this.removeEventListener = target.removeEventListener.bind(target);
  this.dispatchEvent = target.dispatchEvent.bind(target);

  this.socket = null;
  this.lastAck = 0;
}

CenitalCliConnection.prototype.connect = function(url) {
  let self = this;
  return this.disconnect().then(function(){
    //Ensure it is closed
    console.assert(self.socket === null);

    //Start over with the ACKs
    self.lastAck = 0; 

    //Instantiate the new socket
    let socket = new WebSocket(url);

    //Configure callback forwards
    socket.addEventListener('open', function() {
      self.dispatchEvent(new Event('open'));
    });
    socket.addEventListener('close', function(event) {
      self.socket = null; //Removes the reference from this

      const init = {
        wasClean: event.wasClean,
        code: event.code,
        reason: event.reason
      };
      self.dispatchEvent(new CloseEvent('close', init));
    });
    socket.addEventListener('error', function() {
      self.dispatchEvent(new Event('error'));
    });
    socket.addEventListener('message', function(event) {
      //Tokenize the data. Remove the \n at the end
      const tokens = cenitalCli.tokenize(event.data.substring(0, event.data.length-1));
      
      //Send the new event with the appropriate format
      const init = {
        data: tokens,
        origin: event.origin,
        lastEventId: event.lastEventId,
        source: event.source,
        ports: event.ports
      } 
      self.dispatchEvent(new MessageEvent('recv', init));
    });

    //Write changes
    self.socket = socket;

    //Configure the callbacks to resolve/reject the promise
    return new Promise((resolve, reject) => {
      self.addEventListener('error', function() {
        reject();
      });
      self.addEventListener('open', function() {
        resolve();
      });
    });
  });
}

CenitalCliConnection.prototype.disconnect = function() {
  let self = this;
  return new Promise(resolve => {
    if(self.socket) {
      //Subscribe the promise to the close callback
      self.addEventListener('close', function(event) {
        resolve(event.code);
      });
      
      //Close the socket
      self.socket.close();
    } else {
      //Already disconnected, resolve immediately
      resolve(0);
    }
  });
}

CenitalCliConnection.prototype.sendNoAck = function(tokens) {
  if(this.state() === WebSocket.OPEN) {
    //Make the message
    let msg = cenitalCli.serialize(tokens);

    //Send the message
    this.socket.send(msg);
  }
}

CenitalCliConnection.prototype.sendNoSuccess = function(tokens) {
  let self = this;
  return new Promise((resolve, reject) => {
    if(self.state() === WebSocket.OPEN) {
      //Add a ACK at the beginning of the tokens
      let ack = cenitalCli.makeAck(self.lastAck++);
      tokens.unshift(ack);

      //Subscribe to the message callback
      self.addEventListener('error', function() {
        //Error sending the message
        reject(); 

        //Unsubscribe
        self.removeEventListener('recv', this);
        self.removeEventListener('close', this);
        self.removeEventListener('error', this);
      });
      self.addEventListener('close', function() {
        //Connection closed before receiving a response
        reject();

        //Unsubscribe
        self.removeEventListener('recv', this);
        self.removeEventListener('close', this);
        self.removeEventListener('error', this);
      });
      self.addEventListener('recv', function(event) {
        //If the first element of the array is a ACK, resolve
        if(event.data.length > 0) {
          if(event.data[0] === ack) {
            //Pop the ACK from the tokens
            event.data.shift();

            //Successfully received a response
            resolve(event);

            //Unsubscribe
            self.removeEventListener('recv', this);
            self.removeEventListener('close', this);
            self.removeEventListener('error', this);
          }
        }
      });

      //Send the message
      self.sendNoAck(tokens);
    } else {
      //Disconnected, reject immediately
      reject();
    }
  });
}

CenitalCliConnection.prototype.send = function(tokens) {
  return this.sendNoSuccess(tokens).then(event => {
    //Check if the first token is OK
    if(event.data.length > 0) {
      if(cenitalCli.checkSuccess(event.data[0])) {
        //Pop the success token
        event.data.shift();

        //Succeeded
        return Promise.resolve(event);
      }
    }

    //Failure
    return Promise.reject();
  });
}

CenitalCliConnection.prototype.state = function() {
  return this.socket ? this.socket.readyState : WebSocket.CLOSED;
}

CenitalCliConnection.prototype.url = function() {
  return this.socket ? this.socket.url : "";
}

export default CenitalCliConnection;