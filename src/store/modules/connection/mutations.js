export default {
  SET_CONNECTED(state, connected) {
    state.connected = connected;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },

  //eslint-disable-next-line no-unused-vars
  RECV({ commit }, tokens) {},
  //eslint-disable-next-line no-unused-vars
  CONNECT({ commit }, payload) {},
  //eslint-disable-next-line no-unused-vars
  DISCONNECT({ commit }, payload) {},
  //eslint-disable-next-line no-unused-vars
  SEND({ commit }, payload) {},
  //eslint-disable-next-line no-unused-vars
  SEND_NO_SUCCESS({ commit }, payload) {},
  //eslint-disable-next-line no-unused-vars
  SEND_NO_ACK({ commit }, payload) {},
};