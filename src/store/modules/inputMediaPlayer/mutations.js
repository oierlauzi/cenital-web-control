import Vue from "vue"

export default {
  ADD(state, name) {
    const data = {
      clips: Object.create(null),
      currentClip: null,
    };

    //Create a empty media player
    Vue.set(state.elements, name, data);
  },
  DELETE(state, name) {
    Vue.delete(state.elements, name);
  },
  RESET(state) {
    state.elements = Object.create(null);
  },


  RESET_CLIPS(state, name) {
    state.elements[name].clips = Object.create(null);
  },
  ADD_CLIP(state, { name, clip }) {
    const data = {
      state: "",
      repeat: "",
      speed: 1.0,
      duration: 0.0,
      time: 0.0,
    };

    Vue.set(state.elements[name].clips, clip, data);
  },
  DELETE_CLIP(state, { name, clip }) {
    Vue.delete(state.elements[name].clips, clip);
  },
  SET_CLIP_STATE(state, { name, clip, value }) {
    state.elements[name].clips[clip].state = value;
  },
  SET_CLIP_REPEAT(state, { name, clip, value }) {
    state.elements[name].clips[clip].repeat = value;
  },
  SET_CLIP_SPEED(state, { name, clip, value }) {
    state.elements[name].clips[clip].speed = value;
  },
  SET_CLIP_DURATION(state, { name, clip, value }) {
    state.elements[name].clips[clip].duration = value;
  },
  SET_CLIP_TIME(state, { name, clip, value }) {
    state.elements[name].clips[clip].time = value;
  },
  SET_CURRENT_CLIP(state, { name, value }) {
    state.elements[name].currentClip = value;
  },
  

  INC_FETCHING(state) {
    state.fetching++;
  },
  DEC_FETCHING(state) {
    state.fetching--;
  }
};