export default {
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_CONNECTION(state, connected) {
    state.connected = connected;
  },
  CONNECT(state, url) {
    state.url = url;
    state.error = null; //Clear previous errors
  },
  //eslint-disable-next-line no-unused-vars
  SEND(state, message) {},
  //eslint-disable-next-line no-unused-vars
  RECV(state, message) {}
};