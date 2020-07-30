<template>
  <div class="waiting">
    <div class="xenadu-load-animation" v-if="isWaitingForResponse">
      <img src="@/assets/my_loading_dots_2.gif" width="50">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheLoading',
  data() {
    return {
      waitingForResponse: true,
    };
  },
  computed: {
    ...mapGetters({
      isWaiting: 'requestState/isWaiting',
    }),
    isWaitingForResponse() {
      return this.isWaiting;
    },
  },
};
</script>

<style lang="scss" scoped>
.waiting {
  height: 5vh;
}
</style>
