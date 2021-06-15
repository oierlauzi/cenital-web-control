import Vue from "vue"

export default {
  ADD(state, name) {
    const me = {
      //Create a empty mix effect
      inputCount: 0,
      pgm: -1,
      pvw: -1,
      transitionType: "Mix",
      transitionDur: 1000,
      transitionPrev: false
    };

    //Push it onto the mix effect map
    Vue.set(state.mixEffects, name, me);
  },
  DELETE(state, name) {
    Vue.delete(state.mixEffects, name);
  },
  SET_INPUT_COUNT(state, { name, inputCount }) {
    state.mixEffects[name].inputCount = inputCount;
  },
  SET_PROGRAM(state, { name, index }) {
    state.mixEffects[name].pgm = index;
  },
  SET_PREVIEW(state, { name, index }) {
    state.mixEffects[name].pvw = index;
  },
  SET_TRANSITION_TYPE(state, { name, type }) {
    state.mixEffects[name].transitionType = type;
  },
  SET_TRANSITION_DURATION(state, { name, dur }) {
    state.mixEffects[name].transitionDur = dur;
  },
  SET_TRANSITION_PREVIEW(state, { name, prev }) {
    state.mixEffects[name].transitionPrev = prev;
  },
};