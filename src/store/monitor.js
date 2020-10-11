import axios from 'axios';
import Goal from '../classes/Goal';
import GoalsCollection from '../classes/GoalsCollection';
import GoalsCollectionList from '../classes/GoalsCollectionList';

export default {
  namespaced: true,
  state: {
    goalsCollectionArray: [],
    goalsCollectionList: new GoalsCollectionList(),
  },
  getters: {
    isGoalsCollectionEmpty: (state) => {
      if (state.goalsCollectionList.isEmpty()) {
        return true;
      }
      return false;
    },
    getGoalsCollectionList: (state) => state.goalsCollectionList,
    getUserGoalsCollectionArray: (state) => state.goalsCollectionArray,
  },
  mutations: {
    SET_GOALS_COLLECTION(state, goalsCollectionList) {
      state.goalsCollectionList = goalsCollectionList;
    },
    SET_COLLECTION(state, collection) {
      state.goalsCollectionArray = collection;
    },
    CLEAR_COLLECTION(state) {
      state.goalsCollectionArray = [];
    },
  },
  actions: {
    /* Get collection of goals by weekName (weekName = GoalCollection->name) */
    async initOverview({ commit }, userId) {
      await axios.get(`users/${userId}/monitor/goals`)
        .then((response) => {
          commit('CLEAR_COLLECTION');
          // response.data.collection
          const responseCollection = response.data.collection;
          const goalCollectionList = new GoalsCollectionList();
          const collection = responseCollection.map((c) => {
            const goals = c.goals.map((g) => Goal.createGoalFromData(g));
            const goalsCollection = new GoalsCollection(
              c.collectionName,
              c.date,
              goals,
            );

            goalCollectionList.addGoalCollection(goalsCollection);

            return goalsCollection;
          });
          console.log('IST EMPTY?', goalCollectionList.isEmpty());
          commit('SET_GOALS_COLLECTION', goalCollectionList);
          commit('SET_COLLECTION', collection);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
