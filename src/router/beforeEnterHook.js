import store from '@/store';
// eslint-disable-next-line
const hook = async (to, from, next) => {
  store.commit('requestState/SET_WAITING');
  const logginTime = store.getters['auth/getTimeLoggedIn'];
  const diffMillis = Date.now() - logginTime;
  const logginSeconds = Math.floor(diffMillis / 1000);

  // This prevents sending an auth request again
  // after rerouting when login was successful.
  if (logginSeconds < 5) {
    next();
  } else {
    const hasPermission = await store.dispatch('auth/attempt', localStorage.getItem('token'));
    if (hasPermission) {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
};
export default hook;
