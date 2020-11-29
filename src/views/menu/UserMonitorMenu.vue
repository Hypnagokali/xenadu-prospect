<template>
  <div class="content-menu cell large-3">
    <template v-if="!isLoading">
      <h5 v-if="!isLoading">{{ user.name }}</h5>
      <ul class="vertical menu">
          <!-- <li><a href="#">Action Logger</a></li> -->
          <li><router-link :to="{ name: 'UserGoalMonitorView'}">Ziele-Monitor</router-link></li>
          <!-- <li><a href="#">Nachrichten von {{ user.name }}</a></li> -->
      </ul>
    </template>
    <template v-else>
      <h5>User Menü wird geladen ...</h5>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserMonitorMenu',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('friends', { user: 'getUser', isLoading: 'isLoading' }),
  },
};
</script>
