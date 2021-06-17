export default {
  reset({ dispatch }) {
    dispatch('mixer/reset');
    dispatch('mixEffect/reset');
  },
  fetch({ dispatch, commit }) {
    //Increment fetching count
    commit('INC_FETCHING');

    return Promise.all([
      dispatch('mixer/fetch'),
      dispatch('mixEffect/fetch'),
    ])
    .then(() => commit('DEC_FETCHING'))	;
  },
};