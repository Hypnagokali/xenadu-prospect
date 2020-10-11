<template>
  <div class="content">
    <div class="xenadu-view-header">
    </div>
    <div>
      <div class="cell medium-12">
        <div class="xenadu-view-subheader">
          <h3>Ziele-Monitor (UserID = {{ userId }})</h3>
          <button class="button success">
            Action Button 1
          </button>
          <button class="button success">
            Action Button 2
          </button>
        </div>
      </div>
      <div class="cell medium-12">
        <div class="xenadu-view-content">
          <UserGoalsCollectionWrapper :userId="userId"></UserGoalsCollectionWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserGoalsCollectionWrapper from '@/components/goalComponents/users/UserGoalsCollectionWrapper.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'UserGoalMonitorView',
  components: {
    UserGoalsCollectionWrapper,
  },
  data() {
    return {
      userId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters('friends', { user: 'getUser' }),
  },
};
</script>
