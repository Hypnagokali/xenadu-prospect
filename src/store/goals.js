// extern libraries
import axios from 'axios';
// import _ from 'lodash';
// classes
import Goal from '../classes/Goal';

export default {
  state: {
    /*
    * week, overdueSince, overview are the objects that store the whole response
    * goals are the extracted goal data from the response.
    */
    overdue: {},
    week: {},
    overview: {},
    /* the extracted goal data from one of the objects above. */
    goals: [],
    errorMessages: null,
  },
  getters: {
    isInputInvalid: (state) => !!state.errorMessages,
    goals: (state) => state.goals,
  },
  mutations: {
    SET_OVERDUE(state, { date, goals }) {
      state.overdue.date = date;
      state.overdue.goals = goals;
    },
    SET_WEEK(state, { date, goals }) {
      state.week.date = date;
      state.week.goals = goals;
    },
    SET_STATE_DONE(state, goalObj) {
      const goal = state.goals.find((g) => g.id === goalObj.id);
      goal.state = goalObj.state;
    },
    CLEAR_GOALS(state) {
      state.goals = [];
    },
    ADD_GOAL(state, goalObj) {
      state.goals.push(goalObj);
    },
    SET_GOALS(state, goalObjects) {
      state.goals = goalObjects;
    },
    REPLACE_GOAL(state, goalObj) {
      const replaceIndex = state.goals.findIndex((g) => g.id === goalObj.id);
      console.log('REPLACE GOAL:');
      console.log('state.goals[replaceIndex]', state.goals[replaceIndex]);
      state.goals[replaceIndex] = goalObj;
      console.log('after:', state.goals[replaceIndex]);
    },
    REMOVE_GOAL(state, id) {
      // const removeIndex = state.goals.findIndex((g) => g.id === id);
      const goalsWithoutRemovedItem = state.goals.filter((g) => g.id !== id);
      state.goals = goalsWithoutRemovedItem;
    },
    SET_ERROR_MESSAGES(state, errObj) {
      state.errorMessages = errObj;
    },
  },
  actions: {
    toggleStateDone({ commit }, goal) {
      commit({ type: 'TOGGLE_LOADING' }, { options: { root: true } });
      axios.post(`prospect/week/goal/${goal.id}/state/done`)
        .then((response) => {
          const goalObject = Goal.createGoalFromData(response.data);
          commit('SET_STATE_DONE', goalObject);
        })
        .catch((ex) => {
          console.log('Fehler bei setState');
          console.log(ex);
        })
        .finally(() => {
          commit({ type: 'TOGGLE_LOADING' }, { options: { root: true } });
        });
    },

    async delete({ commit }, goal) {
      const { id } = goal;
      await axios.post(`prospect/week/goal/${id}/delete`)
        .then(() => {
          commit('REMOVE_GOAL', id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    week({ commit }, weekName = 'current') {
      return new Promise((resolve, reject) => {
        axios.get(`prospect/week/${weekName}/goals`)
          .then((response) => {
            commit('CLEAR_GOALS');
            // create proper goal objects from response data
            if (weekName === 'overview') {
              console.log(response.data);
              // todo
            } else {
              console.log('CURRENT REQUESTED');
              console.log(response.data);
              const goalObjects = response.data.week.goals
                .map((goalData) => Goal.createGoalFromData(goalData));
              commit('SET_GOALS', goalObjects);
              commit('SET_WEEK', { date: response.data.week.date, goals: goalObjects });
              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    unfinished({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('prospect/week/overdue/goals')
          .then((response) => {
            commit('CLEAR_GOALS');
            console.log(response.data);
            const goalObjects = response
              .data.overdueSince.goals.map((goalData) => Goal.createGoalFromData(goalData));
            commit('SET_GOALS', goalObjects);
            commit('SET_OVERDUE', { date: response.data.overdueSince.date, goals: goalObjects });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async update({ commit }, goalInput) {
      commit('SET_ERROR_MESSAGES', '');

      await axios.post(`prospect/week/goal/${goalInput.id}`, {
        name: goalInput.name,
        description: goalInput.description,
        cw: goalInput.cw,
        workload_level: goalInput.workloadLevel,
      }).then((response) => {
        const goalObjects = response.data.week.goals.map((g) => Goal.createGoalFromData(g));
        commit('SET_GOALS', goalObjects);
        commit('SET_WEEK', { date: response.data.week.date, goals: goalObjects });
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
