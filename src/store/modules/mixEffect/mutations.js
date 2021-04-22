export default {
  ADD(state, name) {
    const me = {
      //Create a empty mix effect
      inputs: [],
      pgm: -1,
      pvw: -1,
    };

    //Push it onto the mix effect map
    Vue.set(state.mixEffects, name, me);
  },
  DELETE(state, name) {
    Vue.delete(state.mixEffects, name);
  },
  SET_INPUT_COUNT(state, payload) {
    state.mixEffects[payload.name].inputs.length = payload.inputCount;
  },
  SET_INPUT(state, payload) {
    state.mixEffects[payload.name].inputs[payload.index] = payload.input;
  },
  SET_PROGRAM(state, payload) {
    state.mixEffects[payload.name].pgm = payload.index
  },
  SET_PREVIEW(state, payload) {
    state.mixEffects[payload.name].pvw = payload.index
  },
};