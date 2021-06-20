import cenitalCli from '../../api/cenitalCli'

const modulePrefix = 'inputMediaPlayer/';

function setClipState(store, tokens, name, clip) {
  try {
    const state = tokens.shift();
    store.commit(modulePrefix + 'SET_CLIP_STATE',  { name, clip, value: state });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setClipRepeat(store, tokens, name, clip) {
  try {
    const repeat = tokens.shift();
    store.commit(modulePrefix + 'SET_CLIP_REPEAT',  { name, clip, value: repeat });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetClipRepeat(store, tokens, name, clip) {
  try {
    console.assert(tokens.length === 0);
    store.commit(modulePrefix + 'SET_CLIP_REPEAT',  { name, clip, value: null });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setClipSpeed(store, tokens, name, clip) {
  try {
    const speed = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_CLIP_SPEED',  { name, clip, value: speed });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setClipTime(store, tokens, name, clip) {
  try {
    const time = cenitalCli.parseDuration(tokens.shift());
    store.commit(modulePrefix + 'SET_CLIP_TIME',  { name, clip, value: time });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}



function addClip(store, tokens, name) {
  //A clip has been added
  const clip = tokens.shift();
  store.commit(modulePrefix + 'ADD_CLIP', { name, clip });
  store.dispatch(modulePrefix + 'fetchClip', { name, clip });
}

function rmClip(store, tokens, name) {
  const clip = tokens.shift();
  store.commit(modulePrefix + 'DELETE_CLIP', { name, clip });
}

function configClip(store, tokens, name) {
  //Determine if the object is a NDI input
  const clip = tokens.shift();
  const action = tokens.shift();
  switch(action) {
    case 'state': {
      const set = tokens.shift();
      if(set === 'set') {
        setClipState(store, tokens, name, clip);
      }
    }
    break;

    case 'repeat': {
      const set = tokens.shift();
      if(set === 'set') {
        setClipRepeat(store, tokens, name, clip);
      } else if(set == 'unset') {
        unsetClipRepeat(store, tokens, name, clip);
      }
    }
    break;

    case 'speed': {
      const set = tokens.shift();
      if(set === 'set') {
        setClipSpeed(store, tokens, name, clip);
      }
    }
    break;

    case 'time': {
      const set = tokens.shift();
      if(set === 'set') {
        setClipTime(store, tokens, name, clip);
      }
    }
    break;

  }
}

function setClip(store, tokens, name) {
  try {
    const clip = tokens.shift();
    store.commit(modulePrefix + 'SET_CURRENT_CLIP',  { name, value: clip });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetClip(store, tokens, name) {
  try {
    const clip = tokens.shift();
    store.commit(modulePrefix + 'SET_CURRENT_CLIP',  { name, value: clip });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}




function add(store, tokens) {
  //Check if it is a media player
  const type = tokens.shift();
  if(type === 'input-media-player') {
    //It is a media player, add it
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
      case 'clip': {
        switch(tokens.shift()) {
          case 'add':
            addClip(store, tokens, element);
          break;
    
          case 'rm':
            rmClip(store, tokens, element);
          break;
    
          case 'config':
            configClip(store, tokens, element);
          break;

          case 'set':
            setClip(store, tokens, element);
          break;

          case 'unset':
            unsetClip(store, tokens, element);
          break;

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