import cenitalCli from '../../api/cenitalCli'

const modulePrefix = 'mixer/'

/*
 * Video mode related functions
 */

function setFrameRate(store, tokens, name) {
  try {
    const frameRate = cenitalCli.parseRational(tokens.shift());
    store.commit(modulePrefix + 'SET_FRAME_RATE_VALUE',  { name: name, frameRate: frameRate });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setResolution(store, tokens, name) {
  try {
    const resolution = cenitalCli.parseResolution(tokens.shift());
    store.commit(modulePrefix + 'SET_RESOLUTION_VALUE',  { name: name, resolution: resolution });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setPixelAspectRatio(store, tokens, name) {
  try {
    const par = cenitalCli.parseRational(tokens.shift());
    store.commit(modulePrefix + 'SET_PIXEL_ASPECT_RATIO_VALUE',  { name: name, pixelAspectRatio: par });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setColorPrimaries(store, tokens, name) {
  try {
    const colorPrimaries = tokens.shift();
    store.commit(modulePrefix + 'SET_COLOR_PRIMARIES_VALUE',  { name: name, colorPrimaries: colorPrimaries });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setColorModel(store, tokens, name) {
  try {
    const colorModel = tokens.shift();
    store.commit(modulePrefix + 'SET_COLOR_MODEL_VALUE',  { name: name, colorModel: colorModel });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setColorTransferFunction(store, tokens, name) {
  try {
    const colorTransferFunction = tokens.shift();
    store.commit(modulePrefix + 'SET_COLOR_TRANSFER_FUNCTION_VALUE',  { name: name, colorTransferFunction: colorTransferFunction });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setColorSubsampling(store, tokens, name) {
  try {
    const colorSubsampling = tokens.shift();
    store.commit(modulePrefix + 'SET_COLOR_SUBSAMPLING_VALUE',  { name: name, colorSubsampling: colorSubsampling });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setColorRange(store, tokens, name) {
  try {
    const colorRange = tokens.shift();
    store.commit(modulePrefix + 'SET_COLOR_RANGE_VALUE',  { name: name, colorRange: colorRange });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}

function setColorFormat(store, tokens, name) {
  try {
    const colorFormat = tokens.shift();
    store.commit(modulePrefix + 'SET_COLOR_FORMAT_VALUE',  { name: name, colorFormat: colorFormat });
  } catch {
    //If the fetch process is going
    //slower than the updates, 
    //this might fail
  }
}





/*
 * Root functions
 */

function add(store, tokens) {
  tokens.shift(); //we do not care about the type
  const name = tokens.shift();
  store.commit(modulePrefix + 'ADD', name);
  store.dispatch(modulePrefix + 'fetchElement', name);
}

function rm(store, tokens) {
  const name = tokens.shift();
  store.commit(modulePrefix + 'DELETE', name);
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

function config(store, tokens) {
  //Determine if the object is a ME
  const name = tokens.shift();
  const action = tokens.shift();
  switch(action) {
    case 'video-mode:frame-rate': {
      const set = tokens.shift();
      if(set === 'set') {
        setFrameRate(store, tokens, name);
      }
    }
    break;

    case 'video-mode:resolution': {
      const set = tokens.shift();
      if(set === 'set') {
        setResolution(store, tokens, name);
      }
    }
    break;

    case 'video-mode:pixel-aspect-ratio': {
      const set = tokens.shift();
      if(set === 'set') {
        setPixelAspectRatio(store, tokens, name);
      }
    }
    break;

    case 'video-mode:color-primaries': {
      const set = tokens.shift();
      if(set === 'set') {
        setColorPrimaries(store, tokens, name);
      }
    }
    break;

    case 'video-mode:color-model': {
      const set = tokens.shift();
      if(set === 'set') {
        setColorModel(store, tokens, name);
      }
    }
    break;

    case 'video-mode:color-transferFunction': {
      const set = tokens.shift();
      if(set === 'set') {
        setColorTransferFunction(store, tokens, name);
      }
    }
    break;

    case 'video-mode:color-subsampling': {
      const set = tokens.shift();
      if(set === 'set') {
        setColorSubsampling(store, tokens, name);
      }
    }
    break;

    case 'video-mode:color-range': {
      const set = tokens.shift();
      if(set === 'set') {
        setColorRange(store, tokens, name);
      }
    }
    break;

    case 'video-mode:color-format': {
      const set = tokens.shift();
      if(set === 'set') {
        setColorFormat(store, tokens, name);
      }
    }
    break;

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
            //A element will be connected/disconnected
            connection(store, tokens);
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