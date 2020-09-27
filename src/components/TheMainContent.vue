<template>
  <div class="grid-x cell large-9">
    <router-view name="menu"/>
    <router-view></router-view>
  </div>
</template>

<script>
// import ContentMenu from '@/components/TheContentMenu.vue';

export default {
  name: 'MainContent',
  components: {
    // ContentMenu,
  },
};
</script>
