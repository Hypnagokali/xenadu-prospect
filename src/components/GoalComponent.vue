<template>
  <div class="goal-wrapper card">
    <div class="menu-edit">
      <ul class="xenadu-menu menu align-center">
      <li><a href="#"><span class="goal-menu goal-menu goal-menu-done fi-check"></span></a></li>
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
    <div class="header card-divider">
      <div>
        <h4>{{ goal.name }}</h4>
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
      aria-valuetext="50 % erreicht"
      aria-valuemax="100">
    <div class="progress-meter" style="width: 50%">50%</div>
    </div>
  </div>
</template>

<script>
import Goal from '@/classes/Goal';

export default {
  name: 'GoalComponent',
  props: {
    goal: {
      Goal,
      required: true,
    },
  },
  computed: {
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
</style>
