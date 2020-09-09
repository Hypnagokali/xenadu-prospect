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
        <GoalComponent
          @display-delete-modal="$emit('display-delete-modal', goal)"
          @display-edit-modal="$emit('display-edit-modal', goal)"
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
  // props: ['collections'],
  watch: {
    collections(nv) {
      console.log('THE WATCHER');
      console.log(nv);
    },
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
