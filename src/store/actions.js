export default {
  reset({ dispatch }) {
    dispatch('mixer/reset');
  },
  fetch({ dispatch }) {
    return Promise.all([
      dispatch('mixer/fetch'),
    ]);		
  },
};