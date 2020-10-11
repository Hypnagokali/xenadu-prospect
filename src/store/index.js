import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import goals from './goals';
import friends from './friends';
import users from './users';
import monitor from './monitor';
import requestState from './request-state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    TOGGLE_LOADING(state) {
      state.isLoading = !state.isLoading;
      console.log('ROOT: isLoading', state.isLoading);
    },
  },
  actions: {
    //
  },
  modules: {
    requestState,
    auth,
    goals,
    friends,
    users,
    monitor,
  },
});
