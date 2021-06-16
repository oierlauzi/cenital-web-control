export default {
  reset({ dispatch }) {
    dispatch('mixer/reset');
    dispatch('mixEffect/fetch');
  },
  fetch({ dispatch }) {
    return Promise.all([
      dispatch('mixer/fetch'),
      dispatch('mixEffect/fetch'),
    ]);		
  },
};