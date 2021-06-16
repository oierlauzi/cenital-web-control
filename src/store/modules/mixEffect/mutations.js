import Vue from "vue"

export default {
  ADD_MIX_EFFECT(state, name) {
    const data = {
      //Create a empty mix effect
      inputCount: 0,
      pgm: -1,
      pvw: -1,
      transitionBar: 0.0,
      transitionEffects: Object.create(null),
      transitionEffect: null,
      transitionDuration: 1,
      transitionPreview: false
    };

    //Push it onto the mix effect map
    Vue.set(state.mixEffects, name, data);
  },
  DELETE_MIX_EFFECT(state, name) {
    Vue.delete(state.mixEffects, name);
  },
  RESET_MIX_EFFECTS(state) {
    state.mixEffects = Object.create(null);
  },

  ADD_TRANSITION_EFFECT(state, { name, effect }) {
    const data = {};

    //Push it onto the mix effect transition effect map
    Vue.set(state.mixEffects[name].transitionEffects, effect, data);
  },
  DELETE_TRANSITION_EFFECT(state, { name, effect }) {
    Vue.delete(state.mixEffects[name].transitionEffects, effect);
  },
  RESET_TRANSITION_EFFECTS(state, name) {
    state.mixEffects[name].transitionEffects = Object.create(null);
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