<template>
  <div>
    <ul>
      <li>
        <router-link :to="{name: 'Home'}">
          Hauptseite
        </router-link>
      </li>
      <template v-if="authenticated">
        <li>
          <router-link :to="{name: 'Routines'}">
            Routinen
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Missions'}">
            Missionen
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Goals'}">
            Wochenziele
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Dashboard'}">
            Dashboard
          </router-link>
        </li>
        <li>
            <span class="info">{{ user.name }}</span>
        </li>
        <li>
          <a href="#" @click.prevent="logout">
            Logout
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
.info {
  font-size: smaller;
}
ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  font-weight: bold;
}
li {
  margin: 0 50px;
}
li a {
  text-decoration: none;
  color: #936FE6 ;
}
</style>
