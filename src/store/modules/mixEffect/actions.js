import cenitalCli from '../../../api/cenitalCli'

export default {
  add({ dispatch }, name) {
    return dispatch(
      'connection/send', 
      [
        'add',
        'mix-effect',
        name
      ], 
      { root: true }
    );
  },
  delete({ dispatch }, name) {
    return dispatch(
      'connection/send', 
      [
        'rm',
        name
      ], 
      { root: true }
    );
  },
  setInputCount({ dispatch }, { name, count }) {
    return dispatch(
      'connection/send', 
      [
        'config',
        name,
        'input:count',
        'set',
        cenitalCli.generateInteger(count)
      ], 
      { root: true }
    );
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

    return dispatch('connection/send', payload, { root: true });
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

    return dispatch('connection/send', payload, { root: true });
  },
  setTransitionBar({ dispatch }, { name, progress }) {
    return dispatch(
      'connection/sendNoAck', //As fast as possible
      [
        'config',
        name,
        'transition:bar',
        'set',
        cenitalCli.generateNumber(progress)
      ], 
      { root: true }
    );
  },
  setTransitionEffect({ dispatch }, { name, effect }) {
    return dispatch(
      'connection/send', 
      [
        'config',
        name,
        'transition:effect',
        'set',
        effect
      ], 
      { root: true }
    );
  },
  setTransitionDuration({ dispatch }, { name, duration }) {
    return dispatch(
      'connection/send', 
      [
        'config',
        name,
        'transition:duration',
        'set',
        cenitalCli.generateDuration(duration)
      ], 
      { root: true }
    );
  },
  setTransitionPreview({ dispatch }, { name, enabled }) {
    return dispatch(
      'connection/send', 
      [
        'config',
        name,
        'transition:pvw',
        'set',
        cenitalCli.generateBoolean(enabled)
      ], 
      { root: true }
    );
  },

  cut({ dispatch }, name) {
    return dispatch(
      'connection/send', 
      [
        'config',
        name,
        'cut'
      ], 
      { root: true }
    );   
  },
  transition({ dispatch }, name) {
    return dispatch(
      'connection/send', 
      [
        'config',
        name,
        'transition'
      ], 
      { root: true }
    );   
  },



  reset({ commit }) {
    commit('RESET_MIX_EFFECTS');
  },
  fetch({ dispatch, commit }) {
    //Increment the fetching count
    commit('INC_FETCHING'); 

    return dispatch('connection/send', ['enum'], { root: true }) //TODO use mixer's elements once fetched
    .then(elements => {
      //Start over
      commit('RESET_MIX_EFFECTS'); 

      //For each element query its type in parallel
      const prom = elements.map(element => {
        return dispatch('connection/send', ['config', element, 'type'], { root: true })
        .then(type => {
          console.assert(type.length === 1);
          
          //If it is a mix effect, query its attributes
          if(type[0] === 'mix-effect') {
            //Only add if it is a mix-effect
            commit('ADD_MIX_EFFECT', element);
            
            //Fetch its contents
            return dispatch('fetchMixEffect', element);
          } else {
            return Promise.resolve();
          }
        });
      });

      return Promise.all(prom);
    })
    .then(() => commit('DEC_FETCHING'));
  },
  fetchMixEffect({ dispatch }, name) {
    return Promise.all([
      dispatch('fetchInputCount', name),
      dispatch('fetchProgram', name),
      dispatch('fetchPreview', name),
      dispatch('fetchTransitionBar', name),
      dispatch('fetchTransitionEffects', name),
      dispatch('fetchTransitionEffect', name),
      dispatch('fetchTransitionDuration', name),
      dispatch('fetchTransitionPreview', name),
    ]);
  },
  fetchInputCount({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'input:count',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_INPUT_COUNT', { name, count: cenitalCli.parseInteger(tokens[0]) });
    });
  },
  fetchProgram({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'pgm',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      if(tokens.length === 0) {
        commit('SET_PROGRAM', { name, index: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_PROGRAM', { name, index: cenitalCli.parseInteger(tokens[0]) });
      }
    });
  },
  fetchPreview({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'pvw',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      if(tokens.length === 0) {
        commit('SET_PREVIEW', { name, index: -1 });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_PREVIEW', { name, index: cenitalCli.parseInteger(tokens[0]) });
      }
    });
  },

  fetchTransitionBar({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'transition:bar',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_BAR', { name, progress: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchTransitionEffects({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'transition:effect',
        'enum'
      ],
      { root: true }
    )
    .then(tokens => {
      commit('RESET_TRANSITION_EFFECTS', name); //Start over
      tokens.forEach(effect => {
        commit('ADD_TRANSITION_EFFECT', { name, effect: effect });
      });

     
    });
  },
  fetchTransitionEffect({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'transition:effect',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_EFFECT', { name, effect: tokens[0] });
    });
  },
  fetchTransitionDuration({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'transition:duration',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_DURATION', { name, duration: cenitalCli.parseDuration(tokens[0]) });
    });
  },
  fetchTransitionPreview({ dispatch, commit }, name) {
    return dispatch(
      'connection/send', 
      [
        'config', 
        name, 
        'transition:pvw',
        'get'
      ],
      { root: true }
    )
    .then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_TRANSITION_PREVIEW', { name, preview: cenitalCli.parseBoolean(tokens[0]) });
    });
  },


};