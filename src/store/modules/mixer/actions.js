import cenitalCli from '../../../api/cenitalCli'

function send(dispatch, tokens) {
  return dispatch('connection/send', tokens, { root: true });
}

function fetchVideoModeAttribute(dispatch, dispatchPrefix, commit, commitPrefix, name, attribute) {
  return send(dispatch, ['config', name, 'video-mode:' + attribute, 'help']).then(commands => {
    const get = commands.includes('get');
    const set = commands.includes('set');
    const opt = commands.includes('enum');

    //Set RW capabilities
    commit(commitPrefix + '_READ_ENABLE', { name: name, enable: get });
    commit(commitPrefix + '_WRITE_ENABLE', { name: name, enable: set });

    //Depending on the capabilities, fetch them
    const prom = [];
    if(get) {
      prom.push(dispatch(dispatchPrefix + 'Value', name));
    }
    if(opt) {
      prom.push(dispatch(dispatchPrefix + 'Options', name));
    }

    return Promise.all(prom);
  });
}

function fetchVideoModeAttributeValue(dispatch, commit, dispatchPrefix, name, attribute, parseFunc) {
  return send(dispatch, ['config', name, 'video-mode:' + attribute, 'get']).then(values => {
    console.assert(values.length === 1);
    const value = parseFunc(values[0]);
    commit(dispatchPrefix + '_VALUE', { name: name, value: value });
  });
}

function fetchVideoModeAttributeOptions(dispatch, commit, dispatchPrefix, name, attribute, parseFunc) {
  return send(dispatch, ['config', name, 'video-mode:' + attribute, 'enum']).then(values => {
    const options = values.map(parseFunc);
    commit(dispatchPrefix + '_OPTIONS', { name: name, options: options });
  });
}


