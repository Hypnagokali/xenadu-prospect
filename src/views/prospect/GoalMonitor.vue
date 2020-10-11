<template>
  <div class="content">
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
              <PostponeGoalDialog
                :goal="selectedGoal"
                v-if="showPostponeModal"
                @close="closePostponeModal"
              >
              </PostponeGoalDialog>
            </transition>
            <transition name="modal">
              <ScheduleGoalDialog
                :goal="selectedGoal"
                v-if="showScheduleModal"
                @close="closeScheduleModal"
              >
              </ScheduleGoalDialog>
            </transition>
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
              @update-goals="refreshGoals"
              v-if="showEditModal">
              </EditGoalDialog>
            </transition>
            <GoalsCollectionWrapper
              :collections="collectionArray"
              @display-delete-modal="openDeleteModal"
              @display-edit-modal="openEditModal"
              @display-postpone-modal="openPostponeModal"
              @display-schedule-modal="openScheduleModal"
            >
            </GoalsCollectionWrapper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditGoalDialog from '@/components/goalComponents/EditGoalDialog.vue';
import DeleteDialog from '@/components/goalComponents/DeleteDialog.vue';
import PostponeGoalDialog from '@/components/goalComponents/PostponeGoalDialog.vue';
import ScheduleGoalDialog from '@/components/goalComponents/ScheduleGoalDialog.vue';
import GoalsCollectionWrapper from '@/components/goalComponents/GoalsCollectionWrapper.vue';

// import GoalNames from '@/enum/GoalNames';

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    // GoalWrapper,
    EditGoalDialog,
    DeleteDialog,
    PostponeGoalDialog,
    ScheduleGoalDialog,
    GoalsCollectionWrapper,
    // GoalOverviewWrapper,
  },
  data() {
    return {
      nameOfChosenWeek: '',
      goals: [],
      collectionArray: [],
      /* Goal selected for deletion or edition */
      selectedGoal: {},
      isLoading: false,
      showEditModal: false,
      showDeleteModal: false,
      showPostponeModal: false,
      showScheduleModal: false,
      goalOverviewObject: null,
    };
  },
  computed: {
    ...mapGetters({
      goalsCollectionArray: 'getGoalsCollectionArray',
    }),
  },
  methods: {
    ...mapActions([
      'week',
      'unfinished',
    ]),
    refreshGoals() {
      /*
      * A workaround for updating the view
      * Thats a fast soluton. I think, I can do better
      */
      this.collectionArray = [];
      this.$nextTick(() => {
        this.collectionArray = this.goalsCollectionArray;
      });
    },
    closeWithMsg(msg) {
      this.closeDeleteModal();
      this.collectionArray = this.goalsCollectionArray;
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
      this.week('overdue')
        .then(() => {
          this.collectionArray = this.goalsCollectionArray;
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
        .then(() => {
          this.collectionArray = this.goalsCollectionArray;
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
          this.collectionArray = this.goalsCollectionArray;
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
          this.collectionArray = this.goalsCollectionArray;
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
    openScheduleModal(goal) {
      console.log('Schedule Goal:', goal);
      this.selectedGoal = goal;
      this.showScheduleModal = true;
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
    openPostponeModal(goal) {
      console.log('open dialog');
      this.selectedGoal = goal;
      this.showPostponeModal = true;
    },
    closeScheduleModal() {
      this.showScheduleModal = false;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    closePostponeModal() {
      this.showPostponeModal = false;
    },
  },
  mounted() {
    this.loadCurrentWeek();
  },
};
</script>
