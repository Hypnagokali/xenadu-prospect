<template>
  <div class="grid-x xenadu-content-wrapper">
    <MainContent></MainContent>
    <template v-if="isAuthenticated">
      <FriendMenu></FriendMenu>
    </template>
  </div>
</template>

<script>
import FriendMenu from '@/components/TheFriendMenu.vue';
import MainContent from '@/components/TheMainContent.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Content',
  components: {
    FriendMenu,
    MainContent,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
};
</script>
