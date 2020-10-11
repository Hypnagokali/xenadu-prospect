<template>
  <div class="content">
    <div class="xenadu-view-header">
    </div>
    <div>
      <div class="cell medium-12">
        <div class="xenadu-view-subheader">
          <h3>User bei xenadu</h3>
          <div class="input-group">
            <input class="input-group-field" type="text" placeholder="Freunde / Benutzer finden">
            <div class="input-group-button">
              <input type="submit" class="button" value="Suchen">
            </div>
          </div>
        </div>
      </div>
      <div class="cell medium-12">
        <div class="xenadu-view-content">
          <p v-if="isLoading">Benutzerliste wird geladen ...</p>
          <ul class="menu vertical" v-else>
            <li
              v-for="userObject in userObjectList"
              :key="userObject.user.id"
            >
              <router-link
                :to="{name: 'UserProfileView', params: {id: userObject.user.id}}"
              >
                {{ userObject.user.name }}
                <span class="mini-notification" v-if="userObject.hasRequestedMe">
                  (hat dir eine Freundschaftsanfrage geschickt)
                </span>
                <span class="mini-notification" v-if="userObject.isFriend">
                  (Freunde)
                </span>
                <span class="mini-notification" v-if="userObject.isPending">
                  (Freundschaftsanfrage noch unbeantwortet)
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserList',
  data() {
    return {
      isLoading: false,
      userObjectList: [],
    };
  },
  computed: {
    ...mapGetters('users', ['getUserObjects']),
  },
  methods: {
    ...mapActions({
      init: 'users/init',
    }),
    initUserList() {
      this.isLoading = true;
      this.init()
        .then(() => {
          this.userObjectList = this.getUserObjects;
        })
        .catch(() => {
          console.log('Show an error!');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.initUserList();
  },
};
</script>

<style lang="scss" scoped>
.xenadu-find-icon {
  font-size: 1.5em;
}
</style>
