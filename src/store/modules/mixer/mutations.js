import Vue from "vue"

export default {
  RESET(state) {
    state.elements = Object.create(null);
  },

  ADD_ELEMENT(state, name) {
    const data = {
      inputs: Object.create(null),
      outputs: Object.create(null)
    };

    Vue.set(state.elements, name, data);
  },
  DELETE_ELEMENT(state, name) {
    Vue.delete(state.elements, name);
  },

  ADD_INPUT(state, { element, input }) {
    const data = {
      source: null,
    };

    Vue.set(state.elements[element].inputs, input, data);
  },
  DELETE_INPUT(state, { element, input }) {
    Vue.delete(state.elements[element].inputs, input);
  },

  ADD_OUTPUT(state, { element, output }) {
    Vue.set(state.elements[element].outputs, output);
  },
  DELETE_OUTPUT(state, { element, output }) {
    Vue.delete(state.elements[element].outputs, output);
  },

  CONNECT(state, { dstElement, dstInput, srcElement, srcOutput }) {
    state.elements[dstElement].inputs[dstInput].source = {
      element: srcElement,
      output: srcOutput
    };
  },
  DISCONNECT(state, { dstElement, dstInput }) {
    state.elements[dstElement].inputs[dstInput].source = null;
  },
};