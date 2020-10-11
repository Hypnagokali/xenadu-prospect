import axios from 'axios';

export default {
  namespaced: true,
  state: {
    friendList: [],
    currentUserView: null,
    myFriendRequest: null,
    errorMessage: '',
    hasErrorMessage: false,
    waiting: false,
  },
  getters: {
    isLoading: (state) => state.waiting,
    getFriendList: (state) => state.friendList,
    getUser: (state) => {
      if (state.currentUserView !== null) {
        return state.currentUserView.user;
      }
      return {};
    },
    hasRequestedMe: (state) => {
      if (state.currentUserView !== null) {
        return state.currentUserView.hasRequestedMe;
      }
      return false;
    },
    isFriend: (state) => {
      if (state.currentUserView !== null) {
        return state.currentUserView.isFriend;
      }
      return false;
    },
    isPending: (state) => {
      if (state.currentUserView !== null) {
        return state.currentUserView.isPending;
      }
      return false;
    },
    hasErrorMessage: (state) => state.hasErrorMessage,
    getErrorMessage: (state) => {
      if (state.hasErrorMessage) {
        return state.errorMessage;
      }
      return '';
    },
  },
  mutations: {
    START_WAITING(state) {
      state.waiting = true;
    },
    STOP_WAITING(state) {
      state.waiting = false;
    },
    SET_FRIENDLIST(state, friendsResponse) {
      // ToDo: Friend Objects / User Objects
      state.friendList = friendsResponse;
    },
    SET_USER_VIEW(state, userdata) {
      state.currentUserView = userdata;
    },
    SET_ERROR_MSG(state, errorMessage) {
      state.errorMessage = errorMessage;
      state.hasErrorMessage = true;
    },
    CLEAR_ERROR_MSG(state) {
      state.hasErrorMessage = false;
      state.errorMessage = '';
    },
  },
  actions: {
    async refreshUserProfile({ dispatch }, userId) {
      console.log('REFRESH USER VIEW!');
      dispatch('initUserView', userId);
      dispatch('initFriendList');
    },
    async unfriend({ dispatch }, userId) {
      await axios.post(`users/${userId}/unfriend`)
        .then((response) => {
          console.log(response.data);
          dispatch('refreshUserProfile', userId);
        })
        .catch((e) => {
          console.error('Fehler bei Freundschaftsanfrage', e);
        });
    },
    async acceptFriendship({ dispatch }, userId) {
      await axios.post(`users/${userId}/accept`)
        .then((response) => {
          console.log(response.data);
          dispatch('refreshUserProfile', userId);
        })
        .catch((e) => {
          console.error('Fehler bei Freundschaftsanfrage', e);
        });
    },
    async denyFriendship({ dispatch }, userId) {
      await axios.post(`users/${userId}/deny`)
        .then((response) => {
          console.log(response.data);
          dispatch('refreshUserProfile', userId);
        })
        .catch((e) => {
          console.error('Fehler bei Freundschaftsanfrage', e);
        });
    },
    async sendFriendRequest({ dispatch }, userId) {
      await axios.post(`users/${userId}/add`)
        .then((response) => {
          console.log(response.data);
          dispatch('refreshUserProfile', userId);
        })
        .catch((e) => {
          console.error('Fehler bei Freundschaftsanfrage', e);
        });
    },
    async initFriendList({ commit }) {
      await axios.get('users/friends')
        .then((response) => {
          console.log('FRIENDS');
          console.table(response.data);
          commit('SET_FRIENDLIST', response.data);
        })
        .catch((e) => {
          console.error('Fehler beim Freunde laden!', e);
        });
    },
    async initUserView({ commit }, userId) {
      console.log('INIT USER VIEW!');
      commit('START_WAITING');
      console.log('User ID: ', userId);
      commit('CLEAR_ERROR_MSG');
      await axios.get(`users/${userId}`)
        .then((response) => {
          console.table(response.data);
          commit('SET_USER_VIEW', response.data);
        })
        .catch((e) => {
          console.error('Fehler beim Freunde laden!', e);
          commit('SET_ERROR_MSG', 'Benutzer nicht gefunden');
        }).finally(() => {
          commit('STOP_WAITING');
        });
    },
  },
};
