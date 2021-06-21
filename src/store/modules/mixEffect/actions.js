import cenitalCli from '../../../api/cenitalCli'

function send(dispatch, tokens) {
  return dispatch('connection/send', tokens, { root: true });
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
    let slotArg = "";
    switch(slot) {
      case 'upstream':
        slotArg = 'us-overlay:count';
        break;

      case 'downstream':
        slotArg = 'ds-overlay:count';
        break;

      default:
        console.assert(false);
        break;
    }

    return send(dispatch, [
      'config',
      name,
      slotArg,
      'set',
      cenitalCli.generateInteger(value)
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

      dispatch('fetchOverlays', name),
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



  fetchOverlays({ dispatch }, name) {
    return Promise.all([
      dispatch('fetchUpstreamOverlays', name),
      dispatch('fetchDownstreamOverlays', name)
    ]);
  },
  fetchUpstreamOverlays({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'us-overlay:count',
      'get'
    ]).then(tokens => {
      const count = cenitalCli.parseInteger(tokens[0]);
      commit('SET_OVERLAY_COUNT', { name, slot: 'upstream', value: count });

      const prom = new Array(count);
      for(let i = 0; i < count; ++i) {
        prom[i] = dispatch('fetchUpstreamOverlay', { name: name, index: i });
      }
      return Promise.all(prom);
    });
  },
  fetchDownstreamOverlays({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'ds-overlay:count',
      'get'
    ]).then(tokens => {
      const count = cenitalCli.parseInteger(tokens[0]);
      commit('SET_OVERLAY_COUNT', { name, slot: 'downstream', value: count });

      const prom = new Array(count);
      for(let i = 0; i < count; ++i) {
        prom[i] = dispatch('fetchDownstreamOverlay', { name: name, index: i });
      }
      return Promise.all(prom);
    });
  },
  //eslint-disable-next-line no-unused-vars
  fetchUpstreamOverlay({ dispatch }, { name, index }) {
    return Promise.resolve(); //TODO
  },
  //eslint-disable-next-line no-unused-vars
  fetchDownstreamOverlay({ dispatch }, { name, index }) {
    return Promise.resolve(); //TODO
  }

};