<template>
  <div v-bind:class="styleState">
    <div class="menu-edit">
      <ul class="xenadu-menu menu align-center">
      <li>
        <a href="#" @click.prevent="toggleDone">
          <span class="goal-menu goal-menu goal-menu-done fi-check"></span>
          </a>
      </li>
      <li>
        <a href="#" @click.prevent="editGoal">
          <span class="goal-menu goal-menu-edit fi-pencil"></span>
        </a>
      </li>
      <li>
        <a href="#">
          <span class="goal-menu goal-menu-postpone fi-fast-forward"></span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="deleteGoal">
          <span class="goal-menu goal-menu-delete fi-x"></span>
        </a>
      </li>
    </ul>
      </div>
    <div class="card-divider">
      <div>
        <h4>{{ goal.name }} <small>{{ goal.state }}</small></h4>
      </div>
    </div>
    <div class="card-section">
      <h5>{{ goal.description }}</h5>
      <p>hinzugefügt am: <strong>{{ addedOnDateString }}</strong></p>
    </div>
    <div class="workload card-section">
      <span class="left">Belohnungspunkte:
        <strong>{{ goal.workloadPoints.pointsPerHour }}</strong>
        -
      </span>
      <span class="right">Belastungslevel:
        <strong>{{ goal.workloadPoints.level }}</strong>
      </span>
    </div>
    <div
      class="progress"
      role="progressbar"
      tabindex="0"
      aria-valuenow="50"
      aria-valuemin="0"
      aria-valuetext="50 %"
      aria-valuemax="100">
    <div class="progress-meter" v-bind:style="progressBarStyleObject">{{ doneState }}</div>
    </div>
  </div>
</template>

<script>
import Goal from '@/classes/Goal';
import { mapActions } from 'vuex';

export default {
  name: 'GoalComponent',
  props: {
    goal: {
      Goal,
      required: true,
    },
  },
  data() {
    return {
      stateColors: {
        done: 'isDone',
        todo: '',
      },
    };
  },
  computed: {
    doneState() {
      return this.goal.state === 'done' ? '100%' : '0%';
    },
    progressBarStyleObject() {
      return {
        width: this.doneState,
      };
    },
    styleState() {
      console.log('GOAL STATE', this.goal.state);
      const foundationClasses = ' goal-wrapper card';
      return this.stateColors[this.goal.state] + foundationClasses;
    },
    addedOnDateString() {
      const date = new Date(this.goal.addedOn);
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      return date.toLocaleDateString('de-DE', options);
    },
  },
  methods: {
    ...mapActions([
      'toggleStateDone',
    ]),
    toggleDone() {
      this.toggleStateDone(this.goal);
    },
    editGoal() {
      this.$emit('displayEditModal', this.goal);
    },
    deleteGoal() {
      this.$emit('displayDeleteModal', this.goal);
    },
  },
};
</script>

<style lang="scss">
@import '@/style/goals.scss';

.isDone {
  background-color: get-color(success);
}
</style>
