<template>
  <div class="friend-menu cell large-3">
      <h5>Freunde</h5>
      <div v-if="isLoading">Freundeliste wird geladen ...</div>
      <div v-if="!isLoading && friendList.length < 1">
        <p>
          Noch keine Freunde
        </p>

        <router-link :to="{name: 'UserList'}">
          Finde Freunde, die dich beim Erreichen deiner Ziele unterstützen
        </router-link>
      </div>
      <ul class="vertical menu xenadu-menu" v-if="isLoading === false && friendList.length > 0">
        <router-link
          v-for="friend in friendList" :key="friend.id"
          :to="{name: 'UserProfileView', params: { id: friend.id }}"
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
