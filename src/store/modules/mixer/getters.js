export default {
  getElements: state => Object.keys(state.elements),

  getElementInputs: state => element => Object.keys(state.elements[element].inputs),
  getElementOutputs: state => element => Object.keys(state.elements[element].outputs),

  getInputs: state => {
    let result = [];

    for (const [element, elementData] of Object.entries(state.elements)) {
      for(const input of Object.keys(elementData.inputs)) {
        result.push({ element: element, input: input });
      }
    }

    return result;
  },
  getOutputs: state => {
    let result = [];

    for (const [element, elementData] of Object.entries(state.elements)) {
      for(const output of Object.keys(elementData.outputs)) {
        result.push({ element: element, output: output });
      }
    }

    return result;
  },

  getSource: state => (element, input) => {
    return state.elements[element].inputs[input].source;
  },

};