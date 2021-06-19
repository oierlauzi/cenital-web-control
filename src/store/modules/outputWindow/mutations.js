import Vue from "vue"

export default {
  ADD_OUTPUT_WINDOW(state, name) {
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
      monitor: null,
    };

    //Create a empty mix effect
    Vue.set(state.outputWindows, name, data);
  },
  DELETE_OUTPUT_WINDOW(state, name) {
    Vue.delete(state.outputWindows, name);
  },
  RESET_OUTPUT_WINDOWS(state) {
    state.outputWindows = Object.create(null);
  },


  SET_SCALING_MODE(state, { name, value }) {
    state.outputWindows[name].scalingMode = value;
  },
  SET_SCALING_FILTER(state, { name, value }) {
    state.outputWindows[name].scalingFilter = value;
  },
  SET_TITLE(state, { name, value }) {
    state.outputWindows[name].title = value;
  },
  SET_SIZE(state, { name, value }) {
    state.outputWindows[name].size = value;
  },
  SET_POSITION(state, { name, value }) {
    state.outputWindows[name].position = value;
  },
  SET_OPACITY(state, { name, value }) {
    state.outputWindows[name].opacity = value;
  },
  SET_RESIZABLE(state, { name, value }) {
    state.outputWindows[name].resizable = value;
  },
  SET_DECORATED(state, { name, value }) {
    state.outputWindows[name].decorated = value;
  },
  SET_MONITORS(state, { name, value }) {
    state.outputWindows[name].monitors = value;
  },
  SET_MONITOR(state, { name, value }) {
    state.outputWindows[name].monitor = value;
  },
  

  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};