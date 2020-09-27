<template>
  <div class="friend-menu cell large-3">
      <h3>Freunde</h3>
      <div v-if="isLoading">Freundeliste wird geladen ...</div>
      <ul class="vertical menu xenadu-menu" v-if="isLoading === false">
        <router-link
          v-for="friend in friendList" :key="friend.id"
          :to="{name: 'FriendView', params: { id: friend.id }}"
        >
          {{ friend.name }}
        </router-link>
      </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FriendMenu',
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters('friends', {
      friendList: 'getFriendList',
    }),
  },
  methods: {
    ...mapActions({
      initFriendList: 'friends/initFriendList',
    }),
  },
  mounted() {
    this.isLoading = true;
    console.log('LOADING');
    this.initFriendList()
      .then()
      .finally(() => {
        this.isLoading = false;
      });
    console.log(this.friendList);
  },
};
</script>
