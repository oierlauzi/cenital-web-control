import Vue from "vue"

export default {
  ADD(state, name) {
    const data = {
      sources: [],
      source: null,
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


  SET_SOURCES(state, { name, value }) {
    state.elements[name].sources = value;
  },
  SET_SOURCE(state, { name, value }) {
    state.elements[name].source = value;
  },
  

  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};