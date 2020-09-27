import axios from 'axios';

export default {
  namespaced: true,
  state: {
    friendList: [],
    currentUserView: null,
    myFriendRequest: null,
    errorMessage: '',
    hasErrorMessage: false,
  },
  getters: {
    getFriendList: (state) => state.friendList,
    getUser: (state) => {
      if (state.currentUserView !== null) {
        return state.currentUserView.user;
      }
      return {};
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
    async sendFriendRequest({ _ }, userId) {
      await axios.post(`user/${userId}/add`)
        .then((response) => {
          console.log(_);
          console.log(response.data);
        })
        .catch((e) => {
          console.error('Fehler bei Freundschaftsanfrage', e);
        });
    },
    async initFriendList({ commit }) {
      await axios.get('user/friends')
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
        });
    },
  },
};
