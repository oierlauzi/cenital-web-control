import cenitalCli from '../../../api/cenitalCli'

function send(dispatch, tokens) {
  return dispatch('connection/send', tokens, { root: true });
}

export default {
  add({ dispatch }, name) {
    return send(dispatch, [
      'add',
      'input-media-player',
      name
    ]);
  },
  delete({ dispatch }, name) {
    return send(dispatch, [
      'rm',
      name
    ]);
  },


  addClip({ dispatch }, { name, clip }) {
    return send(dispatch, [
      'config',
      name,
      'clip',
      'add',
      clip
    ]);
  },
  deleteClip({ dispatch }, { name, clip }) {
    return send(dispatch, [
      'config',
      name,
      'clip',
      'rm',
      clip
    ]);
  },
  setClipState({ dispatch }, { name, clip, value }) {
    return send(dispatch, [
      'config',
      name,
      'clip',
      'config',
      clip,
      'state',
      'set',
      value
    ]);
  },
  setClipRepeat({ dispatch }, { name, clip, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'clip',
      'config',
      clip,
      'repeat',
    ];

    if(value) {
      payload.push('set', value);
    } else {
      payload.push('unset');
    }

    return send(dispatch, payload);
  },
  setClipSpeed({ dispatch }, { name, clip, value }) {
    return send(dispatch, [
      'config',
      name,
      'clip',
      'config',
      clip,
      'speed',
      'set',
      cenitalCli.generateNumber(value)
    ]);
  },
  setClipTime({ dispatch }, { name, clip, value }) {
    return send(dispatch, [
      'config',
      name,
      'clip',
      'config',
      clip,
      'time',
      'set',
      cenitalCli.generateDuration(value)
    ]);
  },


  setCurrentClip({ dispatch }, { name, value }) {
    //Elaborate the payload depending on if it is setting or unsettling
    const payload = [
      'config',
      name,
      'clip'
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
      if(type === 'input-media-player') {
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
      dispatch('fetchClips', name),
      dispatch('fetchCurrentClip', name)
    ]);
  },
  fetchClips({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'enum'
    ]).then(clips => {
      //Start over
      commit('RESET_CLIPS', name);

      const prom = clips.map(clip => {
        commit('ADD_CLIP', { name, clip });
        return dispatch('fetchClip', { name, clip });
      });

      return Promise.all(prom);
    });
  },
  fetchClip({ dispatch }, { name, clip }) {
    return Promise.all([
      dispatch('fetchClipState', { name, clip }),
      dispatch('fetchClipRepeat', { name, clip }),
      dispatch('fetchClipSpeed', { name, clip }),
      dispatch('fetchClipDuration', { name, clip }),
      dispatch('fetchClipTime', { name, clip }),
    ]);
  },
  fetchClipState({ dispatch, commit }, { name, clip }) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'config',
      clip,
      'state',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_CLIP_STATE', { name, clip, value: tokens[0] });
    });
  },
  fetchClipRepeat({ dispatch, commit }, { name, clip }) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'config',
      clip,
      'repeat',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        //No source
        commit('SET_CLIP_REPEAT', { name, clip, value: null });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_CLIP_REPEAT', { name, clip, value: tokens[0] });
      }
    });
  },
  fetchClipSpeed({ dispatch, commit }, { name, clip }) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'config',
      clip,
      'speed',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_CLIP_SPEED', { name, clip, value: cenitalCli.parseNumber(tokens[0]) });
    });
  },
  fetchClipDuration({ dispatch, commit }, { name, clip }) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'config',
      clip,
      'duration',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_CLIP_DURATION', { name, clip, value: cenitalCli.parseDuration(tokens[0]) });
    });
  },
  fetchClipTime({ dispatch, commit }, { name, clip }) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'config',
      clip,
      'time',
      'get'
    ]).then(tokens => {
      console.assert(tokens.length === 1);
      commit('SET_CLIP_TIME', { name, clip, value: cenitalCli.parseDuration(tokens[0]) });
    });
  },
  fetchCurrentClip({ dispatch, commit }, name) {
    return send(dispatch, [
      'config', 
      name, 
      'clip',
      'get'
    ]).then(tokens => {
      if(tokens.length === 0) {
        //No source
        commit('SET_CURRENT_CLIP', { name, value: null });
      } else {
        console.assert(tokens.length === 1);
        commit('SET_CURRENT_CLIP', { name, value: tokens[0] });
      }
    });
  },

};