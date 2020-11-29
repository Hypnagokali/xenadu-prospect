<template>
  <div class="content medium-9">
    <div class="xenadu-view-header">
    </div>
    <div>
      <div class="medium-12">
        <div class="xenadu-view-subheader">
          <div class="xenadu-load-animation" v-if="isLoading">
            <img src="@/assets/loadring.gif">
          </div>
          <div v-else>
            <Messenger></Messenger>
          </div>
        </div>
      </div>
      <div class="medium-9">
        <div class="xenadu-view-content">
          <p v-if="isLoading">lade Messenger ...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Messenger from '@/components/socialComponents/Messenger.vue';

export default {
  name: 'MessageView',
  components: {
    Messenger,
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>
