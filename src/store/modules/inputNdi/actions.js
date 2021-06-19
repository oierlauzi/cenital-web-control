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

  setSource({ dispatch }, { name, value }) {
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
  fetch({ dispatch, commit }) {
    //Increment the fetching count
    commit('INC_FETCHING'); 

    return send(dispatch, ['enum']).then(elements => { //TODO use mixer's elements once fetched.
      //Start over
      commit('RESET'); 

      //For each element query its type in parallel
      const prom = elements.map(element => {
        return send(dispatch, ['config', element, 'type']).then(type => {
          console.assert(type.length === 1);
          
          //If it is a ndi input, query its attributes
          if(type[0] === 'input-ndi') {
            //Only add if it is a input-ndi
            commit('ADD', element);
            
            //Fetch its contents
            return dispatch('fetchElement', element);
          } else {
            return Promise.resolve();
          }
        });
      });

      return Promise.all(prom);
    }).then(() => commit('DEC_FETCHING'));
  },
  fetchElement({ dispatch }, name) {
    return Promise.all([
      dispatch('fetchSources', name),
      dispatch('fetchSource', name)
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
  fetchSource({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'source',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        //No source
        commit('SET_SOURCE', { name, value: null });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_SOURCE', { name, value: tokens[0] });
      }
    });
  },

};