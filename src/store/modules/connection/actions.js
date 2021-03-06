export default {
  connect({ commit }, url) {
    return new Promise((resolve, reject) => {
      commit('CONNECT', { resolve, reject, url });
    });
  },
  disconnect({ commit }) {
    return new Promise((resolve, reject) => {
      commit('DISCONNECT', { resolve, reject });
    });
  },
  send({ commit }, tokens) {
    return new Promise((resolve, reject) => {
      commit('SEND', { resolve, reject, tokens });
    })
    .then(event => event.data);
  },
  sendNoSuccess({ commit }, tokens) {
    return new Promise((resolve, reject) => {
      commit('SEND_NO_SUCCESS', { resolve, reject, tokens });
    })
    .then(event => event.data);
  },
  sendNoAck({ commit }, tokens) {
    return new Promise((resolve, reject) => {
      commit('SEND_NO_ACK', { resolve, reject, tokens });
    });
  },

};