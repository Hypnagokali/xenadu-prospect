import axios from 'axios';
import snakeToCamelConverter from '@/helper/snakeToCamelConverter';
import decodeHtmlSpecialChars from '@/helper/decodeHtmlspecialchars';
import Goal from '../classes/Goal';
import Week from '../classes/Week';
import WorkloadPoints from '../classes/WorkloadPoints';

// import Goal from '@/classes/Goal';

export default {
  state: {
    goals: [],
    errorMessages: null,
  },
  getters: {
    isInputInvalid: (state) => !!state.errorMessages,
    goals: (state) => state.goals,
  },
  mutations: {
    CLEAR_GOALS(state) {
      state.goals = [];
    },
    ADD_GOAL(state, goalObj) {
      state.goals.push(goalObj);
    },
    SET_GOAL(state, goalObj) {
      state.goals = goalObj;
    },
    REPLACE_GOAL(state, goalObj) {
      const replaceIndex = state.goals.findIndex((g) => g.id === goalObj.id);
      state.goals[replaceIndex] = goalObj;
    },
    SET_ERROR_MESSAGES(state, errObj) {
      state.errorMessages = errObj;
    },
  },
  actions: {
    delete({ _ }, myGoal) {
      console.log(_);
      console.log(`delete goal: ${myGoal}`, myGoal);
    },
    currentWeek({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        axios.get('prospect/week/current/goals')
          .then((response) => {
            commit('CLEAR_GOALS');
            console.log(response.data);
            response.data.forEach((goalDataObject) => {
              dispatch('createGoalFromData', { goalResponseData: goalDataObject });
            });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    createGoalFromData({ commit }, { goalResponseData, commitType = 'ADD_GOAL' }) {
      const workloadPointsObject = new WorkloadPoints(
        snakeToCamelConverter(goalResponseData.workloadPoints),
      );
      const weekObject = new Week(
        snakeToCamelConverter(goalResponseData.week),
      );
      const goal = new Goal(
        goalResponseData.id,
        decodeHtmlSpecialChars(goalResponseData.description),
        decodeHtmlSpecialChars(goalResponseData.name),
        goalResponseData.addedOn,
        weekObject,
        workloadPointsObject,
      );
      commit(commitType, goal);
    },

    async update({ commit, dispatch }, goalInput) {
      commit('SET_ERROR_MESSAGES', '');

      await axios.post(`prospect/week/goal/${goalInput.id}`, {
        name: goalInput.name,
        description: goalInput.description,
        cw: goalInput.cw,
        workload_level: goalInput.workloadLevel,
      }).then((response) => {
        dispatch('createGoalFromData', {
          goalResponseData: response.data,
          commitType: 'REPLACE_GOAL',
        });
        console.log(response);
      }).catch((error) => {
        if (error.response && error.response.status === 422) {
          commit('SET_ERROR_MESSAGES', error.response.data.errors);
        } else {
          console.error(error);
        }
      });
    },

    async create({ commit }, goalInput) {
      // post goal data to api
      console.log('POST data');
      console.log(goalInput.cw);
      commit('SET_ERROR_MESSAGES', '');

      await axios.post('prospect/week/goal', {
        name: goalInput.name,
        description: goalInput.description,
        cw: goalInput.cw,
        workload_level: goalInput.workloadLevel,
      })
        .then((response) => {
          console.log(response.data);
          /* use dispatch('createGoalFromData', response.data) */
          const weekData = response.data.week;
          const workloadPointsData = response.data.workloadPoints;
          const goalObj = {
            name: response.data.name,
            description: response.data.description,
            cw: weekData.cw,
            workloadPoints: workloadPointsData.level,
            addedOn: response.data.added_on,
          };
          commit('ADD_GOAL', goalObj);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            commit('SET_ERROR_MESSAGES', error.response.data.errors);
          } else {
            console.error(error);
          }
          // if error 422 show validation messages
        });
    },
  },
};
