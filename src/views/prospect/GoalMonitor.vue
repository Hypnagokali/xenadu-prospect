<template>
  <div>
    <div class="xenadu-view-header">
      <ul class="xenadu-menu menu align-center">
        <li><a href="#" @click.prevent="loadUnfinished">Überfällig</a></li>
        <li><a href="#" @click.prevent="loadCurrentWeek">Diese Woche</a></li>
        <li><a href="#" @click.prevent="loadNextWeek">Nächste Woche</a></li>
        <li><a href="#" @click.prevent="loadOverview">Gesamtüberblick</a></li>
      </ul>
    </div>

    <div class="grid-x">
      <div class="cell medium-12">
        <div class="xenadu-view-subheader">
          <h3>Ziele - Monitor</h3>
          <button class="xenadu-action button" @click="$router.push({name: 'AddGoal'})">
              Neues Wochenziel
          </button>
        </div>
      </div>

      <div class="cell medium-12">
        <div class="xenadu-view-content">
          <div class="xenadu-load-animation" v-if="isLoading">
            <img src="@/assets/loadring.gif">
          </div>
          <div v-if="isLoading === false" class="goals">
            <transition name="modal">
              <DeleteDialog
                :goal="selectedGoal"
                v-if="showDeleteModal"
                @close="closeDeleteModal"
                @closeWithMsg="closeWithMsg"
              >
              </DeleteDialog>
            </transition>
            <transition name="modal">
              <EditGoalDialog
              :goal="selectedGoal"
              @close="closeEditModal"
              v-if="showEditModal">
              </EditGoalDialog>
            </transition>
            <div v-if="goalOverviewObject === null">
              <GoalWrapper
                :goals="goals"
                :weekName="nameOfChosenWeek"
                @displayDeleteModal="openDeleteModal"
                @displayEditModal="openEditModal"
              >
              </GoalWrapper>
            </div>
            <!--
            <div v-for="goal in goals" v-bind:key="goal.id">
              <GoalComponent
                @displayEditModal="openEditModal"
                @displayDeleteModal="openDeleteModal"
                :goal="goal"
              >
              </GoalComponent>
            </div>
            -->
            <div v-if="goalOverviewObject !== null">
              <GoalOverviewWrapper
                :goalOverviewObject="goalOverviewObject"
                @displayDeleteModal="openDeleteModal"
              >
              </GoalOverviewWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import convertJsonKeysToCamelCase from '@/helper/snakeToCamelConverter';
// import dhsc from '@/helper/decodeHtmlspecialchars';
// import GoalComponent from '@/components/goalComponents/GoalComponent.vue';
import GoalWrapper from '@/components/goalComponents/GoalWrapper.vue';
import EditGoalDialog from '@/components/goalComponents/EditGoalDialog.vue';
import DeleteDialog from '@/components/goalComponents/DeleteDialog.vue';
import GoalOverviewWrapper from '@/components/goalComponents/GoalOverviewWrapper.vue';

import GoalNames from '@/enum/GoalNames';

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    GoalWrapper,
    EditGoalDialog,
    DeleteDialog,
    GoalOverviewWrapper,
  },
  data() {
    return {
      nameOfChosenWeek: '',
      goals: [],
      selectedGoal: {},
      isLoading: false,
      showEditModal: false,
      showDeleteModal: false,
      goalOverviewObject: null,
    };
  },
  computed: {
    ...mapGetters({
      getGoalsFromStore: 'goals',
    }),
  },
  methods: {
    ...mapActions([
      'week',
      'unfinished',
    ]),
    closeWithMsg(msg) {
      this.closeDeleteModal();
      this.goals = this.getGoalsFromStore;
      console.log(msg);
    },
    resetGoals() {
      this.goalOverviewObject = null;
      this.goals = [];
      this.selectedGoal = {};
    },
    loadUnfinished() {
      this.isLoading = true;
      this.resetGoals();
      this.unfinished()
        .then(() => {
          this.goals = this.getGoalsFromStore;
          this.nameOfChosenWeek = GoalNames.unfinished;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push('Login');
          } else {
            console.error('irgendwas ist schiefgegangen', error);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadOverview() {
      this.isLoading = true;
      this.resetGoals();
      this.week('overview')
        .then((result) => {
          console.log('FUNZT! Weiter machen :)');
          this.goalOverviewObject = result;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadCurrentWeek() {
      this.isLoading = true;
      this.resetGoals();
      this.week('current')
        .then(() => {
          this.goals = this.getGoalsFromStore;
          this.nameOfChosenWeek = GoalNames.current;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push('Login');
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadNextWeek() {
      this.isLoading = true;
      this.week('next')
        .then(() => {
          this.goals = this.getGoalsFromStore;
          this.nameOfChosenWeek = GoalNames.next;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push('Login');
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openEditModal(goal) {
      console.log(`Öffne Dialogfenster mit gId = ${goal.id}`);
      this.selectedGoal = goal;
      // console.log(this.selectedGoal);
      this.showEditModal = true;
    },
    openDeleteModal(goal) {
      this.selectedGoal = goal;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
  },
  mounted() {
    this.loadCurrentWeek();
  },
};
</script>
