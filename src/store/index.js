import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import goals from './goals';
import requestState from './request-state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    requestState,
    auth,
    goals,
  },
});
