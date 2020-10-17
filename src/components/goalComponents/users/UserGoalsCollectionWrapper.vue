<template>
  <div>
    <div>
      <div v-if="isCollectionEmpty">
      <p>
        {{ user.name }} hat noch keine Ziele dem Monitor hinzugefügt
      </p>
    </div>
    <div v-for="(collection, index) in goalsCollectionArray" :key="index">
      <template v-if="collection.goals.length > 0">
        <div>
          <h4>{{ weekName(collection.name) }}</h4>
        </div>
        <div v-for="goal in collection.goals" v-bind:key="goal.id">
          <UserGoalComponent
            :userId="userId"
            :goal="goal"
            @push-motivation="$emit('push', goal)"
            >
          </UserGoalComponent>
        </div>
      </template>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeekNames from '@/enum/WeekNames';
import UserGoalComponent from './UserGoalComponent.vue';

export default {
  name: 'GoalsCollectionWrapper',
  components: {
    UserGoalComponent,
  },
  props: {
    userId: {
      required: true,
      Number,
    },
    goalsCollectionArray: Array,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    weekName(collectionName) {
      return WeekNames[collectionName];
    },
  },
  computed: {
    ...mapGetters('monitor', {
      isCollectionEmpty: 'isGoalsCollectionEmpty',
    }),
    ...mapGetters('friends', { user: 'getUser' }),
    collArray() {
      return this.collections;
    },
  },
};
</script>
