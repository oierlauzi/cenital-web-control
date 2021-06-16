const modulePrefix = 'mixer/'

function add(store, tokens) {
  tokens.shift(); //we do not care about the type
  const name = tokens.shift();
  store.commit(modulePrefix + 'ADD_ELEMENT', name);
  store.dispatch(modulePrefix + 'fetchElement', name);
}

function rm(store, tokens) {
  const name = tokens.shift();
  store.commit(modulePrefix + 'DELETE_ELEMENT', name);
}

function connection(store, tokens) {
  const action = tokens.shift();
  const dstElement = tokens.shift();
  const dstInput = tokens.shift();

  if(action === 'set') {
    //A new connection has been made
    const srcElement = tokens.shift();
    const srcOutput = tokens.shift();

    try {
      store.commit(
        modulePrefix + 'CONNECT', 
        { 
          dstElement, 
          dstInput, 
          srcElement, 
          srcOutput 
        }
      );
    } catch {
      //If the fetch process is going
      //slower than the updates, 
      //this might fail
    }
  } else {
    //A new disconnection has been made
    console.assert(action === 'unset');

    try {
      store.commit(
        modulePrefix + 'DISCONNECT', 
        { 
          dstElement, 
          dstInput
        }
      );
    } catch {
      //If the fetch process is going
      //slower than the updates, 
      //this might fail
    }
  }
}





export default store => {
  //Subscribe to receive
  store.subscribe((mutation) => {
    if(mutation.type === 'connection/RECV') {
      const tokens = Array.from(mutation.payload); //To avoid mutating the original
      
      if(tokens.length > 0) {
        //Decide what to do depending on the action
        const action = tokens.shift();
        switch(action) {
          case 'add':
            //A element has been added
            add(store, tokens);
            break;

          case 'rm':
            //A element has been removed
            rm(store, tokens);
            break;

          case 'connection': 
            //A element will be configured
            connection(store, tokens);
            break;
        }
      }
    }
  });
}