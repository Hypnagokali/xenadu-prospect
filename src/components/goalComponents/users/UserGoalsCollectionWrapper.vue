<template>
  <div>
    <div v-if="isLoading">
      wird geladen ...
    </div>
    <div v-else>
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
          <UserGoalComponent :goal="goal"></UserGoalComponent>
        </div>
      </template>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      init: 'monitor/initOverview',
    }),
    weekName(collectionName) {
      return WeekNames[collectionName];
    },
    initGoalCollections() {
      this.isLoading = true;
      this.init(this.userId)
        .then(() => {
          console.log('Monitor wurde initialisiert!');
        })
        .catch(() => {
          console.log('Ein Fehler ist aufgetreten');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters('monitor', {
      goalsCollectionArray: 'getUserGoalsCollectionArray',
      isCollectionEmpty: 'isGoalsCollectionEmpty',
    }),
    ...mapGetters('friends', { user: 'getUser' }),
    collArray() {
      return this.collections;
    },
  },
  mounted() {
    this.initGoalCollections();
    console.log('UserGoalsCollectionArray', this.goalsCollectionArray);
  },
};
</script>
