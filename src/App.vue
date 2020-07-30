<template>
  <div id="app" class="xenadu-wrapper">
    <div class="xenadu-header">
      <h1>xenadu</h1>
      <Navigation></Navigation>
    </div>
    <Loading></Loading>
    <div class="xenadu-container grid-x grid-margin-x">
      <div class="cell medium-12 small-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/TheNavigation.vue';
import Loading from '@/components/TheLoading.vue';

export default {
  components: {
    Navigation,
    Loading,
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
