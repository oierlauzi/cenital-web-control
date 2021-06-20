import cenitalCli from '../../api/cenitalCli'

const modulePrefix = 'outputWindow/';

function setScalingMode(store, tokens, name) {
  try {
    const mode = tokens.shift();
    store.commit(modulePrefix + 'SET_SCALING_MODE',  { name: name, value: mode });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setScalingFilter(store, tokens, name) {
  try {
    const filter = tokens.shift();
    store.commit(modulePrefix + 'SET_SCALING_FILTER',  { name: name, value: filter });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}



function setTitle(store, tokens, name) {
  try {
    const title = tokens.shift();
    store.commit(modulePrefix + 'SET_TITLE',  { name: name, value: title });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setSize(store, tokens, name) {
  try {
    const size = cenitalCli.parseVector2i(tokens.shift());
    store.commit(modulePrefix + 'SET_SIZE',  { name: name, value: size });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setPosition(store, tokens, name) {
  try {
    const position = cenitalCli.parseVector2i(tokens.shift());
    store.commit(modulePrefix + 'SET_POSITION',  { name: name, value: position });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOpacity(store, tokens, name) {
  try {
    const opacity = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OPACITY',  { name: name, value: opacity });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setResizable(store, tokens, name) {
  try {
    const resizable = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_RESIZABLE',  { name: name, value: resizable });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setDecorated(store, tokens, name) {
  try {
    const decorated = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_DECORATED',  { name: name, value: decorated });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setMonitor(store, tokens, name) {
  try {
    const monitor = tokens.shift();
    store.commit(modulePrefix + 'SET_CURRENT_MONITOR',  { name: name, value: monitor });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetMonitor(store, tokens, name) {
  try {
    console.assert(tokens.length === 0);
    store.commit(modulePrefix + 'SET_CURRENT_MONITOR',  { name: name, value: null });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}





function add(store, tokens) {
  //Check if it is a mix effect
  const type = tokens.shift();
  if(type === 'output-window') {
    //It is a window, add it
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
  //Determine if the object is a window
  const element = tokens.shift();
  if(store.getters[modulePrefix + 'list'].includes(element)) {
    //Object is a window. Decide what to do
    const action = tokens.shift();
    switch(action) {
      case 'video-scaling:mode': {
        const set = tokens.shift();
        if(set === 'set') {
          setScalingMode(store, tokens, element);
        }
      }
      break;

      case 'video-scaling:filter': {
        const set = tokens.shift();
        if(set === 'set') {
          setScalingFilter(store, tokens, element);
        }
      }
      break;

      case 'title': {
        const set = tokens.shift();
        if(set === 'set') {
          setTitle(store, tokens, element);
        }
      }
      break;

      case 'size': {
        const set = tokens.shift();
        if(set === 'set') {
          setSize(store, tokens, element);
        }
      }
      break;

      case 'position': {
        const set = tokens.shift();
        if(set === 'set') {
          setPosition(store, tokens, element);
        }
      }
      break;

      case 'opacity': {
        const set = tokens.shift();
        if(set === 'set') {
          setOpacity(store, tokens, element);
        }
      }
      break;

      case 'resizable': {
        const set = tokens.shift();
        if(set === 'set') {
          setResizable(store, tokens, element);
        }
      }
      break;

      case 'decorated': {
        const set = tokens.shift();
        if(set === 'set') {
          setDecorated(store, tokens, element);
        }
      }
      break;

      case 'monitor': {
        const set = tokens.shift();
        if(set === 'set') {
          setMonitor(store, tokens, element);
        } else if(set == 'unset') {
          unsetMonitor(store, tokens, element);
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