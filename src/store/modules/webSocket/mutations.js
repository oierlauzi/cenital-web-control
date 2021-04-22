export default {
  SET_URL(state, url) {
    state.url = url;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_CONNECTION(state, message) {
    state.connected = message;
  }
};