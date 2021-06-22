import cenitalCli from '../../../api/cenitalCli'

function send(dispatch, tokens) {
  return dispatch('connection/send', tokens, { root: true });
}

function overlaySlotToCommand(slot) {
  switch(slot) {
    case 'upstream': return 'us-overlay';
    case 'downstream': return 'ds-overlay';
  }
}



export default {
  add({ dispatch }, name) {
    return send(dispatch, [
      'add',
      'mix-effect',
      name
    ]);
  },
  delete({ dispatch }, name) {
    return send(dispatch, [
      'rm',
      name
    ]);
  },


  setInputCount({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'input:count',
      'set',
      cenitalCli.generateInteger(value)
    ]);
  },


  setScalingMode({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-scaling:mode',
      'set',
      value
    ]);
  },
  setScalingFilter({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'video-scaling:filter',
      'set',
      value
    ]);
  },


  setProgram({ dispatch }, { name, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'pgm',
    ];

    if(value < 0) {
      payload.push('unset');
    } else {
      payload.push('set', cenitalCli.generateInteger(value));
    }

    return send(dispatch, payload);
  },
  setPreview({ dispatch }, { name, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'pvw',
    ];

    if(value < 0) {
      payload.push('unset');
    } else {
      payload.push('set', cenitalCli.generateInteger(value));
    }

    return send(dispatch, payload);
  },


  setTransitionBar({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'transition:bar',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setTransitionSelectedEffect({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'transition:effect',
      'set',
      value
    ]);
  },
  setTransitionDuration({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'transition:duration',
      'set',
      cenitalCli.generateDuration(value)
    ]);
  },
  setTransitionPreview({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'transition:pvw',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },

  cut({ dispatch }, name) {
    return send(dispatch, [
      'config',
      name,
      'cut'
    ]);   
  },
  transition({ dispatch }, name) {
    return send(dispatch, [
      'config',
      name,
      'transition'
    ]);   
  },



  setOverlayCount({ dispatch }, { name, slot, value }) {
    return send(dispatch, [
      'config',
      name,
      overlaySlotToCommand(slot) + ':count',
      'set',
      cenitalCli.generateInteger(value)
    ]);   
  },
  setOverlayVisible({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot) + ':ena',
      'set',
      cenitalCli.generateInteger(index),
      cenitalCli.generateBoolean(value)      
    ]);
  },
  setOverlayTransition({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot) + ':transition',
      'set',
      cenitalCli.generateInteger(index),
      cenitalCli.generateBoolean(value)    
    ]);
  },
  setOverlayPosition({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'transform:pos',
      'set',
      cenitalCli.generateVector3f(value)    
    ]);
  },
  setOverlayFeed({ dispatch }, { name, slot, index, feed, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      overlaySlotToCommand(slot) + ':feed',
    ];

    if(value < 0) {
      payload.push('unset', cenitalCli.generateInteger(index), feed);
    } else {
      payload.push('set', cenitalCli.generateInteger(index), feed, cenitalCli.generateInteger(value));
    }

    return send(dispatch, payload);
  },
  setOverlayRotation({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'transform:rot',
      'set',
      cenitalCli.generateVector4f(value)      
    ]);
  },
  setOverlayScale({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'transform:scale',
      'set',
      cenitalCli.generateVector3f(value)   
    ]);
  },
  setOverlayOpacity({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'blending:opacity',
      'set',
      cenitalCli.generateNumber(value)   
    ]);
  },
  setOverlayBlendingMode({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'blending:mode',
      'set',
      value
    ]);
  },
  setOverlayScalingMode({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'video-scaling:mode',
      'set',
      value
    ]);
  },
  setOverlayScalingFilter({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'video-scaling:filter',
      'set',
      value
    ]);
  },
  setLinearKeyEnabled({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'linear-key:ena',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setLinearKeyInverted({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'linear-key:inv',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setLinearKeyChannel({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'linear-key:ch',
      'set',
      value
    ]);
  },
  setLumaKeyEnabled({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:ena',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setLumaKeyInverted({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:inv',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setLumaKeyMinThreshold({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:min',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setLumaKeyMaxThreshold({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:max',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeyEnabled({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:ena',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setChromaKeyHue({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:hue:center',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeyHueSpan({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:hue:span',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeyHueSmoothness({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:hue:smooth',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeySaturationThreshold({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:sat:min',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeySaturationSmoothness({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:sat:smooth',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeyBrightnessThreshold({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:val:min',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setChromaKeyBrightnessSmoothness({ dispatch }, { name, slot, index, value }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:val:smooth',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },


  reset({ commit }) {
    commit('RESET');
  },
  fetch({ dispatch, commit, rootGetters }) {
    //Increment the fetching count
    commit('INC_FETCHING'); 

    //Start over
    commit('RESET');

    //Mixer should be already fetched. Get the elements from it
    const elements = rootGetters['mixer/getElements'];
    
    //Add all the elements which have the correct type
    const prom = elements.map(element => {
      const type = rootGetters['mixer/getElementType'](element);
      if(type === 'mix-effect') {
        commit('ADD', element);
        return dispatch('fetchElement', element);
      } else {
        return Promise.resolve();
      }
    });

    return Promise.all(prom).then(() => commit('DEC_FETCHING'));
  },
  fetchElement({ dispatch }, name) {
    return Promise.all([
      dispatch('fetchInputCount', name),

      dispatch('fetchScalingMode', name),
      dispatch('fetchScalingFilter', name),

      dispatch('fetchProgram', name),
      dispatch('fetchPreview', name),
      dispatch('fetchTransitionBar', name),
      dispatch('fetchTransitionDuration', name),
      dispatch('fetchTransitionPreview', name),
      dispatch('fetchTransitionEffects', name),
      dispatch('fetchTransitionSelectedEffect', name),

      dispatch('fetchOverlays', { name, slot: 'upstream' }),
      dispatch('fetchOverlays', { name, slot: 'downstream' }),
    ]);
  },



  fetchInputCount({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'input:count',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_INPUT_COUNT', { name, value: cenitalCli.parseInteger(tokens[0]) });
    });
  },



  fetchScalingMode({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'video-scaling:mode',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_SCALING_MODE', { name, value: tokens[0] });
    });
  },
  fetchScalingFilter({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'video-scaling:filter',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_SCALING_FILTER', { name, value: tokens[0] });
    });
  },



  fetchProgram({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'pgm',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        commit('SET_PROGRAM', { name, value: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_PROGRAM', { name, value: cenitalCli.parseInteger(tokens[0]) });
      }
    });
  },
  fetchPreview({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'pvw',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        commit('SET_PREVIEW', { name, value: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_PREVIEW', { name, value: cenitalCli.parseInteger(tokens[0]) });
      }
    });
  },



  fetchTransitionBar({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'transition:bar',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_BAR', { name, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchTransitionDuration({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'transition:duration',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_DURATION', { name, value: cenitalCli.parseDuration(tokens[0]) });
    });
  },
  fetchTransitionPreview({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'transition:pvw',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_PREVIEW', { name, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchTransitionEffects({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'transition:effect',
      'enum'
    ]).then(tokens => {
      commit('RESET_TRANSITION_EFFECTS', name); //Start over
      const prom = tokens.map(effect => {
        return send(dispatch, [
          'config', 
          name, 
          'transition:effect', 
          'config', 
          effect, 
          'type'
        ]).then(tokens => {
          console.assert(tokens.length === 1);
          commit('ADD_TRANSITION_EFFECT', { name, effect: effect, type: tokens[0] });
        }); //TODO fetch the effect itself
      });

      return Promise.all(prom);
    });
  },
  fetchTransitionSelectedEffect({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'transition:effect',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_SELECTED_EFFECT', { name, value: tokens[0] });
    });
  },



  fetchOverlays({ dispatch, commit }, { name, slot }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot) + ':count',
      'get'
    ]).then(tokens => {
      const count = cenitalCli.parseInteger(tokens[0]);
      commit('SET_OVERLAY_COUNT', { name, slot, value: count });

      const prom = new Array(count);
      for(let i = 0; i < count; ++i) {
        prom[i] = dispatch('fetchOverlay', { name, slot, index: i });
      }
      return Promise.all(prom);
    });
  },
  fetchOverlay({ dispatch }, { name, slot, index }) {
    return Promise.all([
      dispatch('fetchOverlayVisible', { name, slot, index }),
      dispatch('fetchOverlayTransition', { name, slot, index }),

      dispatch('fetchOverlayFeed', { name, slot, index, feed: 'fillIn' }),
      dispatch('fetchOverlayFeed', { name, slot, index, feed: 'keyIn' }),

      dispatch('fetchOverlayPosition', { name, slot, index }),
      dispatch('fetchOverlayRotation', { name, slot, index }),
      dispatch('fetchOverlayScale', { name, slot, index }),

      dispatch('fetchOverlayOpacity', { name, slot, index }),
      dispatch('fetchOverlayBlendingMode', { name, slot, index }),

      dispatch('fetchOverlayScalingMode', { name, slot, index }),
      dispatch('fetchOverlayScalingFilter', { name, slot, index }),

      dispatch('fetchLinearKeyEnabled', { name, slot, index }),
      dispatch('fetchLinearKeyInverted', { name, slot, index }),
      dispatch('fetchLinearKeyChannel', { name, slot, index }),

      dispatch('fetchLumaKeyEnabled', { name, slot, index }),
      dispatch('fetchLumaKeyInverted', { name, slot, index }),
      dispatch('fetchLumaKeyMinThreshold', { name, slot, index }),
      dispatch('fetchLumaKeyMaxThreshold', { name, slot, index }),
      
      dispatch('fetchChromaKeyEnabled', { name, slot, index }),
      dispatch('fetchChromaKeyHue', { name, slot, index }),
      dispatch('fetchChromaKeyHueSpan', { name, slot, index }),
      dispatch('fetchChromaKeyHueSmoothness', { name, slot, index }),
      dispatch('fetchChromaKeySaturationThreshold', { name, slot, index }),
      dispatch('fetchChromaKeySaturationSmoothness', { name, slot, index }),
      dispatch('fetchChromaKeyBrightnessThreshold', { name, slot, index }),
      dispatch('fetchChromaKeyBrightnessSmoothness', { name, slot, index }),
    ])
  },
  fetchOverlayVisible({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot) + ':ena',
      'get',
      cenitalCli.generateInteger(index)   
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_VISIBLE', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchOverlayTransition({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot) + ':transition',
      'get',
      cenitalCli.generateInteger(index)
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_TRANSITION', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchOverlayFeed({ dispatch, commit }, { name, slot, index, feed }) {
    return send(dispatch, [
      'config',
      name,
      overlaySlotToCommand(slot) + ':feed',
      'get',
      cenitalCli.generateInteger(index),
      feed
    ]).then(tokens => {
      if(tokens.length === 0) {
        commit('SET_OVERLAY_FEED', { name, slot, index, feed, value: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_OVERLAY_FEED', { name, slot, index, feed, value: cenitalCli.parseInteger(tokens[0]) });
      }
    });
  },
  fetchOverlayPosition({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'transform:pos',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_POSITION', { name, slot, index, value: cenitalCli.parseVector3f(tokens[0]) });
    });
  },
  fetchOverlayRotation({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'transform:rot',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_ROTATION', { name, slot, index, value: cenitalCli.parseVector4f(tokens[0]) });
    });
  },
  fetchOverlayScale({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'transform:scale',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_SCALE', { name, slot, index, value: cenitalCli.parseVector3f(tokens[0]) });
    });
  },
  fetchOverlayOpacity({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'blending:opacity',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_OPACITY', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchOverlayBlendingMode({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'blending:mode',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_BLENDING_MODE', { name, slot, index, value: tokens[0] });
    });
  },
  fetchOverlayScalingMode({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'video-scaling:mode',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_SCALING_MODE', { name, slot, index, value: tokens[0] });
    });
  },
  fetchOverlayScalingFilter({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'video-scaling:filter',
      'get'     
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_SCALING_FILTER', { name, slot, index, value: tokens[0] });
    });
  },
  fetchLinearKeyEnabled({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'linear-key:ena',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LINEAR_KEY_ENABLED', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchLinearKeyInverted({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'linear-key:inv',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LINEAR_KEY_INVERTED', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchLinearKeyChannel({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'linear-key:ch',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LINEAR_KEY_CHANNEL', { name, slot, index, value: tokens[0] });
    });
  },
  fetchLumaKeyEnabled({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:ena',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LUMA_KEY_ENABLED', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchLumaKeyInverted({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:inv',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LUMA_KEY_INVERTED', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchLumaKeyMinThreshold({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:min',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LUMA_KEY_MIN_THRESHOLD', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchLumaKeyMaxThreshold({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'luma-key:max',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_LUMA_KEY_MAX_THRESHOLD', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeyEnabled({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:ena',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_ENABLED', { name, slot, index, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchChromaKeyHue({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:hue:center',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_HUE', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeyHueSpan({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:hue:span',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_HUE_SPAN', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeyHueSmoothness({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:hue:smooth',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_HUE_SMOOTHNESS', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeySaturationThreshold({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:sat:min',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_SATURATION_THRESHOLD', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeySaturationSmoothness({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:sat:smooth',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_SATURATION_SMOOTHNESS', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeyBrightnessThreshold({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:val:min',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_BRIGHTNESS_THRESHOLD', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchChromaKeyBrightnessSmoothness({ dispatch, commit }, { name, slot, index }) {
    return send(dispatch, [
      'config', 
      name, 
      overlaySlotToCommand(slot),
      'config',
      cenitalCli.generateInteger(index),
      'chroma-key:val:smooth',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OVERLAY_CHROMA_KEY_BRIGHTNESS_SMOOTHNESS', { name, slot, index, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },

};