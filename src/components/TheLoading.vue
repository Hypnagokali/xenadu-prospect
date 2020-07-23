<template>
  <div class="waiting">
    <span v-if="isWaitingForResponse">
      <img src="@/assets/loading_dots.gif" width="50">
    </span>
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
