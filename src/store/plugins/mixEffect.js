import cenitalCli from '../../api/cenitalCli'

const modulePrefix = 'mixEffect/';

function setInputCount(store, tokens, name) {
  try {
    const count = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_INPUT_COUNT',  { name: name, value: count });
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



function setProgram(store, tokens, name) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_PROGRAM',  { name: name, value: index });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetProgram(store, tokens, name) {
  try {
    store.commit(modulePrefix + 'SET_PROGRAM',  { name: name, value: -1 });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setPreview(store, tokens, name) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_PREVIEW',  { name: name, value: index });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetPreview(store, tokens, name) {
  try {
    store.commit(modulePrefix + 'SET_PREVIEW',  { name: name, value: -1 });
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
    store.commit(modulePrefix + 'SET_PREVIEW',  { name: name, value: pgm });
    store.commit(modulePrefix + 'SET_PROGRAM',  { name: name, value: pvw });

    //Swap the state of the overlays if transition is required
    ['upstream', 'downstream'].forEach(slot => {
      const count = store.getters[modulePrefix + 'getOverlayCount'](name, slot);
      for(let i = 0; i < count; ++i) {
        if(store.getters[modulePrefix + 'getOverlayTransition'](name, slot, i)) {
          const visible = store.getters[modulePrefix + 'getOverlayVisible'](name, slot, i);
          store.dispatch(modulePrefix + 'setOverlayVisible', { name, slot, index: i, value: !visible });
        }
      }
    });
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
  store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, value: 0.0 });
}

function setTransitionBar(store, tokens, name) {
  try {
    const progress = cenitalCli.parseNumber(tokens.shift());
    if(progress >= 1.0) {
      //End of the transition. Return to the beginning
      store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, value: 0.0 });

      //Cut if transition preview is not enabled
      if(!store.getters[modulePrefix + 'getTransitionPreview'](name)) {
        cut(store, tokens, name);
      }
    } else if(progress >= 0.0) {
      store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, value: progress });
    } else {
      //Not expected
      store.commit(modulePrefix + 'SET_TRANSITION_BAR',  { name: name, value: 0.0 });
    }
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setTransitionDuration(store, tokens, name) {
  try {
    const duration = cenitalCli.parseDuration(tokens.shift());
    store.commit(modulePrefix + 'SET_TRANSITION_DURATION',  { name: name, value: duration });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setTransitionPreview(store, tokens, name) {
  try {
    const enabled = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_TRANSITION_PREVIEW',  { name: name, value: enabled });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setTransitionSelectedEffect(store, tokens, name) {
  try {
    const effect = tokens.shift();
    store.commit(modulePrefix + 'SET_TRANSITION_SELECTED_EFFECT',  { name: name, value: effect });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}



function setOverlayCount(store, tokens, name, slot) {
  try {
    const oldCount = store.getters[modulePrefix + 'getOverlayCount'](name, slot);
    const count = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_COUNT',  { name, slot, value: count });

    //Fetch the data of the new overlays
    for(let i = oldCount; i < count; ++i) {
      store.dispatch(modulePrefix + 'fetchOverlay', { name, slot, index: i });
    }
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayVisible(store, tokens, name, slot) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    const visible = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_VISIBLE',  { name, slot, index, value: visible });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayTransition(store, tokens, name, slot) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    const transition = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_TRANSITION',  { name, slot, index, value: transition });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayFeed(store, tokens, name, slot) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    const feed = tokens.shift();
    const value = cenitalCli.parseInteger(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_FEED',  { name, slot, index, feed, value });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function unsetOverlayFeed(store, tokens, name, slot) {
  try {
    const index = cenitalCli.parseInteger(tokens.shift());
    const feed = tokens.shift();
    store.commit(modulePrefix + 'SET_OVERLAY_FEED',  { name, slot, index, feed, value: -1 });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayPosition(store, tokens, name, slot, index) {
  try {
    const position = cenitalCli.parseVector3f(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_POSITION',  { name, slot, index, value: position });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayRotation(store, tokens, name, slot, index) {
  try {
    const rotation = cenitalCli.parseVector4f(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_ROTATION',  { name, slot, index, value: rotation });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayScale(store, tokens, name, slot, index) {
  try {
    const scale = cenitalCli.parseVector3f(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_SCALE',  { name, slot, index, value: scale });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayOpacity(store, tokens, name, slot, index) {
  try {
    const opacity = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_OPACITY',  { name, slot, index, value: opacity });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayBlendingMode(store, tokens, name, slot, index) {
  try {
    store.commit(modulePrefix + 'SET_OVERLAY_BLENDING_MODE',  { name, slot, index, value: tokens.shift() });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayScalingMode(store, tokens, name, slot, index) {
  try {
    store.commit(modulePrefix + 'SET_OVERLAY_SCALING_MODE',  { name, slot, index, value: tokens.shift() });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setOverlayScalingFilter(store, tokens, name, slot, index) {
  try {
    store.commit(modulePrefix + 'SET_OVERLAY_SCALING_FILTER',  { name, slot, index, value: tokens.shift() });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLinearKeyEnabled(store, tokens, name, slot, index) {
  try {
    const enabled = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_LINEAR_KEY_ENABLED',  { name, slot, index, value: enabled });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLinearKeyInverted(store, tokens, name, slot, index) {
  try {
    const inverted = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_LINEAR_KEY_INVERTED',  { name, slot, index, value: inverted });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLinearKeyChannel(store, tokens, name, slot, index) {
  try {
    store.commit(modulePrefix + 'SET_OVERLAY_LINEAR_KEY_CHANNEL',  { name, slot, index, value: tokens.shift() });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLumaKeyEnabled(store, tokens, name, slot, index) {
  try {
    const enabled = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_LUMA_KEY_ENABLED',  { name, slot, index, value: enabled });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLumaKeyInverted(store, tokens, name, slot, index) {
  try {
    const inverted = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_LUMA_KEY_INVERTED',  { name, slot, index, value: inverted });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLumaKeyMinThreshold(store, tokens, name, slot, index) {
  try {
    const min = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_LUMA_KEY_MIN_THRESHOLD',  { name, slot, index, value: min });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getLumaKeyMaxThreshold(store, tokens, name, slot, index) {
  try {
    const max = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_LUMA_KEY_MAX_THRESHOLD',  { name, slot, index, value: max });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeyEnabled(store, tokens, name, slot, index) {
  try {
    const enabled = cenitalCli.parseBoolean(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_ENABLED',  { name, slot, index, value: enabled });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeyHue(store, tokens, name, slot, index) {
  try {
    const hue = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_HUE',  { name, slot, index, value: hue });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeyHueSpan(store, tokens, name, slot, index) {
  try {
    const hueSpan = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_HUE_SPAN',  { name, slot, index, value: hueSpan });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeyHueSmoothness(store, tokens, name, slot, index) {
  try {
    const hueSmoothness = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_HUE_SMOOTHNESS',  { name, slot, index, value: hueSmoothness });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeySaturationThreshold(store, tokens, name, slot, index) {
  try {
    const satThreshold = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_SATURATION_THRESHOLD',  { name, slot, index, value: satThreshold });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeySaturationSmoothness(store, tokens, name, slot, index) {
  try {
    const satSmoothness = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_SATURATION_SMOOTHNESS',  { name, slot, index, value: satSmoothness });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeyBrightnessThreshold(store, tokens, name, slot, index) {
  try {
    const brightnessThreshold = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_BRIGHTNESS_THRESHOLD',  { name, slot, index, value: brightnessThreshold });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function getChromaKeyBrightnessSmoothness(store, tokens, name, slot, index) {
  try {
    const brightnessSmoothness = cenitalCli.parseNumber(tokens.shift());
    store.commit(modulePrefix + 'SET_OVERLAY_CHROMA_KEY_BRIGHTNESS_SMOOTHNESS',  { name, slot, index, value: brightnessSmoothness });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function configOverlay(store, tokens, name, slot) {
  const index = tokens.shift();
  const action = tokens.shift();

  switch(action) {
  case 'transform:pos': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayPosition(store, tokens, name, slot, index);
    }
  }
  break;

  case 'transform:rot': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayRotation(store, tokens, name, slot, index);
    }
  }
  break;

  case 'transform:scale': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayScale(store, tokens, name, slot, index);
    }
  }
  break;

  case 'blending:opacity': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayOpacity(store, tokens, name, slot, index);
    }
  }
  break;

  case 'blending:mode': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayBlendingMode(store, tokens, name, slot, index);
    }
  }
  break;

  case 'video-scaling:mode': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayScalingMode(store, tokens, name, slot, index);
    }
  }
  break;

  case 'video-scaling:filter': {
    const set = tokens.shift();
    if(set === 'set') {
      setOverlayScalingFilter(store, tokens, name, slot, index);
    }
  }
  break;

  case 'linear-key:ena': {
    const set = tokens.shift();
    if(set === 'set') {
      getLinearKeyEnabled(store, tokens, name, slot, index);
    }
  }
  break;

  case 'linear-key:inv': {
    const set = tokens.shift();
    if(set === 'set') {
      getLinearKeyInverted(store, tokens, name, slot, index);
    }
  }
  break;

  case 'linear-key:ch': {
    const set = tokens.shift();
    if(set === 'set') {
      getLinearKeyChannel(store, tokens, name, slot, index);
    }
  }
  break;

  case 'luma-key:ena': {
    const set = tokens.shift();
    if(set === 'set') {
      getLumaKeyEnabled(store, tokens, name, slot, index);
    }
  }
  break;

  case 'luma-key:inv': {
    const set = tokens.shift();
    if(set === 'set') {
      getLumaKeyInverted(store, tokens, name, slot, index);
    }
  }
  break;

  case 'luma-key:min': {
    const set = tokens.shift();
    if(set === 'set') {
      getLumaKeyMinThreshold(store, tokens, name, slot, index);
    }
  }
  break;

  case 'luma-key:max': {
    const set = tokens.shift();
    if(set === 'set') {
      getLumaKeyMaxThreshold(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:ena': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeyEnabled(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:hue:center': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeyHue(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:hue:span': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeyHueSpan(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:hue:smooth': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeyHueSmoothness(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:sat:min': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeySaturationThreshold(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:sat:smooth': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeySaturationSmoothness(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:val:min': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeyBrightnessThreshold(store, tokens, name, slot, index);
    }
  }
  break;

  case 'chroma-key:val:smooth': {
    const set = tokens.shift();
    if(set === 'set') {
      getChromaKeyBrightnessSmoothness(store, tokens, name, slot, index);
    }
  }
  break;

  }

}



function add(store, tokens) {
  //Check if it is a mix effect
  const type = tokens.shift();
  if(type === 'mix-effect') {
    //It is a ME, add it
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
          setTransitionBar(store, tokens, element);
        }
      }
      break;

      case 'transition:duration': {
        const set = tokens.shift();
        if(set === 'set') {
          setTransitionDuration(store, tokens, element);
        }
      }
      break;

      case 'transition:pvw': {
        const set = tokens.shift();
        if(set === 'set') {
          setTransitionPreview(store, tokens, element);
        }
      }
      break;

      case 'transition:effect': {
        const set = tokens.shift();
        if(set === 'set') {
          setTransitionSelectedEffect(store, tokens, element);
        }
      }
      break;


      case 'us-overlay:count': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayCount(store, tokens, element, 'upstream');
        }
      }
      break;

      case 'ds-overlay:count': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayCount(store, tokens, element, 'downstream');
        }
      }
      break;

      case 'us-overlay:ena': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayVisible(store, tokens, element, 'upstream');
        }
      }
      break;

      case 'ds-overlay:ena': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayVisible(store, tokens, element, 'downstream');
        }
      }
      break;

      case 'us-overlay:transition': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayTransition(store, tokens, element, 'upstream');
        }
      }
      break;

      case 'ds-overlay:transition': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayTransition(store, tokens, element, 'downstream');
        }
      }
      break;

      case 'us-overlay:feed': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayFeed(store, tokens, element, 'upstream');
        } else if(set === 'unset') {
          unsetOverlayFeed(store, tokens, element, 'upstream');
        }
      }
      break;

      case 'ds-overlay:feed': {
        const set = tokens.shift();
        if(set === 'set') {
          setOverlayFeed(store, tokens, element, 'downstream');
        } else if(set === 'unset') {
          unsetOverlayFeed(store, tokens, element, 'downstream');
        }
      }
      break;

      case 'us-overlay': {
        const config = tokens.shift();
        if(config === 'config') {
          configOverlay(store, tokens, element, 'upstream');
        }
      }
      break;

      case 'ds-overlay': {
        const config = tokens.shift();
        if(config === 'config') {
          configOverlay(store, tokens, element, 'downstream');
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