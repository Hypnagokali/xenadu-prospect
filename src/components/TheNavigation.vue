<template>
  <div class="grid-x">
    <div class="xenadu-nav cell">
      <ul class="xenadu-nav__links menu">
        <template v-if="authenticated">
          <li>
            <router-link :to="{name: 'Home'}">
              Ich
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Monitor'}">
              Monitor
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="logout">
              {{ user.name }} - Logout
            </a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link :to="{name: 'Login'}">
              Login
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TheNavigation',
  computed: {
    ...mapGetters({
      authenticated: 'auth/isAuthenticated',
      user: 'auth/getUser',
    }),
  },
  methods: {
    ...mapActions({
      logoutAction: 'auth/logout',
    }),
    async logout() {
      store.commit('requestState/SET_WAITING');
      await this.logoutAction()
        .then()
        .finally(() => {
          this.$router.replace({ name: 'Login' });
        });
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  font-size: small;
  display: flex;
  // justify-content: space-around;
  list-style-type: none;
  font-weight: bold;
  width: 100%;
}
li {
  margin: 0 1%;
}
li a {
  text-decoration: none;
  color: #936FE6 ;
}
</style>
