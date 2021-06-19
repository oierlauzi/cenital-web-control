const modulePrefix = 'inputNdi/';

function setSource(store, tokens, name) {
  try {
    const source = tokens.shift();
    store.commit(modulePrefix + 'SET_SOURCE',  { name: name, value: source });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetSource(store, tokens, name) {
  try {
    console.assert(tokens.length === 0);
    store.commit(modulePrefix + 'SET_SOURCE',  { name: name, value: null });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}





function add(store, tokens) {
  //Check if it is a mix effect
  const type = tokens.shift();
  if(type === 'input-ndi') {
    //It is a NDI input, add it
    const name = tokens.shift();
    store.commit(modulePrefix + 'ADD', name);
    store.dispatch(modulePrefix + 'fetchElement', name);
  }
}

function rm(store, tokens) {
  //TODO check if it exists
  const element = tokens.shift();
  store.commit(modulePrefix + 'DELETE', element);
}

function config(store, tokens) {
  //Determine if the object is a NDI input
  const element = tokens.shift();
  if(store.getters[modulePrefix + 'list'].includes(element)) {
    //Object is a NDI input. Decide what to do
    const action = tokens.shift();
    switch(action) {
      case 'source': {
        const set = tokens.shift();
        if(set === 'set') {
          setSource(store, tokens, element);
        } else if(set == 'unset') {
          unsetSource(store, tokens, element);
        }
      }
      break;

    }
  }
}





export default store => {
  //Subscribe to receive
  store.subscribe((mutation) => {
    if(mutation.type === 'connection/RECV') {
      const tokens = mutation.payload.slice(); //To avoid mutating the original
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

          case 'config': 
            //A element will be configured
            config(store, tokens);
            break;
        }
      }
    }
  });
}