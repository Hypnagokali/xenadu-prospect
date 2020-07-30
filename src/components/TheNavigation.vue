<template>
  <div class="xenadu-nav top-bar">
    <ul class="xenadu-nav__links menu">
      <li>
        <router-link :to="{name: 'Home'}">
          Hauptseite
        </router-link>
      </li>
      <template v-if="authenticated">
        <li>
          <router-link :to="{name: 'Routines'}">
            Routine - Spiegel
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Goals'}">
            Ziele - Spiegel
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'MyDay'}">
            Mein Tag
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Dashboard'}">
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
</template>

<script>
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
    logout() {
      this.logoutAction().then(
        this.$router.replace({
          name: 'Home',
        }),
      ).catch((e) => {
        console.log(e.message);
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
