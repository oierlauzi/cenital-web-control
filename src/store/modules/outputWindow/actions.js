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
  setMonitor({ dispatch }, { name, value }) {
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
    commit('RESET_OUTPUT_WINDOWS');
  },
  fetch({ dispatch, commit }) {
    //Increment the fetching count
    commit('INC_FETCHING'); 

    return send(dispatch, ['enum']).then(elements => { //TODO use mixer's elements once fetched.
      //Start over
      commit('RESET_OUTPUT_WINDOWS'); 

      //For each element query its type in parallel
      const prom = elements.map(element => {
        return send(dispatch, ['config', element, 'type']).then(type => {
          console.assert(type.length === 1);
          
          //If it is a output window, query its attributes
          if(type[0] === 'output-window') {
            //Only add if it is a output window
            commit('ADD_OUTPUT_WINDOW', element);
            
            //Fetch its contents
            return dispatch('fetchOutputWindow', element);
          } else {
            return Promise.resolve();
          }
        });
      });

      return Promise.all(prom);
    }).then(() => commit('DEC_FETCHING'));
  },
  fetchOutputWindow({ dispatch }, name) {
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
      dispatch('fetchMonitor', name)
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
  fetchMonitor({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'monitor',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        //No monitor
        commit('SET_MONITOR', { name, value: null });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_MONITOR', { name, value: tokens[0] });
      }
    });
  },

};