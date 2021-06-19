import cenitalCli from '../../api/cenitalCli'

const modulePrefix = 'mixEffect/';

function setInputCount(store, tokens, name) {
  try {
    const count = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_INPUT_COUNT',  { name: name, count: count });
    store.dispatch('mixer/fetchInputs', name); //TODO only fetch the new ones
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setScalingMode(store, tokens, name) {
  try {
    const mode = tokens.shift();
    store.commit(modulePrefix + 'SET_SCALING_MODE',  { name: name, mode: mode });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setScalingFilter(store, tokens, name) {
  try {
    const filter = tokens.shift();
    store.commit(modulePrefix + 'SET_SCALING_FILTER',  { name: name, filter: filter });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}




function setUpstreamOverlayCount(store, tokens, name) {
  try {
    const oldCount = store.getters[modulePrefix + 'getUpstreamOverlayCount'](name);
    const count = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_UPSTREAM_OVERLAY_COUNT',  { name: name, count: count });

    //Fetch the data of the new keyers
    for(let i = oldCount; i < count; ++i) {
      store.dispatch(modulePrefix + 'fetchUpstreamOverlay', { name: name, index: i });
    }
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setDownstreamOverlayCount(store, tokens, name) {
  try {
    const oldCount = store.getters[modulePrefix + 'getDownstreamOverlayCount'](name);
    const count = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_DOWNSTREAM_OVERLAY_COUNT',  { name: name, count: count });

    //Fetch the data of the new keyers
    for(let i = oldCount; i < count; ++i) {
      store.dispatch(modulePrefix + 'fetchDownstreamOverlay', { name: name, index: i });
    }
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}



function setProgram(store, tokens, name) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_PROGRAM',  { name: name, index: index });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetProgram(store, tokens, name) {
  try {
    store.commit(modulePrefix + 'SET_PROGRAM',  { name: name, index: -1 });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setPreview(store, tokens, name) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_PREVIEW',  { name: name, index: index });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetPreview(store, tokens, name) {
  try {
    store.commit(modulePrefix + 'SET_PREVIEW',  { name: name, index: -1 });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function cut(store, tokens, name) {
  try {
    //Swap program and preview
    const pgm = store.getters[modulePrefix + 'getProgram'](name);
    const pvw = store.getters[modulePrefix + 'getPreview'](name);
    store.commit(modulePrefix + 'SET_PREVIEW',  { name: name, index: pgm });
    store.commit(modulePrefix + 'SET_PROGRAM',  { name: name, index: pvw });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function transition(store, tokens, name) {
  //TODO Until transitions can be displayed properly
  //Cut if transition preview is not enabled
  if(!store.getters[modulePrefix + 'getTransitionPreview'](name)) {
    cut(store, tokens, name);
  }

  //Ensure that the transition bar is not in the middle
  store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, progress: 0.0 });
}

function transitionBar(store, tokens, name) {
  try {
    const progress = cenitalCli.parseNumber(tokens.shift());
    if(progress >= 1.0) {
      //End of the transition. Return to the beginning
      store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, progress: 0.0 });

      //Cut if transition preview is not enabled
      if(!store.getters[modulePrefix + 'getTransitionPreview'](name)) {
        cut(store, tokens, name);
      }
    } else if(progress >= 0.0) {
      store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, progress: progress });
    } else {
      //Not expected
      store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, progress: 0.0 });
    }
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function transitionEffect(store, tokens, name) {
  try {
    const effect = tokens.shift();
    store.commit(modulePrefix + 'SET_TRANSITION_EFFECT',  { name: name, effect: effect });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function transitionDuration(store, tokens, name) {
  try {
    const duration = cenitalCli.parseDuration(tokens.shift());
    store.commit(modulePrefix + 'SET_TRANSITION_DURATION',  { name: name, duration: duration });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function transitionPreview(store, tokens, name) {
  try {
    const enabled = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_TRANSITION_PREVIEW',  { name: name, enabled: enabled });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}





function add(store, tokens) {
  //Check if it is a mix effect
  const type = tokens.shift();
  if(type === 'mix-effect') {
    //It is a ME, add it
    const name = tokens.shift();
    store.commit(modulePrefix + 'ADD_MIX_EFFECT', name);
    store.dispatch(modulePrefix + 'fetchMixEffect', name);
  }
}

function rm(store, tokens) {
  //TODO check if it exists
  const element = tokens.shift();
  store.commit(modulePrefix + 'DELETE_MIX_EFFECT', element);
}

function config(store, tokens) {
  //Determine if the object is a ME
  const element = tokens.shift();
  if(store.getters[modulePrefix + 'list'].includes(element)) {
    //Object is a ME. Decide what to do
    const action = tokens.shift();
    switch(action) {
      case 'input:count': {
        const set = tokens.shift();
        if(set === 'set') {
          setInputCount(store, tokens, element);
        }
      }
      break;

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



      case 'us-overlay:count': {
        const set = tokens.shift();
        if(set === 'set') {
          setUpstreamOverlayCount(store, tokens, element);
        }
      }
      break;

      case 'ds-overlay:count': {
        const set = tokens.shift();
        if(set === 'set') {
          setDownstreamOverlayCount(store, tokens, element);
        }
      }
      break;



      case 'pgm': {
        const set = tokens.shift();
        if(set === 'set') {
          setProgram(store, tokens, element);
        } else if(set === 'unset') {
          unsetProgram(store, tokens, element);
        }
      }
      break;

      case 'pvw': {
        const set = tokens.shift();
        if(set === 'set') {
          setPreview(store, tokens, element);
        } else if(set === 'unset') {
          unsetPreview(store, tokens, element);
        }
      }
      break;

      case 'cut': {
        cut(store, tokens, element);
      }
      break;

      case 'transition': {
        transition(store, tokens, element);
      }
      break;

      case 'transition:bar': {
        const set = tokens.shift();
        if(set === 'set') {
          transitionBar(store, tokens, element);
        }
      }
      break;

      case 'transition:effect': {
        const set = tokens.shift();
        if(set === 'set') {
          transitionEffect(store, tokens, element);
        }
      }
      break;

      case 'transition:duration': {
        const set = tokens.shift();
        if(set === 'set') {
          transitionDuration(store, tokens, element);
        }
      }
      break;

      case 'transition:pvw': {
        const set = tokens.shift();
        if(set === 'set') {
          transitionPreview(store, tokens, element);
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