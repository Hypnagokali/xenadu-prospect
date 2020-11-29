<template>
  <div>
    <div v-for="(collection, index) in collArray" :key="index">
      <div>
        <h4>{{ weekName(collection.name) }}</h4>
      </div>
      <div v-if="collection.goals.length < 1">
        Noch keine Eintragungen
      </div>
      <div v-for="goal in collection.goals" v-bind:key="goal.id">
        <GoalComponent v-if="collection.name === 'overdue'"
          @display-delete-modal="$emit('display-delete-modal', goal)"
          @display-edit-modal="$emit('display-edit-modal', goal)"
          @display-schedule-modal="$emit('display-schedule-modal', goal)"
          :goal="goal"
          :overdue="true"
        >
        </GoalComponent>
        <GoalComponent v-else
          @display-delete-modal="$emit('display-delete-modal', goal)"
          @display-edit-modal="$emit('display-edit-modal', goal)"
          @display-postpone-modal="$emit('display-postpone-modal', goal)"
          :goal="goal"
        >
        </GoalComponent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeekNames from '@/enum/WeekNames';
import GoalComponent from './GoalComponent.vue';

export default {
  name: 'GoalsCollectionWrapper',
  components: {
    GoalComponent,
  },
  data() {
    return {
      goalsCollections: [],
    };
  },
  props: {
    collections: Array,
  },
  methods: {
    weekName(collectionName) {
      return WeekNames[collectionName];
    },
  },
  computed: {
    ...mapGetters([
      'getGoalsCollectionArray',
    ]),
    collArray() {
      return this.collections;
    },
  },
};
</script>
