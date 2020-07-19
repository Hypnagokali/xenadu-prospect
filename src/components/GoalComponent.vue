<template>
  <div class="goal-wrapper card">
    <div class="menu-edit">
        <button class="button alert tiny float-right" @click.prevent="deleteGoal">Löschen</button>
        <button class="button tiny float-right">Aufschieben</button>
        <button class="button tiny float-right" @click.prevent="editGoal">Ändern</button>
        <button class="button success tiny float-right">Erledigt</button>
      </div>
    <div class="header card-divider">
      <div>
        <h5>{{ goal.name }}</h5>
      </div>
    </div>
    <div class="card-section">
      <h5>{{ goal.description }}</h5>
      <p>hinzugefügt am: {{ goal.addedOn }}</p>
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
    addedOnDate() {
      const date = new Date(this.addedOn);
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

<style scoped lang="scss">
.goal-wrapper {
  border: solid, 1px, #ccc;
  margin: 0 auto;
  margin-bottom: 2%;
  width: 50%;
}

.card-divider {
  border-bottom: solid 1px black;
  background-color: #464378;
  color: white;
}
.card-section {
  background-color:#A49EFF;
  color: black;
}
.progress {
  height: 1.5em;
}
.progress-meter {
  background-color: darkblue;
  color: white;
}

button {
  margin-bottom: 0;
}

.menu-edit {
  background-color: #464378;
}
</style>
