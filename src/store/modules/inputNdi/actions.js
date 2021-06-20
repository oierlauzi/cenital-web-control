function send(dispatch, tokens) {
  return dispatch('connection/send', tokens, { root: true });
}

export default {
  add({ dispatch }, name) {
    return send(dispatch, [
      'add',
      'input-ndi',
      name
    ]);
  },
  delete({ dispatch }, name) {
    return send(dispatch, [
      'rm',
      name
    ]);
  },

  setCurrentSource({ dispatch }, { name, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'source'
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
      if(type === 'input-ndi') {
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
      dispatch('fetchSources', name),
      dispatch('fetchCurrentSource', name)
    ]);
  },
  fetchSources({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'source',
      'enum'
    ]).then(sources => {
      commit('SET_SOURCES', { name, value: sources });
    });
  },
  fetchCurrentSource({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'source',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        //No source
        commit('SET_CURRENT_SOURCE', { name, value: null });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_CURRENT_SOURCE', { name, value: tokens[0] });
      }
    });
  },

};