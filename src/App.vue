<template>
  <div id="app" class="xenadu-wrapper">
    <Header></Header>
    <Loading></Loading>
    <GlobalLoading v-if="isGlobalLoading"></GlobalLoading>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/TheHeader.vue';
import Loading from '@/components/TheLoading.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';
import Content from '@/components/TheContent.vue';
import Footer from '@/components/TheFooter.vue';

import { mapGetters } from 'vuex';

export default {
  components: {
    Header,
    Loading,
    GlobalLoading,
    Content,
    Footer,
  },
  computed: {
    ...mapGetters('states', {
      isBaseStateLoading: 'isLoading',
    }),
    isGlobalLoading() {
      return this.$store.state.isLoading || this.isBaseStateLoading;
    },
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
