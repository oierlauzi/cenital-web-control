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
  ADD(state, name) {
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
    Vue.set(state.elements, name, data);
  },
  DELETE(state, name) {
    Vue.delete(state.elements, name);
  },
  RESET(state) {
    state.elements = Object.create(null);
  },



  ADD_TRANSITION_EFFECT(state, { name, effect, type }) {
    const data = {
      type: type
    };

    //Push it onto the mix effect transition effect map
    Vue.set(state.elements[name].transitionEffects, effect, data);
  },
  DELETE_TRANSITION_EFFECT(state, { name, effect }) {
    Vue.delete(state.elements[name].transitionEffects, effect);
  },
  RESET_TRANSITION_EFFECTS(state, name) {
    state.elements[name].transitionEffects = Object.create(null);
  },


  SET_INPUT_COUNT(state, { name, count }) {
    state.elements[name].inputCount = count;
  },
  SET_UPSTREAM_OVERLAY_COUNT(state, { name, count }) {
    resize(state.elements[name].usOverlays, count, defaultKeyerData);
  },
  SET_DOWNSTREAM_OVERLAY_COUNT(state, { name, count }) {
    resize(state.elements[name].dsOverlays, count, defaultKeyerData);
  },

  SET_SCALING_MODE(state, { name, mode }) {
    state.elements[name].scalingMode = mode;
  },
  SET_SCALING_FILTER(state, { name, filter }) {
    state.elements[name].scalingFilter = filter;
  },

  SET_PROGRAM(state, { name, index }) {
    state.elements[name].pgm = index;
  },
  SET_PREVIEW(state, { name, index }) {
    state.elements[name].pvw = index;
  },
  SET_TRANSITION_BAR(state, { name, progress }) {
    state.elements[name].transitionBar = progress;
  },
  SET_TRANSITION_EFFECT(state, { name, effect }) {
    state.elements[name].transitionEffect = effect;
  },
  SET_TRANSITION_DURATION(state, { name, duration }) {
    state.elements[name].transitionDuration = duration;
  },
  SET_TRANSITION_PREVIEW(state, { name, enabled }) {
    state.elements[name].transitionPreview = enabled;
  },


  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};