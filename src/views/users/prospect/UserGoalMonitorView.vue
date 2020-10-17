<template>
  <div class="content medium-9">
    <div class="xenadu-view-header">
    </div>
    <div>
      <div class="cell medium-9">
        <div class="xenadu-view-subheader">
          <h3>Ziele-Monitor von {{ user.name}}</h3>
          <button class="button success">
            Action Button 1
          </button>
          <button class="button success">
            Action Button 2
          </button>
        </div>
      </div>
      <div class="cell medium-9">
        <div class="xenadu-view-content">
          <div v-if="isLoading">
            wird geladen ...
          </div>
          <div v-else>
            <UserGoalsCollectionWrapper
            :userId="user.id"
            :goalsCollectionArray="goalsCollectionArray"
            @push="pushMotivation"
          >
          </UserGoalsCollectionWrapper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserGoalsCollectionWrapper from '@/components/goalComponents/users/UserGoalsCollectionWrapper.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserGoalMonitorView',
  components: {
    UserGoalsCollectionWrapper,
  },
  data() {
    return {
      isLoading: false,
      userId: this.$route.params.id,
      goalsCollection: this.goalsCollectionArray,
    };
  },
  methods: {
    ...mapActions({
      push: 'monitor/push',
      init: 'monitor/initOverview',
      initUserView: 'friends/initUserView',
    }),
    pushMotivation(goal) {
      console.log('angekommen', goal);
      console.log('user', this.user);
      this.push({ userId: this.user.id, goalId: goal.id });
    },
    initGoalCollections() {
      this.isLoading = true;
      console.log('USER ID: ', this.userId);
      this.init(this.userId)
        .then(() => {
          console.log('Monitor wurde initialisiert!', this.goalsCollectionArray);
        })
        .catch(() => {
          console.log('Ein Fehler ist aufgetreten');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    isUserEmpty(obj) {
      const keys = Object.keys(obj);
      if (keys.length < 1) {
        return true;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters('friends', { user: 'getUser' }),
    ...mapGetters('monitor', {
      goalsCollectionArray: 'getUserGoalsCollectionArray',
      isCollectionEmpty: 'isGoalsCollectionEmpty',
    }),
  },
  async mounted() {
    if (this.isUserEmpty(this.user)) {
      this.isLoading = true;
      await Promise.all([this.initUserView(this.userId), this.initGoalCollections()]);
      // await this.initUserView(this.userId);
      this.isLoading = false;
      console.log('mounted', this.user);
    } else {
      this.initGoalCollections();
    }
  },
};
</script>
