import Vue from "vue"

const defaultKeyerData = {
  fillIn: -1,
  keyIn: -1,
  position: [0.0, 0.0, 0.0],
  rotation: [0.0, 0.0, 0.0],
  scale: [1.0, 1.0, 1.0],
  opacity: 1.0,
  blendingMode: null,
  scalingMode: null,
  scalingFilter: null,
};



function resize(arr, size, value) {
  //Insert new elements if necessary
  while(arr.length < size) {
    arr.push(Object.assign({}, value));
  }

  //Remove elements if necessary
  while(arr.length > size) {
    arr.pop();
  }
}


export default {
  ADD_MIX_EFFECT(state, name) {
    const data = {
      inputCount: 0,
      scalingMode: null,
      scalingFilter: null,
      pgm: -1,
      pvw: -1,
      transitionBar: 0.0,
      transitionEffects: Object.create(null),
      transitionEffect: null,
      transitionDuration: 1.0,
      transitionPreview: false,
      usOverlays: [],
      dsOverlays: []
    };

    //Create a empty mix effect
    Vue.set(state.mixEffects, name, data);
  },
  DELETE_MIX_EFFECT(state, name) {
    Vue.delete(state.mixEffects, name);
  },
  RESET_MIX_EFFECTS(state) {
    state.mixEffects = Object.create(null);
  },



  ADD_TRANSITION_EFFECT(state, { name, effect, type }) {
    const data = {
      type: type
    };

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
  SET_UPSTREAM_OVERLAY_COUNT(state, { name, count }) {
    resize(state.mixEffects[name].usOverlays, count, defaultKeyerData);
  },
  SET_DOWNSTREAM_OVERLAY_COUNT(state, { name, count }) {
    resize(state.mixEffects[name].dsOverlays, count, defaultKeyerData);
  },

  SET_SCALING_MODE(state, { name, mode }) {
    state.mixEffects[name].scalingMode = mode;
  },
  SET_SCALING_FILTER(state, { name, filter }) {
    state.mixEffects[name].scalingFilter = filter;
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


  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};