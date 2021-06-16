import Vue from "vue"

export default {
  ADD_MIX_EFFECT(state, name) {
    const me = {
      //Create a empty mix effect
      inputCount: 0,
      pgm: -1,
      pvw: -1,
      transitionBar: 0.0,
      transitionEffect: null,
      transitionDuration: 1,
      transitionPreview: false
    };

    //Push it onto the mix effect map
    Vue.set(state.mixEffects, name, me);
  },
  DELETE_MIX_EFFECT(state, name) {
    Vue.delete(state.mixEffects, name);
  },
  RESET_MIX_EFFECTS(state) {
    state.mixEffects = Object.create(null);
  },

  SET_INPUT_COUNT(state, { name, count }) {
    state.mixEffects[name].inputCount = count;
  },
  SET_PROGRAM(state, { name, index }) {
    state.mixEffects[name].pgm = index;
  },
  SET_PREVIEW(state, { name, index }) {
    state.mixEffects[name].pvw = index;
  },
  SET_TRANSITION_BAR(state, { name, progress }) {
    state.mixEffects[name].transitionBar = progress;
  },
  SET_TRANSITION_EFFECT(state, { name, effect }) {
    state.mixEffects[name].transitionEffect = effect;
  },
  SET_TRANSITION_DURATION(state, { name, duration }) {
    state.mixEffects[name].transitionDuration = duration;
  },
  SET_TRANSITION_PREVIEW(state, { name, enabled }) {
    state.mixEffects[name].transitionPreview = enabled;
  },
};