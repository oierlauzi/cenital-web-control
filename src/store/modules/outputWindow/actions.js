import cenitalCli from '../../../api/cenitalCli'

function send(dispatch, tokens) {
  return dispatch('connection/send', tokens, { root: true });
}

export default {
  add({ dispatch }, { name, size }) {
    return send(dispatch, [
      'add',
      'output-window',
      name,
      cenitalCli.generateVector2i(size)
    ]);
  },
  delete({ dispatch }, name) {
    return send(dispatch, [
      'rm',
      name
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

  setTitle({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'title',
      'set',
      value
    ]);
  },
  setSize({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'size',
      'set',
      cenitalCli.generateVector2i(value)
    ]);
  },
  setPosition({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'position',
      'set',
      cenitalCli.generateVector2i(value)
    ]);
  },
  setOpacity({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'opacity',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setResizable({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'resizable',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setDecorated({ dispatch }, { name, value }) {
    return send(dispatch, [
      'config',
      name,
      'decorated',
      'set',
      cenitalCli.generateBoolean(value)
    ]);
  },
  setCurrentMonitor({ dispatch }, { name, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'monitor'
    ];

    if(value) {
      payload.push('set', value);
    } else {
      payload.push('unset');
    }

    return send(dispatch, payload);
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
      if(type === 'output-window') {
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
      dispatch('fetchScalingMode', name),
      dispatch('fetchScalingFilter', name),
      dispatch('fetchTitle', name),
      dispatch('fetchSize', name),
      dispatch('fetchPosition', name),
      dispatch('fetchOpacity', name),
      dispatch('fetchResizable', name),
      dispatch('fetchDecorated', name),
      dispatch('fetchMonitors', name),
      dispatch('fetchCurrentMonitor', name)
    ]);
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
  fetchTitle({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'title',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TITLE', { name, value: tokens[0] });
    });
  },
  fetchSize({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'size',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_SIZE', { name, value: cenitalCli.parseVector2i(tokens[0]) });
    });
  },
  fetchPosition({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'position',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_POSITION', { name, value: cenitalCli.parseVector2i(tokens[0]) });
    });
  },
  fetchOpacity({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'opacity',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_OPACITY', { name, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchResizable({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'resizable',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_RESIZABLE', { name, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchDecorated({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'decorated',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_DECORATED', { name, value: cenitalCli.parseBoolean(tokens[0]) });
    });
  },
  fetchMonitors({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'monitor',
      'enum'
    ]).then(monitors => {
      commit('SET_MONITORS', { name, value: monitors });
    });
  },
  fetchCurrentMonitor({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'monitor',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        //No monitor
        commit('SET_CURRENT_MONITOR', { name, value: null });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_CURRENT_MONITOR', { name, value: tokens[0] });
      }
    });
  },

};