import axios from 'axios';

export default {
  namespaced: true,
  state: {
    userObjectList: [],
  },
  getters: {
    getUserObjects: (state) => state.userObjectList,
  },
  mutations: {
    INIT_USER_LIST(state, userData) {
      state.userObjectList = userData;
    },
  },
  actions: {
    async init({ commit }) {
      await axios.get('/users')
        .then((response) => {
          commit('INIT_USER_LIST', response.data);
        });
    },
  },
};
