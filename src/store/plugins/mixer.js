export default store => {
  const modulePrefix = 'mixer/';

  //Subscribe to receive
  store.subscribe((mutation) => {
    if(mutation.type === 'connection/RECV') {
      const tokens = mutation.payload;
      
      if(tokens.length > 0) {
        //Decide what to do depending on the action
        switch(tokens[0]) {
          case 'add': {
            //A element has been added
            console.assert(tokens.length >= 3);
            const element = tokens[2];
            store.commit(modulePrefix + 'ADD_ELEMENT', element);
            store.dispatch(modulePrefix + 'fetchElement', element);
          }
          break;

          case 'connection':
            if(tokens.length > 1) {
              //A connection will be established
              switch(tokens[1]) {
                case 'set': {
                  //Create a new connection
                  console.assert(tokens.length === 6);
                  const dstElement = tokens[2];
                  const dstInput = tokens[3];
                  const srcElement = tokens[4];
                  const srcOutput = tokens[5];

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
                } 
                break;

                case 'unset': {
                  //Disconnect
                  console.assert(tokens.length === 4);
                  const dstElement = tokens[2];
                  const dstInput = tokens[3];

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
                 break;
              }
            }

            break;
        }
      }
    }
  });
}