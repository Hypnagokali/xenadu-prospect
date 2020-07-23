<template>
  <div>
    <ul class="menu align-center">
      <li><a href="#" @click="loadCurrentWeek()">Diese Woche</a></li>
      <li><a href="#">Nächste Woche</a></li>
      <li><a href="#">Gesamtüberblick</a></li>
    </ul>
    <div>
      <h3>Meine Wochenziele</h3>
      <button class="button success" @click="$router.push({name: 'AddGoal'})">
          Neues Wochenziel
      </button>
      <div>
        <h5>Diese Woche</h5>
        <div v-if="isLoading">
          <img src="@/assets/loadring.gif">
        </div>
        <div v-if="isLoading === false" class="goals">
          <div v-if="goals.length < 1">
            Noch keine Eintragungen
          </div>
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
          <div v-for="goal in goals" v-bind:key="goal.id">
            <GoalComponent
              @displayEditModal="openEditModal"
              @displayDeleteModal="openDeleteModal"
              :goal="goal"
            >
            </GoalComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import convertJsonKeysToCamelCase from '@/helper/snakeToCamelConverter';
import dhsc from '@/helper/decodeHtmlspecialchars';
import GoalComponent from '@/components/GoalComponent.vue';
import EditGoalDialog from '@/components/EditGoalDialog.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    GoalComponent,
    EditGoalDialog,
    DeleteDialog,
  },
  data() {
    return {
      testMuh: 'Muh data',
      testFoo: 'Foo data',
      goals: [],
      selectedGoal: {},
      isLoading: false,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  computed: {
    ...mapGetters({
      getGoalsFromStore: 'goals',
    }),
    testValue() {
      return dhsc('&amp;Sonst ist alles okay?');
    },
  },
  methods: {
    ...mapActions([
      'currentWeek',
    ]),
    closeWithMsg(msg) {
      this.closeDeleteModal();
      this.goals = this.getGoalsFromStore;
      console.log(msg);
    },
    loadCurrentWeek() {
      this.isLoading = true;
      console.log('load week');
      this.currentWeek()
        .then(() => {
          this.goals = this.getGoalsFromStore;
        })
        .catch()
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
