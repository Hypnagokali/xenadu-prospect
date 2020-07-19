import axios from 'axios';

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, userData) {
      state.user = userData;
    },
  },

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.token && state.user,
  },

  actions: {
    isUserLoggedIn({ getters }) {
      return getters.isAuthenticated;
    },

    saveToken(_, token) {
      localStorage.setItem('token', token);
    },

    destroyToken() {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
    },

    async retrieveUser({ dispatch, getters }) {
      let token = null;

      // Existiert Token im WebStorage?
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
      } else {
        return false;
      }

      // ist Token gültig?
      const response = await dispatch('attempt', token);
      if (!response) return false;
      return getters.getUser;
    },

    destroyUser({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },

    async login({ dispatch }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);

        await dispatch('attempt', response.data.token);
      } catch (e) {
        console.log(e);
        dispatch('destroyUser');
      }
    },

    async attempt({ commit, dispatch, state }, token) {
      if (token) {
        commit('SET_TOKEN', token);
      }

      console.log(`state.token = ${state.token}`);
      if (!state.token) {
        console.log('Kein Token, kein Request');
        return false;
      }

      try {
        console.log('was ist hier los?');
        const response = await axios.get('/auth/me');
        commit('SET_USER', response.data);
        // dispatch('saveToken', token);
        return true;
      } catch (e) {
        // token abgelaufen oder ungültig
        dispatch('destroyUser');
        return false;
      }
    },

    logout({ commit }) {
      return axios.post('auth/logout').then(() => {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      });
    },
  },
};
