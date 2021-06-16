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
    commit('RESET_ELEMENTS');
  },
  fetch({ dispatch, commit }) {
    return dispatch('connection/send', ['enum'], { root: true })
    .then(elements => {
      //Start over
      commit('RESET_ELEMENTS');
      
      //Fetch the members of each element in parallel
      const prom = elements.map(element => {
        commit('ADD_ELEMENT', element); //Add all the elements
        return dispatch('fetchElement', element);
      });

      return Promise.all(prom);
    });
  },
  fetchElement({ dispatch }, element) {
    //Fetch input and outputs
    return Promise.all([
      dispatch('fetchElementInputs', element),
      dispatch('fetchElementOutputs', element)
    ]);
  },
  fetchElementInputs({ dispatch, getters, commit }, element) {
    return dispatch('connection/send', ['connection:dst', 'enum', element], { root: true })
    .then(inputs => {
      commit('RESET_INPUTS', element); //Start over
      inputs.forEach(input => commit('ADD_INPUT', { element, input })); //Add all inputs
    })
    .then(() => {
      //For each input fetch its source
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
      commit('RESET_OUTPUTS', element); //Start over
      outputs.forEach(output => commit('ADD_OUTPUT', { element, output })); //Add all outputs
    });
  },
  fetchElementInputSource({ dispatch, commit }, { element, input }) {
    return dispatch('connection/send', ['connection', 'get', element, input], { root: true })
    .then(source => {
      if(source.length === 0) {
        commit('DISCONNECT', { dstElement: element, dstInput: input });
      } else {
        console.assert(source.length === 2);
        commit('CONNECT', { dstElement: element, dstInput: input, srcElement: source[0], srcOutput: source[1] });
      }
    });
  },
};