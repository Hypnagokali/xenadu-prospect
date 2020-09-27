// extern libraries
import axios from 'axios';
// import _ from 'lodash';
// classes
import Goal from '../classes/Goal';
import GoalsCollection from '../classes/GoalsCollection';

export default {
  state: {
    /* goalsCollections: an array of collections */
    /* e.g.: goalsCollectionArray[0].goals */
    goalsCollectionArray: [],
    goalsCollection: new GoalsCollection(),
    errorMessages: null,
  },

  getters: {
    isInputInvalid: (state) => !!state.errorMessages,
    getGoalsCollectionArray: (state) => state.goalsCollectionArray,
    getGoalsCollection: (state) => state.goalsCollection,
  },

  mutations: {
    SET_DONE(state, id) {
      let goal = null;
      state.goalsCollectionArray.forEach((goalsCollection) => {
        console.log('TRY: setDone', id);
        /* using '!=' because: checking for null AND undefined. null == undefined */
        if (goalsCollection.findById(id) != null) {
          goal = goalsCollection.findById(id);
        }
      });
      /* set the goal expressly to done, because otherwise vue is not updating the view */
      if (goal !== null) {
        goal.state = Goal.DONE;
      }
    },
    CLEAR_COLLECTION(state) {
      state.goalsCollectionArray = [];
    },
    SET_COLLECTION(state, collection) {
      state.goalsCollectionArray = collection;
    },
    ADD_GOAL_TO_COLLECTION(state, { goal, collectionName }) {
      const collection = state.goalsCollectionArray.find((c) => c.collectionName === `${collectionName}`);
      collection.goals.push(goal);
    },
    REPLACE_GOAL(state, goal) {
      state.goalsCollectionArray.forEach((goalsCollection) => {
        goalsCollection.update(goal);
      });
    },
    REMOVE_GOAL(state, goal) {
      state.goalsCollectionArray.forEach((goalCollection) => {
        goalCollection.delete(goal);
      });
    },
    SET_ERROR_MESSAGES(state, errObj) {
      state.errorMessages = errObj;
    },
  },

  actions: {
    postpone({ commit }, goal) {
      // console.log('goal workload:', goal.workloadPoints.level);
      return axios.post(`prospect/week/goal/${goal.id}`, {
        name: goal.name,
        cw: goal.week.cw,
        workload_level: goal.workloadPoints.level,
        description: goal.description,
      }).then((response) => {
        console.log('Antwort vom Server:', response.data);
        commit('REMOVE_GOAL', Goal.createGoalFromData(response.data));
      }).catch((e) => {
        console.log('Fehler', e);
      });
    },
    toggleStateDone({ commit }, goal) {
      commit({ type: 'TOGGLE_LOADING' }, { options: { root: true } });
      axios.post(`prospect/week/goal/${goal.id}/state/done`)
        .then((response) => {
          const goalObject = Goal.createGoalFromData(response.data);
          commit('SET_DONE', goalObject.id);
        })
        .catch((error) => {
          console.log('Fehler bei setState');
          console.log(error);
        })
        .finally(() => {
          commit({ type: 'TOGGLE_LOADING' }, { options: { root: true } });
        });
    },

    async delete({ commit }, goal) {
      const { id } = goal;
      await axios.post(`prospect/week/goal/${id}/delete`)
        .then(() => {
          commit('REMOVE_GOAL', goal);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* Get collection of goals by weekName (weekName = GoalCollection->name) */
    week({ commit }, weekName = 'current') {
      return new Promise((resolve, reject) => {
        axios.get(`prospect/week/${weekName}/goals`)
          .then((response) => {
            commit('CLEAR_COLLECTION');
            const { collection } = response.data;

            // create proper goal objects from response data
            if (weekName === 'overview') {
              const goalsCollections = collection.map((c) => {
                const goalObjects = c.goals.map((g) => Goal.createGoalFromData(g));
                const goalColl = new GoalsCollection(
                  c.collectionName,
                  c.date,
                  goalObjects,
                );
                return goalColl;
              });
              commit('SET_COLLECTION', goalsCollections);
              resolve(goalsCollections);
            } else {
              const goalObjects = collection[0].goals
                .map((g) => Goal.createGoalFromData(g));

              // create a GoalsCollection object
              const goalColl = new GoalsCollection(
                collection[0].collectionName,
                collection[0].date,
                goalObjects,
              );
              collection[0] = goalColl;

              commit('SET_COLLECTION', collection);
              resolve(collection);
            }
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
        const goal = Goal.createGoalFromData(response.data);
        commit('REPLACE_GOAL', goal);
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
