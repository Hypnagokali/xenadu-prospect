import store from '@/store';
// eslint-disable-next-line
const hook = async (to, from, next) => {
  store.commit('requestState/SET_WAITING');
  console.log('BEFORE ENTER HOOK');
  const logginTime = store.getters['auth/getTimeLoggedIn'];
  const diffMillis = Date.now() - logginTime;
  const logginSeconds = Math.floor(diffMillis / 1000);

  // This prevents sending again an auth request
  // after rerouting when login was successful.
  if (logginSeconds < 5) {
    next();
  } else {
    console.log('TOKEN:', localStorage.getItem('token'));
    const hasPermission = await store.dispatch('auth/attempt', localStorage.getItem('token'));
    console.log(hasPermission);
    if (hasPermission) {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
};
export default hook;
