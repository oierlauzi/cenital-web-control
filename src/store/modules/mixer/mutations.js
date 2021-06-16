import Vue from "vue"

export default {
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
  RESET_ELEMENTS(state) {
    state.elements = Object.create(null);
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
  RESET_INPUTS(state, element) {
    state.elements[element].inputs = Object.create(null);
  },

  ADD_OUTPUT(state, { element, output }) {
    Vue.set(state.elements[element].outputs, output);
  },
  DELETE_OUTPUT(state, { element, output }) {
    Vue.delete(state.elements[element].outputs, output);
  },
  RESET_OUTPUTS(state, element) {
    state.elements[element].outputs = Object.create(null);
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