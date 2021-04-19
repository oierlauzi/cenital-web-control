export default {
  SET_URL(state, url) {
    state.url = url;
  },
  SET_CONNECTION(state, message) {
    state.connected = message;
  }
};