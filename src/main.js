// import '../node_modules/foundation-sites/dist/css/foundation.css';
import '@/style/main.scss';
import '@/style/foundation-icons/foundation-icons.css';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/store/subscribers');
// todo:
// require('@/classes/User')

axios.defaults.baseURL = 'http://localhost/xenadu/xenadu-backend/api';


store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  Vue.config.productionTip = false;

  // Guard Routes
  // to get a quick temporary solution I copied the code from stackoverflow:
  // https://stackoverflow.com/questions/52653337/vuejs-redirect-from-login-register-to-home-if-already-loggedin-redirect-from
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      console.log('requires Auth!');
      store.commit('requestState/SET_WAITING');
      const auth = await store.dispatch('auth/attempt', localStorage.getItem('token'));
      if (!auth) {
        console.log('not authenticated');
        next({
          name: 'Login',
        });
      } else {
        next(); // go to wherever I'm going
      }
    } else {
      next(); // does not require auth, make sure to always call next()!
    }
  });

  router.afterEach(() => {
    store.commit('requestState/SET_READY');
  });

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
