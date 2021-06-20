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

  setInputCount({ dispatch }, { name, count }) {
    return send(dispatch, [
      'config',
      name,
      'input:count',
      'set',
      cenitalCli.generateInteger(count)
    ]);
  },

  setScalingMode({ dispatch }, { name, mode }) {
    return send(dispatch, [
      'config',
      name,
      'video-scaling:mode',
      'set',
      mode
    ]);
  },
  setScalingFilter({ dispatch }, { name, filter }) {
    return send(dispatch, [
      'config',
      name,
      'video-scaling:filter',
      'set',
      filter
    ]);
  },

  setProgram({ dispatch }, { name, index }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'pgm',
    ];

    if(index < 0) {
      payload.push('unset');
    } else {
      payload.push('set', cenitalCli.generateInteger(index));
    }

    return send(dispatch, payload);
  },
  setPreview({ dispatch }, { name, index }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'pvw',
    ];

    if(index < 0) {
      payload.push('unset');
    } else {
      payload.push('set', cenitalCli.generateInteger(index));
    }

    return send(dispatch, payload);
  },
  setTransitionBar({ dispatch }, { name, progress }) {
    return send(dispatch, [
      'config',
      name,
      'transition:bar',
      'set',
      cenitalCli.generateNumber(progress)
    ]);
  },
  setTransitionEffect({ dispatch }, { name, effect }) {
    return send(dispatch, [
      'config',
      name,
      'transition:effect',
      'set',
      effect
    ]);
  },
  setTransitionDuration({ dispatch }, { name, duration }) {
    return send(dispatch, [
      'config',
      name,
      'transition:duration',
      'set',
      cenitalCli.generateDuration(duration)
    ]);
  },
  setTransitionPreview({ dispatch }, { name, enabled }) {
    return send(dispatch, [
      'config',
      name,
      'transition:pvw',
      'set',
      cenitalCli.generateBoolean(enabled)
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

  setUpstreamOverlayCount({ dispatch }, { name, count }) {
    return send(dispatch, [
      'config',
      name,
      'us-overlay:count',
      'set',
      cenitalCli.generateInteger(count)
    ]);   
  },
  setDownstreamOverlayCount({ dispatch }, { name, count }) {
    return send(dispatch, [
      'config',
      name,
      'ds-overlay:count',
      'set',
      cenitalCli.generateInteger(count)
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
      dispatch('fetchTransitionEffects', name),
      dispatch('fetchTransitionEffect', name),
      dispatch('fetchTransitionDuration', name),
      dispatch('fetchTransitionPreview', name),
      dispatch('fetchUpstreamOverlays', name),
      dispatch('fetchDownstreamOverlays', name),
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
      commit('SET_INPUT_COUNT', { name, count: cenitalCli.parseInteger(tokens[0]) });
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
      commit('SET_SCALING_MODE', { name, mode: tokens[0] });
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
      commit('SET_SCALING_FILTER', { name, filter: tokens[0] });
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
        commit('SET_PROGRAM', { name, index: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_PROGRAM', { name, index: cenitalCli.parseInteger(tokens[0]) });
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
        commit('SET_PREVIEW', { name, index: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_PREVIEW', { name, index: cenitalCli.parseInteger(tokens[0]) });
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
      commit('SET_TRANSITION_BAR', { name, progress: cenitalCli.parseNumber(tokens[0]) });
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
      tokens.forEach(effect => {
        commit('ADD_TRANSITION_EFFECT', { name, effect: effect });
      });
    });
  },
  fetchTransitionEffect({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'transition:effect',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_EFFECT', { name, effect: tokens[0] });
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
      commit('SET_TRANSITION_DURATION', { name, duration: cenitalCli.parseDuration(tokens[0]) });
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
      commit('SET_TRANSITION_PREVIEW', { name, enabled: cenitalCli.parseBoolean(tokens[0]) });
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
      commit('SET_UPSTREAM_OVERLAY_COUNT', { name, count });

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
      commit('SET_DOWNSTREAM_OVERLAY_COUNT', { name, count });

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