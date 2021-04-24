import Vue from "vue"

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
  SET_INPUT_COUNT(state, { name, inputCount }) {
    state.mixEffects[name].inputs.length = inputCount;
  },
  SET_INPUT(state, { name, index, input }) {
    state.mixEffects[name].inputs[index] = input;
  },
  SET_PROGRAM(state, { name, index }) {
    state.mixEffects[name].pgm = index;
  },
  SET_PREVIEW(state, { name, index }) {
    state.mixEffects[name].pvw = index;
  },
};