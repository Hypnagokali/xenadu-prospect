<template>
  <div>
    <h4>{{ weekName }}</h4>
    <div v-if="goals.length < 1">
      Noch keine Eintragungen
    </div>
    <div v-for="goal in goals" v-bind:key="goal.id">
      <GoalComponent
        @displayDeleteModal="$emit('displayDeleteModal', goal)"
        @displayEditModal="$emit('displayEditModal', goal)"
        :goal="goal"
      >
      </GoalComponent>
    </div>
  </div>
</template>

<script>
import GoalComponent from './GoalComponent.vue';

export default {
  name: 'GoalWrapper',
  components: {
    GoalComponent,
  },
  props: {
    goalsCollection: Object,
    // goals: Array,
    // weekName: String,
  },
  computed: {
    goals() {
      return this.goalsCollection.goals;
    },
  },
};
</script>
