export default {
  setURL({ commit }, url) {
    commit('SET_URL', url);
  },
  connectionOpened({ commit }) {
    commit('SET_CONNECTION', true);
  },
  connectionClosed({ commit }) {
    commit('SET_CONNECTION', false);
  }
}