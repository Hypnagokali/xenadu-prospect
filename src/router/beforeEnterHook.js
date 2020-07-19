import store from '@/store';
// eslint-disable-next-line
const hook = async (to, from, next) => {
  const hasPermission = await store.dispatch('auth/isUserLoggedIn');
  // debugger;
  console.log(hasPermission);
  if (hasPermission) {
    next();
  } else {
    next({ name: 'Login' });
  }
};
export default hook;
