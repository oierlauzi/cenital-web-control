import Vue from "vue"

export default {
  ADD(state, name) {
    const data = {
      scalingMode: null,
      scalingFilter: null,
      title: "",
      size: [0, 0],
      position: [0, 0],
      opacity: 1.0,
      resizable: false,
      decorated: false,
      monitors: [],
      currentMonitor: null,
    };

    //Create a empty window
    Vue.set(state.elements, name, data);
  },
  DELETE(state, name) {
    Vue.delete(state.elements, name);
  },
  RESET(state) {
    state.elements = Object.create(null);
  },


  SET_SCALING_MODE(state, { name, value }) {
    state.elements[name].scalingMode = value;
  },
  SET_SCALING_FILTER(state, { name, value }) {
    state.elements[name].scalingFilter = value;
  },
  SET_TITLE(state, { name, value }) {
    state.elements[name].title = value;
  },
  SET_SIZE(state, { name, value }) {
    state.elements[name].size = value;
  },
  SET_POSITION(state, { name, value }) {
    state.elements[name].position = value;
  },
  SET_OPACITY(state, { name, value }) {
    state.elements[name].opacity = value;
  },
  SET_RESIZABLE(state, { name, value }) {
    state.elements[name].resizable = value;
  },
  SET_DECORATED(state, { name, value }) {
    state.elements[name].decorated = value;
  },
  SET_MONITORS(state, { name, value }) {
    state.elements[name].monitors = value;
  },
  SET_CURRENT_MONITOR(state, { name, value }) {
    state.elements[name].currentMonitor = value;
  },
  

  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};