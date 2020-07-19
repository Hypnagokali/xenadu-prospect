<template>
  <div>
   <h2>Home</h2>
   <button class="button" @click="test">Bin ich eingeloggt?</button>
   <p>{{ username }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      username: 'Nicht eingeloggt',
    };
  },
  methods: {
    async test() {
      const user = await this.$store.dispatch('auth/retrieveUser');
      console.log(user);
      if (user) {
        this.username = user.name;
      } else {
        this.username = 'Nicht eingeloggt';
      }
    },
  },
};
</script>
