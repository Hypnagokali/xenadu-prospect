<template>
  <div class="header">
    <h1 class="xenadu-title">xenadu</h1>
    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from '@/components/TheNavigation.vue';

export default {
  name: 'TheHeader',
  components: {
    Navigation,
  },
};
</script>
