import router from '../router'

export default {
  reset({ dispatch }) {
    router.push({ name: 'home' }).catch(err => {
      // Ignore the vuex err regarding  navigating to the page they are already on.
      if( err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location') ) 
      {
        // But print any other errors to the console
        console.error(err);
      }
    });

    dispatch('mixer/reset');
    dispatch('mixEffect/reset');
    dispatch('inputNdi/reset');
    dispatch('outputWindow/reset');
  },
  fetch({ dispatch, commit }) {
    //Increment fetching count
    commit('INC_FETCHING');

    return Promise.all([
      dispatch('mixer/fetch'),
      dispatch('mixEffect/fetch'),
      dispatch('inputNdi/fetch'),
      dispatch('outputWindow/fetch')
    ]).then(() => commit('DEC_FETCHING'))	;
  },
};