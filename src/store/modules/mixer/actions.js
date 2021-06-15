export default {
  connect({ dispatch }, { dstElement, dstInput, srcElement, srcOutput }) {
    return dispatch(
      'connection/send', 
      [
        'connection',
        'set',
        dstElement,
        dstInput,
        srcElement,
        srcOutput
      ], 
      { root: true }
    );
  },
  disconnect({ dispatch }, { dstElement, dstInput }) {
    return dispatch(
      'connection/send', 
      [
        'connection',
        'unset',
        dstElement,
        dstInput
      ], 
      { root: true }
    );
  },

  reset({ commit }) {
    commit('RESET');
  },
  fetch({ dispatch, getters, commit }) {
    return dispatch('connection/send', ['enum'], { root: true })
    .then(elements => {
      elements.forEach(element => commit('ADD_ELEMENT', element));
    })
    .then(() => {
      const elements = getters['getElements'];
      const prom = elements.map(element => {
        return dispatch('fetchElement', element);
      });

      return Promise.all(prom);
    });
  },
  fetchElement({ dispatch }, element) {
    const inputsPromise = dispatch('fetchElementInputs', element);
    const outputsPromise = dispatch('fetchElementOutputs', element);

    return Promise.all([inputsPromise, outputsPromise]);
  },
  fetchElementInputs({ dispatch, getters, commit }, element) {
    return dispatch('connection/send', ['connection:dst', 'enum', element], { root: true })

    .then(inputs => {
      inputs.forEach(input => commit('ADD_INPUT', { element, input }));
    })
    .then(() => {
      const inputs = getters['getElementInputs'](element);
      const prom = inputs.map(input => {
        return dispatch('fetchElementInputSource', { element, input });
      });

      return Promise.all(prom);
    });
  },
  fetchElementOutputs({ dispatch, commit }, element) {
    return dispatch('connection/send', ['connection:src', 'enum', element], { root: true })
    .then(outputs => {
      outputs.forEach(output => commit('ADD_OUTPUT', { element, output }));
    });
  },
  fetchElementInputSource({ dispatch, commit }, { element, input }) {
    return dispatch('connection/send', ['connection', 'get', element, input], { root: true })
    .then(source => {
      if(source.length === 2) {
        commit('CONNECT', { dstElement: element, dstInput: input, srcElement: source[0], srcOutput: source[1] });
      } else {
        commit('DISCONNECT', { dstElement: element, dstInput: input });
      }
    });
  },
};