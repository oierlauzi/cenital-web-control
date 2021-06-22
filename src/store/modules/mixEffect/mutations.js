import Vue from "vue"

export default {
  ADD(state, name) {
    const data = {
      inputCount: 0,
      scalingMode: null,
      scalingFilter: null,
      pgm: -1,
      pvw: -1,
      transition: {
        bar: 0.0,
        duration: 1.01,
        preview: false,
        effects: Object.create(null),
        selectedEffect: null
      },
      overlays: {
        upstream: [],
        downstream: []
      }
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



  SET_INPUT_COUNT(state, { name, value }) {
    state.elements[name].inputCount = value;
  },
  SET_OVERLAY_COUNT(state, { name, slot, value }) {
    const arr = state.elements[name].overlays[slot];

    //Insert new elements if necessary
    while(arr.length < value) {
      const data = {
        visible: false,
        transition: false,
        feeds: {
          fillIn: -1,
          keyIn: -1,
        },
        position: [0.0, 0.0, 0.0],
        rotation: [0.0, 0.0, 0.0, 0.0],
        scale: [1.0, 1.0, 1.0],
        opacity: 1.0,
        blendingMode: null,
        scalingMode: null,
        scalingFilter: null,
        linearKey: {
          enabled: false,
          inverted: false,
          channel: ""
        },
        lumaKey: {
          enabled: false,
          inverted: false,
          min: 0.0,
          max: 0.0
        },
        chromaKey: {
          enabled: false,
          hue: 0.0,
          hueSpan: 0.0,
          hueSmoothness: 0.0,
          saturationThreshold: 0.0,
          saturationSmoothness: 0.0,
          brightnessThreshold: 0.0,
          brightnessSmoothness: 0.0,
        },
      };

      arr.push(data);
    }

    //Remove elements if necessary
    while(arr.length > value) {
      arr.pop();
    }
  },


  SET_SCALING_MODE(state, { name, value }) {
    state.elements[name].scalingMode = value;
  },
  SET_SCALING_FILTER(state, { name, value }) {
    state.elements[name].scalingFilter = value;
  },


  SET_PROGRAM(state, { name, value }) {
    state.elements[name].pgm = value;
  },
  SET_PREVIEW(state, { name, value }) {
    state.elements[name].pvw = value;
  },
  SET_TRANSITION_BAR(state, { name, value }) {
    state.elements[name].transition.bar = value;
  },
  SET_TRANSITION_DURATION(state, { name, value }) {
    state.elements[name].transition.duration = value;
  },
  SET_TRANSITION_PREVIEW(state, { name, value }) {
    state.elements[name].transition.preview = value;
  },
  ADD_TRANSITION_EFFECT(state, { name, effect, type }) {
    const data = {
      type: type
    };

    //Push it onto the mix effect transition effect map
    Vue.set(state.elements[name].transition.effects, effect, data);
  },
  DELETE_TRANSITION_EFFECT(state, { name, effect }) {
    Vue.delete(state.elements[name].transition.effects, effect);
  },
  RESET_TRANSITION_EFFECTS(state, name) {
    state.elements[name].transition.effects = Object.create(null);
  },
  SET_TRANSITION_SELECTED_EFFECT(state, { name, value }) {
    state.elements[name].transition.selectedEffect = value;
  },


  SET_OVERLAY_VISIBLE(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].visible = value;
  },
  SET_OVERLAY_TRANSITION(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].transition = value;
  },
  SET_OVERLAY_FEED(state, { name, slot, index, feed, value }) {
    state.elements[name].overlays[slot][index].feeds[feed] = value;
  },
  SET_OVERLAY_POSITION(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].position = value;
  },
  SET_OVERLAY_ROTATION(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].rotation = value;
  },
  SET_OVERLAY_SCALE(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].scale = value;
  },
  SET_OVERLAY_OPACITY(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].opacity = value;
  },
  SET_OVERLAY_BLENDING_MODE(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].blendingMode = value;
  },
  SET_OVERLAY_SCALING_MODE(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].scalingMode = value;
  },
  SET_OVERLAY_SCALING_FILTER(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].scalingFilter = value;
  },
  SET_OVERLAY_LINEAR_KEY_ENABLED(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].linearKey.enabled = value;
  },
  SET_OVERLAY_LINEAR_KEY_INVERTED(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].linearKey.inverted = value;
  },
  SET_OVERLAY_LINEAR_KEY_CHANNEL(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].linearKey.channel = value;
  },
  SET_OVERLAY_LUMA_KEY_ENABLED(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].lumaKey.enabled = value;
  },
  SET_OVERLAY_LUMA_KEY_INVERTED(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].lumaKey.inverted = value;
  },
  SET_OVERLAY_LUMA_KEY_MIN_THRESHOLD(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].lumaKey.min = value;
  },
  SET_OVERLAY_LUMA_KEY_MAX_THRESHOLD(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].lumaKey.max = value;
  },
  SET_OVERLAY_CHROMA_KEY_ENABLED(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.enabled = value;
  },
  SET_OVERLAY_CHROMA_KEY_HUE(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.hue = value;
  },
  SET_OVERLAY_CHROMA_KEY_HUE_SPAN(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.hueSpan = value;
  },
  SET_OVERLAY_CHROMA_KEY_HUE_SMOOTHNESS(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.hueSmoothness = value;
  },
  SET_OVERLAY_CHROMA_KEY_SATURATION_THRESHOLD(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.saturationThreshold = value;
  },
  SET_OVERLAY_CHROMA_KEY_SATURATION_SMOOTHNESS(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.saturationSmoothness = value;
  },
  SET_OVERLAY_CHROMA_KEY_BRIGHTNESS_THRESHOLD(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.brightnessThreshold = value;
  },
  SET_OVERLAY_CHROMA_KEY_BRIGHTNESS_SMOOTHNESS(state, { name, slot, index, value }) {
    state.elements[name].overlays[slot][index].chromaKey.brightnessSmoothness = value;
  },


  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};