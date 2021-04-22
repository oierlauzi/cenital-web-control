export default {
  connect({ commit }, url) {
    commit('SET_URL', url);
    commit('SET_ERROR', null); //Clear previous errors
  },
  //eslint-disable-next-line no-unused-vars
  send({ commit }, obj) {
    return new Promise(
      (resolve, reject) => {
        var unsubscribe = store.subscribeAction((action) => {
          switch(action.type) {
            case "webSocket/recv":
              //FIXME check if it was a response, otherwise anything will trigger it
              resolve(action.payload);
              unsubscribe();
              break;

            case "webSocket/connectionClosed":
              //Connection closed before receiving the confirmation
              reject("Connection closed");
              unsubscribe();
              break;
          }
        });
      }
    );
  },
  //eslint-disable-next-line no-unused-vars
  recv({ commit }, obj) {},
  connectionError({ commit }, error) {
    commit('SET_ERROR', error);
  },
  connectionOpened({ commit }) {
    commit('SET_CONNECTION', true);
  },
  connectionClosed({ commit }) {
    commit('SET_CONNECTION', false);
  }
};