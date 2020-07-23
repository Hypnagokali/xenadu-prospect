export default {
  namespaced: true,
  state: {
    isWaitingForResponse: false,
    isLoading: false,
  },
  getters: {
    isWaiting: (state) => state.isWaitingForResponse,
  },
  mutations: {
    SET_WAITING(state) {
      state.isWaitingForResponse = true;
    },
    SET_READY(state) {
      state.isWaitingForResponse = false;
    },
  },
  actions: {},
};
