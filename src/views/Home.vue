<template>
  <div class="content">
    <div class="grid-x grid-padding-x">
      <div class="medium-6">
        <div class="card">
          <img class="avatar" src="@/assets/profile.jpg">
          <div class="card-divider">
            {{ user.name }} | Rang: 0
          </div>
          <div class="card-section">
            <h5>Belohnungspunkte: {{ user.rewardPointsSum }}</h5>
            <h5>Ziele geschafft: {{ user.doneGoalCount }}</h5>
            <p><cite>Hier ist mein Lieblingszitat</cite></p>
          </div>
        </div>
      </div>
      <div class="medium-offset-1 medium-2">
        <p>weiterer Inhalt kommt später ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  methods: {
    test() {

    },
  },
  computed: {
    ...mapGetters('auth', { user: 'getUser' }),
    // ToDo: ...mapActions: getUserData
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #ccc;
};
.card-section {
  background-color: white;
}
.avatar {
  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>
