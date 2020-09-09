import '@/style/main.scss';
import '@/style/foundation-icons/foundation-icons.css';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/store/subscribers');

axios.defaults.baseURL = 'http://localhost/xenadu/xenadu-backend/api';

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  Vue.config.productionTip = false;

  /*
  * The beforeEnter hook commits 'requestState/SET_WAITING'
  * therefor, after the route is entered the request state has to be set to READY
  *
  * WAITING: waiting for response
  * READY: response arrived
  */
  router.afterEach(() => {
    store.commit('requestState/SET_READY');
  });

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
