import '@/style/main.scss';
import '@/style/foundation-icons/foundation-icons.css';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/store/subscribers');

/* Environment */
// axios.defaults.baseURL = 'https://www.xenadu.de/xenadu-backend/api';
axios.defaults.baseURL = 'http://localhost/xenadu/xenadu-backend/api';

// axios.interceptors.request.use((request) => {

// });

// check for the `Authorization` header in each response - refresh on frontend if found
axios.interceptors.response.use((response) => {
  const { headers } = response;
  const newToken = headers['refresh-token'];
  if (newToken !== undefined) {
    axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    localStorage.setItem('token', newToken);
    localStorage.setItem('token_ts', Date.now());
  }
  return response;
});

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
