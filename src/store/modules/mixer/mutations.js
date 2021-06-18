import Vue from "vue"

const videoModeAttributeData = {
  options: [],
  read: false,
  write: false,
  value: null
};

export default {
  /*
   * Element management
   */
  ADD(state, name) {
    const data = {
      inputs: Object.create(null),
      outputs: Object.create(null),
      videoMode: {
        frameRate: Object.assign({}, videoModeAttributeData),
        resolution: Object.assign({}, videoModeAttributeData),
        pixelAspectRatio: Object.assign({}, videoModeAttributeData),
        colorPrimaries: Object.assign({}, videoModeAttributeData),
        colorModel: Object.assign({}, videoModeAttributeData),
        colorTransferFunction: Object.assign({}, videoModeAttributeData),
        colorSubsampling: Object.assign({}, videoModeAttributeData),
        colorRange: Object.assign({}, videoModeAttributeData),
        colorFormat: Object.assign({}, videoModeAttributeData),
      }
    };

    Vue.set(state.elements, name, data);
  },
  DELETE(state, name) {
    Vue.delete(state.elements, name);
  },
  RESET(state) {
    state.elements = Object.create(null);
  },

  /*
   * Inputs
   */
  ADD_INPUT(state, { name, input }) {
    const data = {
      source: null,
    };

    Vue.set(state.elements[name].inputs, input, data);
  },
  DELETE_INPUT(state, { name, input }) {
    Vue.delete(state.elements[name].inputs, input);
  },
  RESET_INPUTS(state, name) {
    state.elements[name].inputs = Object.create(null);
  },

  /*
   * Outputs
   */
  ADD_OUTPUT(state, { name, output }) {
    Vue.set(state.elements[name].outputs, output);
  },
  DELETE_OUTPUT(state, { name, output }) {
    Vue.delete(state.elements[name].outputs, output);
  },
  RESET_OUTPUTS(state, name) {
    state.elements[name].outputs = Object.create(null);
  },

  /*
   * Connections
   */
  CONNECT(state, { dstElement, dstInput, srcElement, srcOutput }) {
    state.elements[dstElement].inputs[dstInput].source = {
      element: srcElement,
      output: srcOutput
    };
  },
  DISCONNECT(state, { dstElement, dstInput }) {
    state.elements[dstElement].inputs[dstInput].source = null;
  },

  /*
   * Frame rate
   */
  SET_FRAME_RATE_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.frameRate.read = enable;
  },
  SET_FRAME_RATE_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.frameRate.write = enable;
  },
  SET_FRAME_RATE_VALUE(state, { name, value }) {
    state.elements[name].videoMode.frameRate.value = value;
  },

  /*
   * Resolution
   */
  SET_RESOLUTION_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.resolution.read = enable;
  },
  SET_RESOLUTION_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.resolution.write = enable;
  },
  SET_RESOLUTION_VALUE(state, { name, value }) {
    state.elements[name].videoMode.resolution.value = value;
  },

  /*
   * Pixel aspect ratio
   */
  SET_PIXEL_ASPECT_RATIO_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.pixelAspectRatio.read = enable;
  },
  SET_PIXEL_ASPECT_RATIO_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.pixelAspectRatio.write = enable;
  },
  SET_PIXEL_ASPECT_RATIO_VALUE(state, { name, value }) {
    state.elements[name].videoMode.pixelAspectRatio.value = value;
  },

  /*
   * Color primaries
   */
  SET_COLOR_PRIMARIES_OPTIONS(state, { name, options }) {
    state.elements[name].videoMode.colorPrimaries.options = options;
  },
  SET_COLOR_PRIMARIES_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorPrimaries.read = enable;
  },
  SET_COLOR_PRIMARIES_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorPrimaries.write = enable;
  },
  SET_COLOR_PRIMARIES_VALUE(state, { name, value }) {
    state.elements[name].videoMode.colorPrimaries.value = value;
  },

  /*
   * Color model
   */
  SET_COLOR_MODEL_OPTIONS(state, { name, options }) {
    state.elements[name].videoMode.colorModel.options = options;
  },
  SET_COLOR_MODEL_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorModel.read = enable;
  },
  SET_COLOR_MODEL_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorModel.write = enable;
  },
  SET_COLOR_MODEL_VALUE(state, { name, value }) {
    state.elements[name].videoMode.colorModel.value = value;
  },

  /*
   * Color transfer function
   */
  SET_COLOR_TRANSFER_FUNCTION_OPTIONS(state, { name, options }) {
    state.elements[name].videoMode.colorTransferFunction.options = options;
  },
  SET_COLOR_TRANSFER_FUNCTION_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorTransferFunction.read = enable;
  },
  SET_COLOR_TRANSFER_FUNCTION_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorTransferFunction.write = enable;
  },
  SET_COLOR_TRANSFER_FUNCTION_VALUE(state, { name, value }) {
    state.elements[name].videoMode.colorTransferFunction.value = value;
  },

  /*
   * Color subsampling
   */
  SET_COLOR_SUBSAMPLING_OPTIONS(state, { name, options }) {
    state.elements[name].videoMode.colorSubsampling.options = options;
  },
  SET_COLOR_SUBSAMPLING_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorSubsampling.read = enable;
  },
  SET_COLOR_SUBSAMPLING_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorSubsampling.write = enable;
  },
  SET_COLOR_SUBSAMPLING_VALUE(state, { name, value }) {
    state.elements[name].videoMode.colorSubsampling.value = value;
  },

  /*
   * Color range
   */
  SET_COLOR_RANGE_OPTIONS(state, { name, options }) {
    state.elements[name].videoMode.colorRange.options = options;
  },
  SET_COLOR_RANGE_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorRange.read = enable;
  },
  SET_COLOR_RANGE_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorRange.write = enable;
  },
  SET_COLOR_RANGE_VALUE(state, { name, value }) {
    state.elements[name].videoMode.colorRange.value = value;
  },

  /*
   * Color format
   */
  SET_COLOR_FORMAT_OPTIONS(state, { name, options }) {
    state.elements[name].videoMode.colorFormat.options = options;
  },
  SET_COLOR_FORMAT_READ_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorFormat.read = enable;
  },
  SET_COLOR_FORMAT_WRITE_ENABLE(state, { name, enable }) {
    state.elements[name].videoMode.colorFormat.write = enable;
  },
  SET_COLOR_FORMAT_VALUE(state, { name, value }) {
    state.elements[name].videoMode.colorFormat.value = value;
  },

  /*
   * Reset video mode
   */
  RESET_VIDEO_MODE(state, name) {
    const videoMode = state.elements[name].videoMode;

    //Reset all members of the video mode
    Object.keys(videoMode).forEach(key => {
      videoMode[key] = Object.assign({}, videoModeAttributeData);
    });    
  },

  /*
   * Fetch counter
   */
  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};