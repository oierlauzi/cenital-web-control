export default {
  getElements: state => Object.keys(state.elements),

  /*
   * I/O related
   */

  getElementInputs: state => name => Object.keys(state.elements[name].inputs),
  getElementOutputs: state => name => Object.keys(state.elements[name].outputs),

  getInputs: state => {
    let result = [];

    for (const [name, elementData] of Object.entries(state.elements)) {
      for(const input of Object.keys(elementData.inputs)) {
        result.push({ element: name, input: input });
      }
    }

    return result;
  },
  getOutputs: state => {
    let result = [];

    for (const [name, elementData] of Object.entries(state.elements)) {
      for(const output of Object.keys(elementData.outputs)) {
        result.push({ element: name, output: output });
      }
    }

    return result;
  },

  getSource: state => (name, input) => {
    return Object.assign({}, state.elements[name].inputs[input].source);
  },


  /*
   * Video mode related
   */

  getFrameRateReadable: state => name => state.elements[name].videoMode.frameRate.read,
  getFrameRateWritable: state => name => state.elements[name].videoMode.frameRate.write,
  getFrameRateValue: state => name => Object.assign({}, state.elements[name].videoMode.frameRate.value),

  getResolutionReadable: state => name => state.elements[name].videoMode.resolution.read,
  getResolutionWritable: state => name => state.elements[name].videoMode.resolution.write,
  getResolutionValue: state => name => Object.assign({}, state.elements[name].videoMode.resolution.value),

  getPixelAspectRatioReadable: state => name => state.elements[name].videoMode.pixelAspectRatio.read,
  getPixelAspectRatioWritable: state => name => state.elements[name].videoMode.pixelAspectRatio.write,
  getPixelAspectRatioValue: state => name => Object.assign({}, state.elements[name].videoMode.pixelAspectRatio.value),

  getColorPrimariesOptions: state => name => state.elements[name].videoMode.colorPrimaries.options,
  getColorPrimariesReadable: state => name => state.elements[name].videoMode.colorPrimaries.read,
  getColorPrimariesWritable: state => name => state.elements[name].videoMode.colorPrimaries.write,
  getColorPrimariesValue: state => name => state.elements[name].videoMode.colorPrimaries.value,

  getColorModelOptions: state => name => state.elements[name].videoMode.colorModel.options,
  getColorModelReadable: state => name => state.elements[name].videoMode.colorModel.read,
  getColorModelWritable: state => name => state.elements[name].videoMode.colorModel.write,
  getColorModelValue: state => name => state.elements[name].videoMode.colorModel.value,

  getColorTransferFunctionOptions: state => name => state.elements[name].videoMode.colorTransferFunction.options,
  getColorTransferFunctionReadable: state => name => state.elements[name].videoMode.colorTransferFunction.read,
  getColorTransferFunctionWritable: state => name => state.elements[name].videoMode.colorTransferFunction.write,
  getColorTransferFunctionValue: state => name => state.elements[name].videoMode.colorTransferFunction.value,

  getColorSubsamplingOptions: state => name => state.elements[name].videoMode.colorSubsampling.options,
  getColorSubsamplingReadable: state => name => state.elements[name].videoMode.colorSubsampling.read,
  getColorSubsamplingWritable: state => name => state.elements[name].videoMode.colorSubsampling.write,
  getColorSubsamplingValue: state => name => state.elements[name].videoMode.colorSubsampling.value,

  getColorRangeOptions: state => name => state.elements[name].videoMode.colorRange.options,
  getColorRangeReadable: state => name => state.elements[name].videoMode.colorRange.read,
  getColorRangeWritable: state => name => state.elements[name].videoMode.colorRange.write,
  getColorRangeValue: state => name => state.elements[name].videoMode.colorRange.value,

  getColorFormatOptions: state => name => state.elements[name].videoMode.colorFormat.options,
  getColorFormatReadable: state => name => state.elements[name].videoMode.colorFormat.read,
  getColorFormatWritable: state => name => state.elements[name].videoMode.colorFormat.write,
  getColorFormatValue: state => name => state.elements[name].videoMode.colorFormat.value,


  /*
   * Fetching counter
   */

  getFetching: state => state.fetching,
};