export default {
  /*
   * Connection setters
   */
  connect({ dispatch }, { dstElement, dstInput, srcElement, srcOutput }) {
    return send(dispatch, [
      'connection',
      'set',
      dstElement,
      dstInput,
      srcElement,
      srcOutput
    ]);
  },
  disconnect({ dispatch }, { dstElement, dstInput }) {
    return send(dispatch, [
      'connection',
      'unset',
      dstElement,
      dstInput
    ]);
  },

  /*
   * Video mode setters
   */
  setFrameRate({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:frame-rate',
      'set',
      cenitalCli.generateRational(value)
    ]);
  },
  setResolution({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:resolution',
      'set',
      cenitalCli.generateResolution(value)
    ]);
  },
  setPixelAspectRatio({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:pixel-aspect-ratio',
      'set',
      cenitalCli.generateRational(value)
    ]);
  },
  setColorPrimaries({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:color-primaries',
      'set',
      value
    ]);
  },
  setColorModel({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:color-model',
      'set',
      value
    ]);
  },
  setColorTransferFunction({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:color-transfer-function',
      'set',
      value
    ]);
  },
  setColorSubsampling({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:color-subsampling',
      'set',
      value
    ]);
  },
  setColorRange({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:color-range',
      'set',
      value
    ]);
  },  
  setColorFormat({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-mode:color-format',
      'set',
      value
    ]);
  },



  /*
   * Reset and general fetching
   */
  reset({ commit }) {
    commit('RESET');
  },
  fetch({ dispatch, commit }) {
    //Increment the fetching count
    commit('INC_FETCHING'); 

    return send(dispatch, ['enum']).then(elements => {
      //Start over
      commit('RESET');
      
      //Fetch the members of each element in parallel
      const prom = elements.map(name => {
        commit('ADD', name); //Add all the elements
        return dispatch('fetchElement', name);
      });

      return Promise.all(prom);
    }).then(() => commit('DEC_FETCHING'));
  },
  fetchElement({ dispatch }, name) {
    //Fetch input and outputs
    return Promise.all([
      dispatch('fetchInputs', name),
      dispatch('fetchOutputs', name),
      dispatch('fetchVideoMode', name),
    ]);
  },

  /*
   * Connection fetching
   */
  fetchInputs({ dispatch, getters, commit }, name) {
    return send(dispatch, ['connection:dst', 'enum', name]).then(inputs => {
      commit('RESET_INPUTS', name); //Start over
      inputs.forEach(input => commit('ADD_INPUT', { name, input })); //Add all inputs
    }).then(() => {
      //For each input fetch its source
      const inputs = getters['getElementInputs'](name);
      const prom = inputs.map(input => {
        return dispatch('fetchInputSource', { name, input });
      });

      return Promise.all(prom);
    });
  },
  fetchOutputs({ dispatch, commit }, name) {
    return send(dispatch, ['connection:src', 'enum', name]).then(outputs => {
      commit('RESET_OUTPUTS', name); //Start over
      outputs.forEach(output => commit('ADD_OUTPUT', { name, output })); //Add all outputs
    });
  },
  fetchInputSource({ dispatch, commit }, { name, input }) {
    return send(dispatch, ['connection', 'get', name, input]).then(source => {
      if(source.length === 0) {
        commit('DISCONNECT', { dstElement: name, dstInput: input });
      } else {
        console.assert(source.length === 2);
        commit('CONNECT', { dstElement: name, dstInput: input, srcElement: source[0], srcOutput: source[1] });
      }
    });
  },


  /*
   * Video mode fetching
   */
  fetchVideoMode({ dispatch, commit }, name) {
    //Get the available commands
    return send(dispatch, ['config', name, 'help']).then(commands => {
      //Start over
      commit('RESET_VIDEO_MODE', name);

      const prom = [];

      //Depending on the command availability, fetch individually
      if(commands.includes('video-mode:frame-rate')) {
        prom.push(dispatch('fetchFrameRate', name));
      }
      if(commands.includes('video-mode:resolution')) {
        prom.push(dispatch('fetchResolution', name));
      }
      if(commands.includes('video-mode:pixel-aspect-ratio')) {
        prom.push(dispatch('fetchPixelAspectRatio', name));
      }
      if(commands.includes('video-mode:color-primaries')) {
        prom.push(dispatch('fetchColorPrimaries', name));
      }
      if(commands.includes('video-mode:color-model')) {
        prom.push(dispatch('fetchColorModel', name));
      }
      if(commands.includes('video-mode:color-transfer-function')) {
        prom.push(dispatch('fetchColorTransferFunction', name));
      }
      if(commands.includes('video-mode:color-subsampling')) {
        prom.push(dispatch('fetchColorSubsampling', name));
      }
      if(commands.includes('video-mode:color-range')) {
        prom.push(dispatch('fetchColorRange', name));
      }
      if(commands.includes('video-mode:color-format')) {
        prom.push(dispatch('fetchColorFormat', name));
      }

      return Promise.all(prom);
    });
  },

  fetchFrameRate({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchFrameRate',
      commit,
      'SET_FRAME_RATE',
      name,
      'frame-rate'
    );
  },
  fetchFrameRateValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_FRAME_RATE',
      name,
      'frame-rate',
      cenitalCli.parseRational
    );
  },
  fetchFrameRateOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_FRAME_RATE',
      name,
      'frame-rate',
      cenitalCli.parseRational
    );
  },
 
  fetchResolution({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchResolution',
      commit,
      'SET_RESOLUTION',
      name,
      'resolution'
    );
  },
  fetchResolutionValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_RESOLUTION',
      name,
      'resolution',
      cenitalCli.parseResolution
    );
  },
  fetchResolutionOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_RESOLUTION',
      name,
      'resolution',
      cenitalCli.parseResolution
    );
  },

  fetchPixelAspectRatio({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchPixelAspectRatio',
      commit,
      'SET_PIXEL_ASPECT_RATIO',
      name,
      'pixel-aspect-ratio'
    );
  },
  fetchPixelAspectRatioValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_PIXEL_ASPECT_RATIO',
      name,
      'pixel-aspect-ratio',
      cenitalCli.parseRational
    );
  },
  fetchPixelAspectRatioOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_PIXEL_ASPECT_RATIO',
      name,
      'pixel-aspect-ratio',
      cenitalCli.parseRational
    );
  },

  fetchColorPrimaries({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchColorPrimaries',
      commit,
      'SET_COLOR_PRIMARIES',
      name,
      'color-primaries'
    );
  },
  fetchColorPrimariesValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_COLOR_PRIMARIES',
      name,
      'color-primaries',
      x => x
    );
  },
  fetchColorPrimariesOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_COLOR_PRIMARIES',
      name,
      'color-primaries',
      x => x
    );
  },

  fetchColorModel({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchColorModel',
      commit,
      'SET_COLOR_MODEL',
      name,
      'color-model',
    );
  },
  fetchColorModelValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_COLOR_MODEL',
      name,
      'color-model',
      x => x
    );
  },
  fetchColorModelOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_COLOR_MODEL',
      name,
      'color-model',
      x => x
    );
  },

  fetchColorTransferFunction({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchColorTransferFunction',
      commit,
      'SET_COLOR_TRANSFER_FUNCTION',
      name,
      'color-transfer-function',
    );
  },
  fetchColorTransferFunctionValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_COLOR_TRANSFER_FUNCTION',
      name,
      'color-transfer-function',
      x => x
    );
  },
  fetchColorTransferFunctionOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_COLOR_TRANSFER_FUNCTION',
      name,
      'color-transfer-function',
      x => x
    );
  },

  fetchColorSubsampling({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchColorSubsampling',
      commit,
      'SET_COLOR_SUBSAMPLING',
      name,
      'color-subsampling',
    );
  },
  fetchColorSubsamplingValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_COLOR_SUBSAMPLING',
      name,
      'color-subsampling',
      x => x
    );
  },
  fetchColorSubsamplingOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_COLOR_SUBSAMPLING',
      name,
      'color-subsampling',
      x => x
    );
  },

  fetchColorRange({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchColorRange',
      commit,
      'SET_COLOR_RANGE',
      name,
      'color-range',
    );
  },
  fetchColorRangeValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_COLOR_RANGE',
      name,
      'color-range',
      x => x
    );
  },
  fetchColorRangeOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_COLOR_RANGE',
      name,
      'color-range',
      x => x
    );
  },

  fetchColorFormat({ dispatch, commit }, name) {
    return fetchVideoModeAttribute(
      dispatch,
      'fetchColorFormat',
      commit,
      'SET_COLOR_FORMAT',
      name,
      'color-format',
    );
  },
  fetchColorFormatValue({ dispatch, commit }, name) {
    return fetchVideoModeAttributeValue(
      dispatch,
      commit,
      'SET_COLOR_FORMAT',
      name,
      'color-format',
      x => x
    );
  },
  fetchColorFormatOptions({ dispatch, commit }, name) {
    return fetchVideoModeAttributeOptions(
      dispatch,
      commit,
      'SET_COLOR_FORMAT',
      name,
      'color-format',
      x => x
    );
  },

};