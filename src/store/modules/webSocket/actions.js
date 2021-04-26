export default {
  connectionError({ commit }, error) {
    commit("SET_ERROR", error);
  },
  connectionOpened({ commit }) {
    commit("SET_CONNECTION", true);
  },
  connectionClosed({ commit }) {
    commit("SET_CONNECTION", false);
  },
  connect({ commit }, url) {
    commit("CONNECT", url);
  },
  send({ commit }, msg) {
    commit("SEND", msg)
  },
  recv({ commit }, msg) {
    commit("RECV", msg)
  }
};