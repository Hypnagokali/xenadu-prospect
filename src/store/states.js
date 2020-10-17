export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    TOGGLE_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
};
