export default {
  add({ commit }, name) {
    commit('ADD', name);
  },
  delete({ commit }, name) {
    commit('DELETE', name);
  },
  setInputCount({ commit }, { name, inputCount }) {
    commit('SET_INPUT_COUNT', { name, inputCount });
  },
  setInput({ commit }, { name, index, input }) {
    commit('SET_INPUT', { name, index, input });
  },
  setProgram({ commit }, { name, index }) {
    commit('SET_PROGRAM', { name, index });
  },
  setPreview({ commit }, { name, index }) {
    commit('SET_PREVIEW', { name, index });
  }
};